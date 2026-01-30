import React, {useState} from 'react';
import {Button, message, Progress, Upload, type UploadProps, Card, Input} from 'antd';
import {useXTheme, XFlex} from "@pro/ui";
import {useTranslation} from "@/i18n/routing";
import {addResourceV5, addSessionV2, uploadFileV3} from "@/api/api";
import {AxiosProgressEvent} from "axios";

function Uploader({
                      onUploaded,
                      onUploadStart,
                      sessionId,
                      scene,
                      version,
                      accept,
                      max = 1,
                      children
                  }: {
    onUploaded: (data: any[]) => void,
    onUploadStart?: () => void,
    sessionId: string,
    scene: string,
    version?: string,
    accept?: string,
    max?: number
    children?: React.ReactNode
}) {
    const {themeVars} = useXTheme();
    const t = useTranslation();

    const [fileList, setFileList] = useState<any[]>([]);

    const [title, setTitle] = useState<string>('');
    const [uploading, setUploading] = useState<boolean>(false);
    const [fileProgresses, setFileProgresses] = useState<Record<string, number>>({});
    const [totalProgress, setTotalProgress] = useState<number>(0);
    const [uploadResults, setUploadResults] = useState<any[]>([]);


    const beforeUpload = async (file: any) => {
        const isAllowedSize = file.size < 1024 * 1024 * 500;
        if (!isAllowedSize) {
            message.error("文件过大，请上传500M以内的视频");
            return false;
        }
        return true;
    };

    // 更新单个文件的进度，并根据最慢的文件更新总进度
    const updateFileProgress = (uid: string, progress: number) => {
        setFileProgresses(prev => {
            const updated = {...prev, [uid]: progress};

            // 计算总体进度 - 使用最慢的文件进度作为总进度
            // 如果有文件进度为0，则使用最小的非零进度
            const progressValues = Object.values(updated);

            // 找出最小的进度值（最慢的文件）
            let minProgress = 100;
            for (const value of progressValues) {
                // 只考虑已经开始上传的文件（进度 > 0）
                if (value > 0 && value < minProgress) {
                    minProgress = value;
                }
            }

            // 如果所有文件都没有开始上传，则总进度为0
            if (minProgress === 100 && progressValues.some(p => p === 0)) {
                minProgress = 0;
            }

            setTotalProgress(Math.floor(minProgress));

            return updated;
        });
    };

    // 上传单个文件
    const uploadSingleFile = async (file: any) => {
        try {
            // 为每个文件创建进度事件处理函数
            const onProgressEvent = (progressEvent: AxiosProgressEvent) => {
                const p = parseInt(`${(progressEvent.progress || 0) * 100}`);
                updateFileProgress(file.uid, p > 1 ? p : 1);
            };

            // 上传文件
            const result = await addResourceV5(file.originFileObj, file.originFileObj?.type, sessionId, "", onProgressEvent);

            if (result?.data) {
                // 文件上传完成后，更新该文件的进度为100%
                updateFileProgress(file.uid, 100);
                return result.data;
            } else {
                throw new Error('上传失败');
            }
        } catch (error) {
            console.error(`文件 ${file.name} 上传失败:`, error);
            throw error;
        }
    };

    // 开始批量上传
    const startUpload = async () => {

        onUploadStart?.()

        if (fileList.length === 0) {
            message.warning('请先选择文件');
            return;
        }

        setUploading(true);
        setUploadResults([]);

        // 初始化所有文件的进度为0
        const initialProgresses: Record<string, number> = {};
        fileList.forEach(file => {
            initialProgresses[file.uid] = 0;
        });
        setFileProgresses(initialProgresses);
        setTotalProgress(0); // 确保总进度从0开始

        try {
            // 创建会话
            const sessionRes = await addSessionV2({sessionId, scene, version});
            if (sessionRes.code) {
                message.error('创建会话失败');
                // setUploading(false);
                return;
            }

            // 并行上传所有文件
            const uploadPromises = [
                ...fileList.map(file => uploadSingleFile(file)),
            ];
            if (title) {
                uploadPromises.push(addResourceV5(title, "text/plain", sessionId, "title"));
            }

            // 等待所有上传完成
            const results = await Promise.allSettled(uploadPromises);

            // 处理上传结果
            const successResults = results
                .filter(result => result.status === 'fulfilled')
                .map(result => (result as PromiseFulfilledResult<any>).value);

            const failedCount = results.filter(result => result.status === 'rejected').length;

            if (failedCount > 0) {
                message.warning(t('uploadResult', {sc: successResults.length, fc: failedCount}));
            } else {
                message.success(t('uploadAll'));
            }

            setUploadResults(successResults);

            // 所有文件上传完成，设置总进度为100%
            setTotalProgress(100);

            if (failedCount > 0) {
                // 有失败的文件
            } else {
                onUploaded(successResults);
            }


        } catch (error) {
            console.error('上传过程中发生错误:', error);
            message.error('上传失败，请重试');
        } finally {
            // setUploading(false);
        }
    };

    const props: UploadProps = {
        multiple: true,
        maxCount: max,
        fileList: fileList,
        showUploadList: true,
        beforeUpload,
        accept,
        customRequest: ({file, onSuccess}) => {
            // 不立即上传，只添加到文件列表
            setTimeout(() => {
                onSuccess && onSuccess("ok");
            }, 0);
        },
        onChange(info) {
            setFileList(info.fileList);
        },
        onRemove(file) {
            // 从进度记录中移除该文件
            setFileProgresses(prev => {
                const updated = {...prev};
                delete updated[file.uid];

                // 重新计算总进度
                if (Object.keys(updated).length > 0) {
                    const progressValues = Object.values(updated);
                    const minProgress = Math.min(...progressValues.filter(p => p > 0));
                    setTotalProgress(Math.floor(minProgress || 0));
                } else {
                    setTotalProgress(0);
                }

                return updated;
            });
        }
    };

    return (
        <XFlex vertical gap={10} block>
            <Upload {...props}>
                {children}
            </Upload>

            <Input.TextArea value={title} onChange={v => setTitle(v.target.value)}
                            placeholder={t('inputCoverTitle')}/>

            {!uploading && fileList.length > 0 && (
                <Button
                    type="primary"
                    onClick={startUpload}
                    disabled={uploading}
                    style={{marginTop: 16, marginBottom: 16}}
                >
                    {uploading ? t('uploading') : t('startToUpload', {count: fileList.length})}
                </Button>
            )}

            {uploading && (
                <Progress
                    strokeColor={themeVars.colorPrimary}
                    percent={totalProgress}
                    status="active"
                    style={{marginBottom: 8}}
                />
            )}
        </XFlex>
    );
}

export default Uploader;
