import React, { useState, useEffect, useRef } from "react";
import { Button, message, Progress, Upload, type UploadProps, Card, Input, Modal, Image } from "antd";
import { useXTheme, XFlex, XText } from "@pro/ui";
import { useTranslation } from "@/i18n/routing";
import { performSingleUpload } from "@/utils/upload/oss.ts";
import { UploadOutlined } from "@ant-design/icons";
import { useGlobalState } from "@/providers/GlobalData";
import eventBus, { eventTypes } from "@/utils/eventBus.ts";
import { upload } from "@/utils/upload/tos.ts";

interface UploaderProps {
    onUploaded: (data: any[]) => void;
    accept?: string;
    max?: number;
    disabled?: boolean;
    value?: any[];
}

interface UploadFile {
    originFileObj: File;
    uid: string;
    name: string;
    size: number;
    type: string;
    status: "uploading" | "done" | "error";
    percent?: number;
    url?: string;
    retryCount?: number;
}

function Uploader({ onUploaded, accept, max = 1, disabled = false, value }: UploaderProps) {
    const { themeVars } = useXTheme();
    const t = useTranslation();
    const MAX_RETRIES = 3; // 最大重试次数

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState<boolean>(false);
    const [fileProgresses, setFileProgresses] = useState<Record<string, number>>({});
    const [totalProgress, setTotalProgress] = useState<number>(0);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const lastNotifiedRef = useRef<string>("");

    const { user } = useGlobalState();

    // 初始化/同步外部传入的 value
    useEffect(() => {
        if (!value) return;

        // 如果当前外部值与我们刚刚通知的值一致，说明是反馈更新，不需要重设 fileList
        // 否则会导致上传成功后，父组件同步还没完成，子组件又被 props 刷回旧状态的 loop
        const valueString = JSON.stringify(value);
        if (valueString === lastNotifiedRef.current) return;

        // 提取当前已完成上传的 URL 列表进行对比
        const currentUrls = fileList
            .filter(f => f.status === 'done')
            .map(f => f.url);

        const isMatch = Array.isArray(value) &&
            value.length === currentUrls.length &&
            value.every((v, i) => (typeof v === 'string' ? v : v.url) === currentUrls[i]);

        if (isMatch || uploading) return;

        if (Array.isArray(value)) {
            const initialList = value.map((item, index) => {
                const url = typeof item === 'string' ? item : item.url;
                return {
                    uid: `rc-upload-initial-${index}-${url}`, // 使用稳定且兼容 antd 的 UID
                    name: `image-${index}`,
                    status: 'done',
                    url: url,
                    type: item?.mimeType || 'image/jpeg',
                    size: 0,
                    originFileObj: null as any
                };
            });
            setFileList(initialList as any);
        }
    }, [value, uploading]);

    // 获取所有成功上传的文件并通知父组件
    const notifyFileChanges = (files: UploadFile[]) => {
        const successFiles = files
            .filter((file) => file.status === "done")
            .map((file) => ({
                url: file.url,
                name: file.name,
                mimeType: file.type
            }));

        // 只有当真正发生变化时才通知，避免循环触发
        const currentUrls = value?.map(v => typeof v === 'string' ? v : v.url) || [];
        const newUrls = successFiles.map(f => f.url);
        const isSame = currentUrls.length === newUrls.length && currentUrls.every((url, i) => url === newUrls[i]);

        if (!isSame) {
            // 记录最后一次通知的值，用于 useEffect 阻断
            lastNotifiedRef.current = JSON.stringify(successFiles.map(f => f.url));
            onUploaded(successFiles);
        }
    };

    // 更新单个文件的进度
    const updateFileProgress = (uid: string, progress: number) => {
        setFileProgresses((prev) => {
            const updated = { ...prev, [uid]: progress };
            const progressValues = Object.values(updated);
            let minProgress = 100;
            for (const value of progressValues) {
                if (value > 0 && value < minProgress) {
                    minProgress = value;
                }
            }
            if (minProgress === 100 && progressValues.some((p) => p === 0)) {
                minProgress = 0;
            }
            setTotalProgress(Math.floor(minProgress));
            return updated;
        });
    };

    // 上传失败后自动移除文件
    const removeFailedFile = (file: UploadFile) => {
        setFileList((prev) => {
            const updated = prev.filter((item) => item.uid !== file.uid);
            notifyFileChanges(updated);
            return updated;
        });

        setFileProgresses((prev) => {
            const updated = { ...prev };
            delete updated[file.uid];
            if (Object.keys(updated).length > 0) {
                const progressValues = Object.values(updated);
                const minProgress = Math.min(...progressValues.filter((p) => p > 0));
                setTotalProgress(Math.floor(minProgress || 0));
            } else {
                setTotalProgress(0);
            }
            return updated;
        });
    };

    const uploadWithRetry = async (
        file: File,
        onProgress: (progress: number) => void,
        onSuccess: (url: string) => void,
        onError: (error: Error) => void,
        retryCount: number = 0
    ) => {
        try {
            const fileUrl = await upload(file, onProgress);
            if (fileUrl) {
                onSuccess(fileUrl);
            } else {
                throw new Error("Upload failed");
            }
        } catch (error) {
            if (retryCount < MAX_RETRIES) {
                // 重试前等待时间，使用指数退避
                const delay = Math.pow(2, retryCount) * 1000;
                await new Promise((resolve) => setTimeout(resolve, delay));

                message.info(`正在进行第${retryCount + 1}次重试...`);
                return uploadWithRetry(file, onProgress, onSuccess, onError, retryCount + 1);
            } else {
                message.error(`文件 ${file.name} 上传失败，已达到最大重试次数`);
                onError(error as Error);
                // 找到对应的文件并移除
                const failedFile = fileList.find((f) => f.originFileObj === file);
                if (failedFile) {
                    removeFailedFile(failedFile);
                }
            }
        }
    };

    const beforeUpload = async (file: File, fileList: File[]) => {
        if (!user) {
            eventBus.emit(eventTypes.OpenLoginModal);
            return;
        }

        // 验证文件大小
        const isAllowedSize = file.size < 500 * 1024 * 1024;
        if (!isAllowedSize) {
            message.error("文件过大，请上传500MB以内的文件");
            return Upload.LIST_IGNORE;
        }

        // 检查文件类型
        if (accept) {
            const acceptTypes = accept.split(",").map((type) => type.trim());
            const isAcceptedType = acceptTypes.some((type) => {
                if (type.startsWith(".")) {
                    return file.name.toLowerCase().endsWith(type.toLowerCase());
                } else {
                    return file.type.match(new RegExp(type.replace("*", ".*")));
                }
            });

            if (!isAcceptedType) {
                message.error(`请上传${accept}格式的文件`);
                return Upload.LIST_IGNORE;
            }
        }

        return true;
    };

    const handlePreview = async (file: any) => {
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const props: UploadProps = {
        multiple: true,
        maxCount: max,
        fileList: fileList as any,
        listType: "picture-card",
        showUploadList: true,
        onPreview: handlePreview,
        beforeUpload,
        accept,
        customRequest: async (options) => {
            const { file, onProgress, onSuccess, onError } = options as any;

            // 使用重试机制上传文件
            await uploadWithRetry(
                file as File,
                (progress: number) => {
                    onProgress({ percent: progress });
                    updateFileProgress((file as any).uid, progress);
                },
                onSuccess,
                onError
            );
        },
        onChange(info) {
            // 更新文件列表
            const newFileList = info.fileList.slice(0, max).map((file) => {
                if (file.status === "done" && file.response) {
                    // 上传成功，response 是文件 URL
                    return {
                        ...file,
                        url: typeof file.response === 'string' ? file.response : file.response.url || file.url
                    };
                }
                return file;
            });

            const isAnyUploading = newFileList.some((file) => file.status === "uploading");
            setFileList(newFileList as any);
            setUploading(isAnyUploading);

            // 只有当所有上传都结束后，才通知父组件，避免同步过程中的中间态清空
            if (!isAnyUploading) {
                notifyFileChanges(newFileList as UploadFile[]);
            }
        },
        onRemove(file) {
            removeFailedFile(file as UploadFile);
            return true;
        }
    };

    return (
        <XFlex vertical gap={10} block>
            <Upload {...props} disabled={disabled}>
                {fileList.length < max && (
                    <XFlex center vertical gap={10} style={{ paddingInline: 10 }}>
                        <UploadOutlined />
                        <XText size={10} color={themeVars.colorTextL2}>
                            {t("chooseFile", { max: max })}
                        </XText>
                    </XFlex>
                )}
            </Upload>

            {/*{uploading && totalProgress > 0 && (*/}
            {/*    <Progress*/}
            {/*        strokeColor={themeVars.colorPrimary}*/}
            {/*        percent={totalProgress}*/}
            {/*        status="active"*/}
            {/*        style={{marginBottom: 8}}*/}
            {/*    />*/}
            {/*)}*/}

            {previewImage && (
                <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
        </XFlex>
    );
}

export default Uploader;
