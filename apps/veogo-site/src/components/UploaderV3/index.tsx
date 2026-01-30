import React, {useState} from 'react';
import {Button, message, Progress, Upload, type UploadProps, Card, Input} from 'antd';
import {useXTheme, XFlex, XText} from "@pro/ui";
import {useTranslation} from "@/i18n/routing";
import {addSessionV2, uploadFileV3} from "@/api/api";
import {AxiosProgressEvent} from "axios";
import {UploadOutlined} from "@ant-design/icons";
import {useGlobalState} from "@/hooks/global";

function Uploader({
                      onUploaded,
                      onUploadStart,
                      sessionId,
                      scene,
                      version,
                      accept,
                      max = 1,
                      disabled,
                  }: {
    onUploaded: (data: any[]) => void,
    onUploadStart?: () => void,
    sessionId: string,
    scene: string,
    version?: string,
    accept?: string,
    max?: number
    style?: React.CSSProperties
    disabled?: boolean
}) {
    const {themeVars} = useXTheme();
    const t = useTranslation();

    const [fileList, setFileList] = useState<any[]>([]);

    const [title, setTitle] = useState<string>('');
    const [uploading, setUploading] = useState<boolean>(false);
    const [fileProgresses, setFileProgresses] = useState<Record<string, number>>({});
    const [totalProgress, setTotalProgress] = useState<number>(0);
    const [uploadResults, setUploadResults] = useState<any[]>([]);

    // const [selectedProfile, setSelectedProfile] = useGlobalState()

    const beforeUpload = async (file: any) => {
        const isAllowedSize = file.size < 1024 * 1024 * 500;
        if (!isAllowedSize) {
            message.error("文件过大，请上传500M以内的视频");
            return false;
        }
        return true;
    };

    // 更新单个文件的进度
    const updateFileProgress = (uid: string, progress: number) => {
        setFileProgresses(prev => {
            const updated = {...prev, [uid]: progress};

            // 计算总体进度
            const totalFiles = Object.keys(updated).length;
            const progressSum = Object.values(updated).reduce((sum, curr) => sum + curr, 0);
            const avgProgress = progressSum / totalFiles;

            setTotalProgress(Math.floor(avgProgress));

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
            const result = await uploadFileV3(file.originFileObj, sessionId, onProgressEvent);

            if (result?.data) {
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

        try {
            // 创建会话
            const sessionRes = await addSessionV2({sessionId, scene, version});
            if (sessionRes.code) {
                message.error('创建会话失败');
                // setUploading(false);
                return;
            }

            // 并行上传所有文件
            const uploadPromises = fileList.map(file => uploadSingleFile(file));

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

            if (failedCount > 0) {

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
        listType: "picture-card",
        showUploadList: true,
        beforeUpload,
        accept,
        // customRequest: ({file, onSuccess}) => {
        //     // 不立即上传，只添加到文件列表
        //     setTimeout(() => {
        //         onSuccess && onSuccess("ok");
        //     }, 0);
        // },
        onChange(info) {
            setFileList(info.fileList);
        },
        onRemove(file) {
            // 从进度记录中移除该文件
            setFileProgresses(prev => {
                const updated = {...prev};
                delete updated[file.uid];
                return updated;
            });
        }
    };

    return (
        <XFlex vertical gap={10} block>
            <Upload {...props} disabled={uploading || disabled}>
                {
                    !(fileList.length >= max) &&
                    <XFlex center vertical gap={10} style={{paddingInline: 10}}>
                        <UploadOutlined/>
                        <XText size={10} color={themeVars.colorTextL2}>
                            {disabled ? '请先绑定账号' : t('chooseFile', {max: max})}
                        </XText>
                    </XFlex>
                    // <Button
                    //     block
                    //     size={'large'}
                    //     type={'dashed'}
                    //     icon={<UploadOutlined/>}
                    //     disabled={uploading || disabled}
                    // >
                    //     {/*{t('chooseFile', {max: 15})}*/}
                    // </Button>
                }

            </Upload>

            {/*<Input.TextArea value={title} onChange={v => setTitle(v.target.value)}*/}
            {/*                placeholder={t('inputCoverTitle')}/>*/}

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
