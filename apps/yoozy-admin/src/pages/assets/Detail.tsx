import React, { useEffect } from "react";
import { useParams } from "react-router";
import PageContainer from "@/components/PageContainer";
import { getAdminAsset } from "@/api/asset";
import { useRequest } from "ahooks";
import { Skeleton, Descriptions, Tag, Card, Tabs, Typography, Space, Image, List, Empty, Collapse } from "antd";
import {
    UserOutlined, ClockCircleOutlined,
    VideoCameraOutlined, StopOutlined, CheckCircleOutlined,
    SyncOutlined, LinkOutlined, FireOutlined, FileTextOutlined
} from '@ant-design/icons';
import dayjs from "dayjs";

const { Text, Title, Paragraph } = Typography;
const { Panel } = Collapse;

// --- Sub Components ---

const ReferencePlayer = ({ url, startTime = 0, endTime }: { url: string, startTime?: number, endTime?: number }) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current && startTime > 0) {
            videoRef.current.currentTime = startTime;
        }
    }, [url, startTime]);

    const handleTimeUpdate = () => {
        if (!videoRef.current || !endTime) return;
        if (videoRef.current.currentTime >= endTime) {
            videoRef.current.currentTime = startTime;
            videoRef.current.play().catch(() => { });
        }
    };

    return (
        <video
            ref={videoRef}
            src={url}
            controls
            className="w-full h-full object-contain"
            onTimeUpdate={handleTimeUpdate}
        />
    );
};

export default function AssetDetail() {
    const { id } = useParams<{ id: string }>();
    const { data, loading, run } = useRequest(() => getAdminAsset({ id: id || '' }), {
        manual: true,
    });

    useEffect(() => {
        if (id) {
            run();
        }
    }, [id]);

    const asset = data?.data;

    const fmtTime = (ts?: number) => ts ? dayjs(ts * 1000).format('YYYY-MM-DD HH:mm:ss') : '-';

    const renderStatus = (status: string) => {
        let color = 'default';
        let icon = <SyncOutlined spin />;

        switch (status) {
            case 'completed':
                color = 'success';
                icon = <CheckCircleOutlined />;
                break;
            case 'failed':
                color = 'error';
                icon = <StopOutlined />;
                break;
            case 'promptGenerated':
            case 'promptGenerating':
                color = 'purple';
                break;
        }
        return <Tag icon={icon} color={color}>{status?.toUpperCase()}</Tag>;
    };

    if (!asset && !loading) return <Empty description="未找到资产" />;

    // Video URLs
    const resultUrl = asset?.url;
    const referenceUrl = asset?.segment?.root?.url || asset?.segment?.url;
    const coverUrl = asset?.coverUrl;

    // Segment Times
    const timeStart = asset?.segment?.timeStart;
    const timeEnd = asset?.segment?.timeEnd;

    return (
        <PageContainer title="资产详情" >
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="max-w-[1800px] mx-auto space-y-6">
                    {loading ? (
                        <Skeleton active paragraph={{ rows: 10 }} />
                    ) : (
                        <>
                            {/* Unified Asset Overview Card */}
                            <Card className="shadow-sm border-0" bodyStyle={{ padding: '24px' }}>
                                {/* Helper Header */}
                                <div className="flex justify-between items-start mb-6">
                                    <div className="space-y-1">
                                        <Title level={4} style={{ margin: 0 }}>
                                            {asset?.commodity?.title || asset?.params?.commodity?.name || '未命名资产'}
                                        </Title>
                                        <div className="flex items-center gap-4 text-gray-500 text-sm">
                                            <Space><UserOutlined /> {asset?.userId}</Space>
                                            <Space><ClockCircleOutlined /> {fmtTime(asset?.createdAt)}</Space>
                                            <Space className="font-mono text-gray-400">ID: {asset?._id}</Space>
                                        </div>
                                    </div>
                                    <div>{renderStatus(asset?.status)}</div>
                                </div>

                                {/* Video Comparison Grid */}
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8 text-center">
                                    {/* Generated Result */}
                                    <div className="flex flex-col gap-3">
                                        <div className="text-left font-medium text-lg flex items-center gap-2">
                                            生成结果
                                            {asset?.status === 'completed' && <CheckCircleOutlined className="text-green-500" />}
                                        </div>
                                        <div className="bg-black/90 rounded-xl overflow-hidden shadow-inner aspect-video relative group flex items-center justify-center">
                                            {resultUrl ? (
                                                <video
                                                    src={resultUrl}
                                                    controls
                                                    poster={coverUrl}
                                                    className="w-full h-full object-contain"
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center text-gray-500">
                                                    <VideoCameraOutlined className="text-4xl mb-2" />
                                                    <span>暂无生成结果</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Reference Video */}
                                    <div className="flex flex-col gap-3">
                                        <div className="text-left font-medium text-lg flex justify-between items-center">
                                            <span>参考视频 / 模板</span>
                                            {(timeStart !== undefined || timeEnd !== undefined) && (
                                                <span className="text-xs font-normal text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                                    截取: {timeStart || 0}s - {timeEnd || '?'}s
                                                </span>
                                            )}
                                        </div>
                                        <div className="bg-black/90 rounded-xl overflow-hidden shadow-inner aspect-video relative group flex items-center justify-center">
                                            {referenceUrl ? (
                                                <ReferencePlayer
                                                    url={referenceUrl}
                                                    startTime={timeStart}
                                                    endTime={timeEnd}
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center text-gray-500">
                                                    暂无参考视频
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                            </Card>

                            {/* Failure Reason Alert */}
                            {asset?.status === 'failed' && (
                                <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm flex items-start gap-2">
                                    <StopOutlined className="mt-1" />
                                    <div>
                                        <div className="font-bold">生成失败</div>
                                        <div>{asset?.extra?.context?.failedReason}</div>
                                    </div>
                                </div>
                            )}

                            {/* Bottom: Detailed Tabs */}
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <Tabs
                                    defaultActiveKey="prompt"
                                    tabBarStyle={{ padding: '0 24px', margin: 0 }}
                                    size="large"
                                    items={[
                                        {
                                            key: 'prompt',
                                            label: '提示词',
                                            children: (
                                                <div className="p-6">
                                                    <div className="relative group">
                                                        <Paragraph
                                                            copyable
                                                            className="bg-slate-50 p-6 rounded-2xl text-slate-700 text-base leading-loose mb-0 border border-slate-100 whitespace-pre-wrap shadow-sm"
                                                        >
                                                            {asset?.prompt || '无提示词'}
                                                        </Paragraph>
                                                    </div>
                                                </div>
                                            )
                                        },
                                        {
                                            key: 'product',
                                            label: '商品',
                                            children: <div className="p-6"><ProductAnalysisTab asset={asset} /></div>
                                        }
                                    ]}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </PageContainer>
    );
}

// --- Sub Components ---

const TaskInfoTab = ({ asset }: { asset: any }) => (
    <div className="space-y-6">
        <Descriptions title="基础参数" bordered column={1}>
            <Descriptions.Item label="商品名称">{asset?.commodity?.title || asset?.params?.commodity?.name}</Descriptions.Item>
            <Descriptions.Item label="来源 URL">
                {asset?.commodity?.url ? (
                    <a href={asset.commodity.url} target="_blank" className="flex items-center gap-1 text-blue-600">
                        <LinkOutlined /> 打开链接
                    </a>
                ) : 'UGC 上传'}
            </Descriptions.Item>
            <Descriptions.Item label="Group ID">{asset?.group?.id || '-'}</Descriptions.Item>
            <Descriptions.Item label="失败重试次数">{asset?.extra?.context?.failedCount || 0}</Descriptions.Item>
        </Descriptions>
    </div>
);

const ScriptStrategyTab = ({ asset }: { asset: any }) => {
    const segment = asset?.segment || {};
    const highlightFrames = segment?.highlightFrames || [];

    return (
        <div className="space-y-8">
            {/* Overview Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="风格" value={segment?.style} />
                <StatCard label="基调" value={segment?.contentStyle} />
                <StatCard label="场景" value={segment?.sceneStyle} />
                <StatCard label="时长" value={`${segment?.timeStart || 0} - ${segment?.timeEnd || 0}s`} />
            </div>

            <div>
                <Title level={5}>脚本概览</Title>
                <div className="grid grid-cols-1 gap-4">
                    <InfoBlock title="画面描述" content={segment?.description} />
                    <InfoBlock title="字幕文案" content={segment?.subtitle} highlight />
                    <InfoBlock title="拍摄指导" content={segment?.shootingStyle} />
                </div>
            </div>

            {/* Storyboard */}
            {highlightFrames.length > 0 && (
                <div>
                    <Title level={5}>分镜高光 (Storyboard)</Title>
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                        {highlightFrames.map((item: any, i: number) => (
                            <div key={i} className="group relative rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                                <Image src={item.url} className="w-full aspect-video object-cover" />
                                <div className="p-3 bg-white">
                                    <div className="text-xs text-gray-500 line-clamp-3 mb-2 min-h-[3em]">{item.desc}</div>
                                    {item.timestamp && (
                                        <span className="inline-block px-1.5 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded">
                                            {item.timestamp}s
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Tags Cloud */}
            {segment?.typedTags && (
                <div>
                    <Title level={5}>标签分析</Title>
                    <div className="bg-gray-50 p-4 rounded-xl space-y-4">
                        {Object.entries(segment.typedTags).map(([key, tags]: [string, any]) => (
                            <div key={key} className="flex gap-4 items-start">
                                <div className="w-20 shrink-0 text-xs font-bold text-gray-400 uppercase pt-1 text-right">{key}</div>
                                <div className="flex flex-wrap gap-2">
                                    {Array.isArray(tags) && tags.map((t, i) => (
                                        <Tag key={i} bordered={false} className="bg-white text-gray-600 border-gray-200 shadow-sm">{t}</Tag>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const ProductAnalysisTab = ({ asset }: { asset: any }) => {
    const commodity = asset?.commodity || asset?.params?.commodity || {};
    const images = commodity?.images || [];
    const medias = commodity?.medias || [];
    const chances = commodity?.chances || [];

    return (
        <div className="space-y-8">
            {/* Images Grid */}
            {medias.length > 0 && (
                <div>
                    <Title level={5}>自定义素材图库</Title>
                    <Image.PreviewGroup>
                        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mt-4">
                            {medias.map((img: any, i: number) => (
                                <div key={i} className="aspect-square rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-transform hover:-translate-y-1 cursor-zoom-in">
                                    <Image src={img.url} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </Image.PreviewGroup>
                </div>
            )}
            {/* Images Grid */}
            {images.length > 0 && (
                <div>
                    <Title level={5}>素材图库</Title>
                    <Image.PreviewGroup>
                        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mt-4">
                            {images.map((img: string, i: number) => (
                                <div key={i} className="aspect-square rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-transform hover:-translate-y-1 cursor-zoom-in">
                                    <Image src={img} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </Image.PreviewGroup>
                </div>
            )}
            {/* Product Header */}
            <div className="flex gap-6 items-start">
                <div className="flex-1 space-y-4">
                    <div>
                        <div className="text-xs text-gray-400 mb-1">商品名称</div>
                        <div className="text-lg font-medium">{commodity?.name || '-'}</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-400 mb-1">品牌</div>
                        <div className="text-base">{commodity?.brand || '-'}</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-400 mb-1">标签</div>
                        <div className="flex flex-wrap gap-1">
                            {commodity?.tags?.map((t: string, i: number) => <Tag key={i} color="blue">{t}</Tag>)}
                        </div>
                    </div>
                </div>
            </div>

            <InfoBlock title="商品描述" content={commodity?.description} />


            {/* Marketing Strategy */}
            {chances.length > 0 && (
                <div>
                    <Title level={5}>营销策略 (Targeting & Points)</Title>
                    <div className="space-y-4 mt-4">
                        {chances.map((chance: any, index: number) => (
                            <Card key={index} size="small" title={`策略组 ${index + 1}: ${chance?.targetAudience?.tags?.[0] || 'Target'}`} className="bg-gray-50/50">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <div className="text-xs font-bold text-blue-500 mb-2 uppercase">Target Audience</div>
                                        <div className="text-sm text-gray-700 mb-2">{chance?.targetAudience?.description}</div>
                                        <div className="flex flex-wrap gap-1">
                                            {chance?.targetAudience?.tags?.map((t: string, i: number) => <Tag color="cyan" key={i}>{t}</Tag>)}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-green-500 mb-2 uppercase">Selling Points</div>
                                        <List
                                            split={false}
                                            dataSource={chance?.sellingPoints || []}
                                            renderItem={(point: any) => (
                                                <List.Item className="!py-1 !px-0">
                                                    <div className="text-sm">
                                                        <span className="mr-2">•</span>{point.description}
                                                    </div>
                                                </List.Item>
                                            )}
                                        />
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}


        </div>
    );
};

const RawDataTab = ({ asset }: { asset: any }) => (
    <div className="bg-gray-900 p-6 rounded-xl font-mono text-xs text-green-400 overflow-auto max-h-[800px] shadow-inner">
        <pre>{JSON.stringify(asset, null, 2)}</pre>
    </div>
);

// --- Tiny Components ---

const StatCard = ({ label, value }: { label: string, value: any }) => (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
        <div className="text-gray-400 text-xs mb-1">{label}</div>
        <div className="font-medium text-gray-800 line-clamp-1" title={String(value)}>{value || '-'}</div>
    </div>
);

const InfoBlock = ({ title, content, highlight = false }: { title: string, content: string, highlight?: boolean }) => (
    <div className={`p-4 rounded-xl ${highlight ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50 border border-gray-100'}`}>
        <div className={`text-xs font-bold mb-2 uppercase ${highlight ? 'text-blue-500' : 'text-gray-400'}`}>{title}</div>
        <div className={`text-sm leading-relaxed whitespace-pre-wrap ${highlight ? 'text-blue-900' : 'text-gray-700'}`}>
            {content || '-'}
        </div>
    </div>
);
