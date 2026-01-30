import React, {useState, useRef} from 'react';
import {Button, message, Progress, List, Typography, Modal, Upload, Space, Divider} from 'antd';
import {UploadOutlined, DeleteOutlined, InboxOutlined} from '@ant-design/icons';
import {performSingleUpload} from "@/utils/upload/oss.ts";
import {upload} from "@/utils/upload/tos.ts";

const {Text, Title} = Typography;
const {Dragger} = Upload;

interface UploadResult {
    videoUrl: string;
    coverUrl: string;
    fileName: string;
}

interface UploadItem {
    file: File;
    status: 'pending' | 'uploading' | 'success' | 'error';
    progress: number;
    result?: UploadResult;
    error?: string;
}

interface BatchUploadModalProps {
    visible: boolean;
    onCancel: () => void;
    onUploaded: (results: UploadResult[]) => void;
}

const BatchUploadModal = ({visible, onCancel, onUploaded}: BatchUploadModalProps) => {
    const [uploading, setUploading] = useState(false);
    const [uploadItems, setUploadItems] = useState<UploadItem[]>([]);

    // 获取视频第一帧
    const getVideoFirstFrame = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const video = document.createElement('video');
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                reject(new Error('无法创建canvas上下文'));
                return;
            }

            video.onloadedmetadata = () => {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                video.currentTime = 0;
            };

            video.onseeked = () => {
                try {
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    canvas.toBlob((blob) => {
                        if (blob) {
                            const coverFile = new File([blob], 'cover.jpg', {
                                type: 'image/jpeg'
                            });
                            resolve(URL.createObjectURL(coverFile));
                        } else {
                            reject(new Error('无法生成封面图片'));
                        }
                    }, 'image/jpeg', 0.8);
                } catch (error) {
                    reject(error);
                }
            };

            video.onerror = () => {
                reject(new Error('视频加载失败'));
            };

            video.src = URL.createObjectURL(file);
            video.load();
        });
    };

    // 上传单个文件
    const uploadSingleFile = async (item: UploadItem): Promise<UploadResult> => {
        const {file} = item;

        setUploadItems(prev => prev.map(i =>
            i.file === file ? {...i, status: 'uploading', progress: 0} : i
        ));

        try {
            // 上传视频文件
            const videoUrl = await upload(file, (progress) => {
                setUploadItems(prev => prev.map(i =>
                    i.file === file ? {...i, progress: Math.round(progress * 0.7)} : i
                ));
            });

            // 获取并上传封面
            const coverDataUrl = await getVideoFirstFrame(file);
            const response = await fetch(coverDataUrl);
            const coverBlob = await response.blob();
            const coverFile = new File([coverBlob], 'cover.jpg', {
                type: 'image/jpeg'
            });

            const coverUrl = await upload(coverFile, (progress) => {
                setUploadItems(prev => prev.map(i =>
                    i.file === file ? {...i, progress: 70 + Math.round(progress * 0.3)} : i
                ));
            });

            const result: UploadResult = {
                videoUrl,
                coverUrl,
                fileName: file.name
            };

            setUploadItems(prev => prev.map(i =>
                i.file === file ? {...i, status: 'success', progress: 100, result} : i
            ));

            return result;

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '上传失败';
            setUploadItems(prev => prev.map(i =>
                i.file === file ? {...i, status: 'error', error: errorMessage} : i
            ));
            throw error;
        }
    };

    // 批量上传
    const handleBatchUpload = async () => {
        const pendingItems = uploadItems.filter(item => item.status === 'pending');
        if (pendingItems.length === 0) return;

        setUploading(true);
        const results: UploadResult[] = [];

        try {
            const concurrency = 3;
            for (let i = 0; i < pendingItems.length; i += concurrency) {
                const batch = pendingItems.slice(i, i + concurrency);
                const batchPromises = batch.map(item =>
                    uploadSingleFile(item).catch(error => {
                        console.error(`Upload failed for ${item.file.name}:`, error);
                        return null;
                    })
                );

                const batchResults = await Promise.all(batchPromises);
                results.push(...batchResults.filter(result => result !== null) as UploadResult[]);
            }

            const successCount = results.length;
            const totalCount = pendingItems.length;

            if (successCount === totalCount) {
                message.success(`批量上传成功！共上传 ${successCount} 个文件`);
            } else {
                message.warning(`上传完成！成功 ${successCount}/${totalCount} 个文件`);
            }

            onUploaded(results);
            setUploadItems([])


        } catch (error) {
            console.error('Batch upload failed:', error);
            message.error('批量上传失败！');
        } finally {
            setUploading(false);
        }
    };

    // 处理文件选择
    const handleFileSelect = (file: File) => {
        if (!file.type.startsWith('video/')) {
            message.error('请选择视频文件！');
            return false;
        }

        const newItem: UploadItem = {
            file,
            status: 'pending',
            progress: 0
        };

        setUploadItems(prev => [...prev, newItem]);
        return false; // 阻止默认上传行为
    };

    // 移除文件
    const removeFile = (file: File) => {
        setUploadItems(prev => prev.filter(item => item.file !== file));
    };

    // 清空所有文件
    const clearAll = () => {
        setUploadItems([]);
    };

    // 获取状态统计
    const getStatusCounts = () => {
        const counts = uploadItems.reduce((acc, item) => {
            acc[item.status] = (acc[item.status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        return counts;
    };

    const statusCounts = getStatusCounts();
    const hasPendingFiles = statusCounts.pending > 0;
    const hasUploadingFiles = statusCounts.uploading > 0;

    // 关闭弹窗时重置状态
    const handleCancel = () => {
        if (!uploading) {
            setUploadItems([]);
            onCancel();
        }
    };

    return (
        <Modal
            title="批量上传视频"
            open={visible}
            onCancel={handleCancel}
            width={800}
            footer={[
                <Button key="cancel" onClick={handleCancel} disabled={uploading}>
                    取消
                </Button>,
                <Button key="clear" onClick={clearAll} disabled={uploading || uploadItems.length === 0}>
                    清空
                </Button>,
                <Button
                    key="upload"
                    type="primary"
                    loading={uploading}
                    onClick={handleBatchUpload}
                    disabled={!hasPendingFiles || hasUploadingFiles}
                >
                    {uploading ? '上传中...' : `开始上传 (${statusCounts.pending || 0} 个文件)`}
                </Button>
            ]}
        >
            <div style={{maxHeight: '60vh', overflow: 'auto'}}>
                {/* 拖拽上传区域 */}
                <Dragger
                    accept="video/*"
                    multiple
                    beforeUpload={handleFileSelect}
                    showUploadList={false}
                    disabled={uploading}
                    style={{
                        marginBottom: 16,
                        // background: '#fafafa',
                        border: '2px dashed #d9d9d9'
                    }}
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined style={{fontSize: 48, color: '#1890ff'}} />
                    </p>
                    <p className="ant-upload-text" style={{fontSize: 16, marginBottom: 8}}>
                        点击或拖拽视频文件到此区域上传
                    </p>
                    <p className="ant-upload-hint" style={{color: '#666'}}>
                        支持多选，仅支持视频格式文件
                    </p>
                </Dragger>

                {/* 文件列表 */}
                {uploadItems.length > 0 && (
                    <>
                        <Divider />
                        <div style={{marginBottom: 16}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}}>
                                <Title level={5} style={{margin: 0}}>
                                    文件列表 ({uploadItems.length} 个文件)
                                </Title>
                                <Space>
                                    {statusCounts.success > 0 && (
                                        <Text type="success">成功: {statusCounts.success}</Text>
                                    )}
                                    {statusCounts.error > 0 && (
                                        <Text type="danger">失败: {statusCounts.error}</Text>
                                    )}
                                    {statusCounts.pending > 0 && (
                                        <Text type="warning">待上传: {statusCounts.pending}</Text>
                                    )}
                                </Space>
                            </div>

                            <List
                                size="small"
                                dataSource={uploadItems}
                                renderItem={(item) => (
                                    <List.Item
                                        actions={[
                                            item.status === 'pending' && (
                                                <Button
                                                    type="text"
                                                    size="small"
                                                    icon={<DeleteOutlined/>}
                                                    onClick={() => removeFile(item.file)}
                                                    disabled={uploading}
                                                />
                                            )
                                        ]}
                                        // style={{
                                        //     padding: '8px 0',
                                        //     borderBottom: '1px solid #f0f0f0'
                                        // }}
                                    >
                                        <List.Item.Meta
                                            title={
                                                <Text
                                                    ellipsis={{tooltip: item.file.name}}
                                                    style={{maxWidth: 300}}
                                                >
                                                    {item.file.name}
                                                </Text>
                                            }
                                            description={
                                                <div>
                                                    <Text type="secondary" style={{fontSize: 12}}>
                                                        {(item.file.size / 1024 / 1024).toFixed(2)} MB
                                                    </Text>
                                                    {item.status === 'uploading' && (
                                                        <Progress
                                                            percent={item.progress}
                                                            size="small"
                                                            style={{marginTop: 4}}
                                                        />
                                                    )}
                                                    {item.status === 'success' && (
                                                        <Text type="success" style={{fontSize: 12}}>
                                                            ✓ 上传成功
                                                        </Text>
                                                    )}
                                                    {item.status === 'error' && (
                                                        <Text type="danger" style={{fontSize: 12}}>
                                                            ✗ {item.error}
                                                        </Text>
                                                    )}
                                                </div>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                    </>
                )}

            </div>
        </Modal>
    );
};

export default BatchUploadModal;
