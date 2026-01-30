import { Button, Modal, Input, List, message, Space, Typography } from "antd";
import React, { useState } from "react";
import { getDouyinVideoUrl } from "@/api/resource";
import { extractDouyinLink } from "@/utils/url.ts";

const { TextArea } = Input;
const { Text } = Typography;

interface UploadResult {
    videoUrl: string;
}

interface UploadModalProps {
    visible: boolean;
    onCancel: () => void;
    onUploaded: (results: UploadResult[]) => void;
}

interface UploadItem {
    url: string;
    status: 'pending' | 'uploading' | 'success' | 'error' | 'retrying';
    result?: UploadResult;
    error?: string;
    retryCount?: number;
}

const UploadModal = ({ visible, onCancel, onUploaded }: UploadModalProps) => {
    const [urls, setUrls] = useState<string>('');
    const [uploadItems, setUploadItems] = useState<UploadItem[]>([]);
    const [uploading, setUploading] = useState(false);

    // 解析URL列表（支持换行分隔）
    const parseUrls = (urlString: string): string[] => {
        return urlString
            .split('\n')
            .map(url => url.trim())
            .map(url => extractDouyinLink(url))
            .filter(url => url.length > 0);
    };

    // 批量上传视频
    const handleUpload = async () => {
        const urlList = parseUrls(urls);

        if (urlList.length === 0) {
            message.warning('请输入至少一个视频URL');
            return;
        }

        setUploading(true);

        // 初始化上传项
        const items: UploadItem[] = urlList.map(url => ({
            url,
            status: 'pending'
        }));
        setUploadItems(items);

        const results: UploadResult[] = [];

        // 逐个上传
        for (let i = 0; i < items.length; i++) {
            let retryCount = 0;
            const MAX_RETRIES = 3;
            let success = false;

            while (retryCount < MAX_RETRIES && !success) {
                try {
                    // 更新状态
                    setUploadItems(prev => {
                        const newItems = [...prev];
                        newItems[i].status = retryCount === 0 ? 'uploading' : 'retrying';
                        newItems[i].retryCount = retryCount;
                        return newItems;
                    });

                    // 调用API获取视频URL
                    const videoUrl = await getDouyinVideoUrl({ url: items[i].url });

                    // @ts-ignore
                    const result: UploadResult = { videoUrl: videoUrl?.url };
                    results.push(result);

                    // 更新状态为成功
                    setUploadItems(prev => {
                        const newItems = [...prev];
                        newItems[i].status = 'success';
                        newItems[i].result = result;
                        return newItems;
                    });
                    success = true;
                } catch (error: any) {
                    retryCount++;
                    if (retryCount >= MAX_RETRIES) {
                        // 更新状态为失败
                        setUploadItems(prev => {
                            const newItems = [...prev];
                            newItems[i].status = 'error';
                            newItems[i].error = error?.message || '上传失败';
                            return newItems;
                        });
                    } else {
                        // 等待一秒后重试
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    }
                }
            }
        }

        setUploading(false);

        // 如果有成功的结果，调用回调
        if (results.length > 0) {
            onUploaded(results);
            message.success(`成功上传 ${results.length} 个视频`);
        } else {
            message.error('所有视频上传失败');
        }
    };

    // 重置状态
    const handleReset = () => {
        setUrls('');
        setUploadItems([]);
        setUploading(false);
    };

    // 关闭弹窗
    const handleCancel = () => {
        handleReset();
        onCancel();
    };

    // 获取状态显示文本
    const getStatusText = (item: UploadItem) => {
        switch (item.status) {
            case 'pending':
                return <Text type="secondary">等待上传</Text>;
            case 'uploading':
                return <Text type="warning">上传中...</Text>;
            case 'retrying':
                return <Text type="warning">重试中 (第{item.retryCount}次)...</Text>;
            case 'success':
                return <Text type="success">上传成功</Text>;
            case 'error':
                return <Text type="danger">上传失败: {item.error}</Text>;
            default:
                return null;
        }
    };

    return (
        <Modal
            title="上传视频"
            open={visible}
            width={800}
            destroyOnHidden
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    取消
                </Button>,
                <Button
                    key="upload"
                    type="primary"
                    onClick={handleUpload}
                    loading={uploading}
                    disabled={!urls.trim()}
                >
                    {uploading ? '上传中...' : '开始上传'}
                </Button>
            ]}
        >
            <Space direction="vertical" style={{ width: '100%' }} size="large">
                <div>
                    <Text strong>请输入视频分享链接（每行一个）：</Text>
                    <TextArea
                        value={urls}
                        onChange={(e) => setUrls(e.target.value)}
                        placeholder="1.02 复制打开抖音，看看【策泽选好物的作品】维生素B5儿童面霜婴儿春夏滋润保湿护肤大白罐润护霜... https://v.douyin.com/JuaO2OgC6V0/ 04/11 D@h.ba rRX:/"
                        rows={6}
                        disabled={uploading}
                        style={{ marginTop: 8 }}
                    />
                </div>

                {uploadItems.length > 0 && (
                    <div>
                        <Text strong>上传进度：</Text>
                        <List
                            size="small"
                            bordered
                            dataSource={uploadItems}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <Space direction="vertical" style={{ width: '100%' }} size="small">
                                        <Text ellipsis style={{ width: '100%' }}>
                                            {index + 1}. {item.url}
                                        </Text>
                                        {getStatusText(item)}
                                        {item.result && (
                                            <Text type="secondary" style={{ fontSize: 12 }}>
                                                视频URL: {item.result.videoUrl}
                                            </Text>
                                        )}
                                    </Space>
                                </List.Item>
                            )}
                            style={{ marginTop: 8, maxHeight: 300, overflow: 'auto' }}
                        />
                    </div>
                )}
            </Space>
        </Modal>
    );
};

export default UploadModal;
