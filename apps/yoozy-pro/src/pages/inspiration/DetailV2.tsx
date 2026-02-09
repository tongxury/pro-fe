import { ReactNode, useState } from "react";
import { Button, Tag, Typography, Skeleton, Divider, Modal, Tooltip, message } from "antd";
import {
    PlayCircleOutlined,
    PictureOutlined,
    ClockCircleOutlined,
    ArrowRightOutlined,
    FileTextOutlined,
    CopyOutlined,
    HeartOutlined,
    HeartFilled,
} from "@ant-design/icons";
import { useRouter } from "@/hooks/useRouter.tsx";
import VideoSegment from "@/components/VideoSegment";
import { getResourceSegment, updateResourceSegment } from "@/api/resource.ts";
import Image from "@/components/Image";
import { formatDuration } from "@/utils";
import { useRequestData } from "@/hooks/useRequestData";
import inspiration from ".";

const Detail = ({ id, showEntry, children }: { id: string, showEntry?: boolean, children: ReactNode }) => {

    const [open, setOpen] = useState(false);
    const [scriptOpen, setScriptOpen] = useState(false);
    const [collected, setCollected] = useState(false);

    const router = useRouter()

    const { data, loading } = useRequestData(async () => {
        const res = await getResourceSegment({ id: id });
        if (res?.data) {
            setCollected(!!res.data.collected);
        }
        return res;
    }, { ready: open })

    const onOpen = () => {
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
    }

    const category = data?.style;

    const renderSkeleton = () => (
        <div className="flex h-full">
            {/* Left Panel Skeleton */}
            <div className="w-[480px] flex-shrink-0 bg-gray-50 h-full flex items-center justify-center p-8">
                <Skeleton.Button active block style={{ width: '100%', height: '50%', borderRadius: 16, opacity: 0.1 }} />
            </div>

            {/* Right Panel Skeleton */}
            <div className="flex-1 bg-white h-full relative overflow-hidden flex flex-col">
                <div className="p-8 xl:p-10 flex-1">
                    <div className="space-y-8 max-w-3xl mx-auto">
                        <Skeleton active paragraph={{ rows: 1 }} title={{ width: '60%' }} />
                        <div className="flex gap-2">
                            <Skeleton.Button active size="small" style={{ width: 80 }} />
                            <Skeleton.Button active size="small" style={{ width: 80 }} />
                        </div>
                        <div className="grid grid-cols-4 gap-4 mt-8">
                            <Skeleton.Button active style={{ width: '100%', aspectRatio: '3/4', borderRadius: 8 }} />
                            <Skeleton.Button active style={{ width: '100%', aspectRatio: '3/4', borderRadius: 8 }} />
                            <Skeleton.Button active style={{ width: '100%', aspectRatio: '3/4', borderRadius: 8 }} />
                            <Skeleton.Button active style={{ width: '100%', aspectRatio: '3/4', borderRadius: 8 }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        if (loading) {
            return renderSkeleton();
        }

        return (
            <div className="flex h-full">
                {/* Left Panel: Video Preview */}
                <div className="w-[360px] flex-shrink-0 flex flex-col">
                    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white">
                        <VideoSegment
                            url={data?.root?.url}
                            coverUrl={data?.root?.coverUrl}
                            startTime={data?.timeStart}
                            endTime={data?.timeEnd}
                        />
                    </div>
                </div>

                {/* Right Panel: Detail Info */}
                <div className="flex-1 bg-white h-full flex flex-col min-w-0 relative">
                    <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-8 xl:p-10 pb-28">
                        <div className="max-w-3xl mx-auto space-y-8">

                            {/* Header Section */}
                            <div>
                                <div className="flex justify-between items-start gap-4 mb-4">
                                    <Typography.Title level={4} className="!m-0 !text-gray-900 !font-bold leading-tight tracking-tight">
                                        {data?.description}
                                    </Typography.Title>

                                    <div className="flex items-center gap-3">
                                        {data?.script && (
                                            <Button
                                                type="default"
                                                size="small"
                                                icon={<FileTextOutlined />}
                                                className="!rounded-full flex-shrink-0 !text-gray-600 !border-gray-200 hover:!text-[#7150ff] hover:!border-[#7150ff] hover:!bg-[#7150ff]/5 flex items-center gap-1 px-3"
                                                onClick={() => setScriptOpen(true)}
                                            >
                                                查看拍摄手法
                                            </Button>
                                        )}
                                        <div
                                            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-center"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const action = collected ? 'cancel' : 'collect';
                                                updateResourceSegment(id, action).then(() => {
                                                    setCollected(!collected);
                                                    message.success(collected ? '已取消收藏' : '已收藏');
                                                });
                                            }}
                                        >
                                            {collected ? <HeartFilled className="text-red-500 text-xl" /> : <HeartOutlined className="text-gray-400 text-xl hover:text-red-400" />}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 items-center">
                                    {category && (
                                        <Typography.Text className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 border-gray-200 text-sm font-medium m-0 flex items-center gap-1">
                                            {category}
                                        </Typography.Text>
                                    )}
                                    {data?.tags?.map((tag: string, index: number) => (
                                        <Tag key={index} className="px-3 py-1 rounded-full bg-[#7150ff]/5 text-[#7150ff] border-[#7150ff]/10 text-sm font-medium m-0">
                                            #{tag}
                                        </Tag>
                                    ))}
                                </div>
                            </div>

                            <Divider className="my-8 border-gray-100" />

                            {/* Highlight Frames */}
                            {Array.isArray(data?.highlightFrames) && data.highlightFrames.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <span className="w-1 h-6 bg-[#7150ff] rounded-full" />
                                        高光时刻
                                    </h3>
                                    <div
                                        className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                                        {data.highlightFrames?.map((f: any, i: number) => (
                                            <Tooltip key={i} title={f.desc}>
                                                <div
                                                    className="relative flex-shrink-0 w-32 aspect-[2/3] rounded-xl overflow-hidden group cursor-pointer border border-gray-100">
                                                    <img
                                                        src={f.url}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                    <div
                                                        className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                                </div>
                                            </Tooltip>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {/* Segment Analysis */}
                            {Array.isArray(data?.segments) && data.segments.length > 0 && (
                                <>
                                    <Divider style={{ margin: '16px 0' }} />
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                        <div style={{ fontSize: 14, fontWeight: 500, color: '#111827' }}>片段分析</div>
                                        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
                                            {data.segments.map((seg: any, i: number) => (
                                                <div key={i} style={{
                                                    flex: '0 0 240px',
                                                    border: '1px solid #eee',
                                                    borderRadius: 8,
                                                    overflow: 'hidden',
                                                    background: '#f9fafb'
                                                }}>
                                                    <div style={{ display: 'flex' }}>
                                                        <div style={{ flex: 1, position: 'relative', height: 135 }}>
                                                            <Image
                                                                src={seg.startFrame}
                                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                                alt="Start"
                                                                className={'!rounded-none'}
                                                            />
                                                            <div style={{ position: 'absolute', bottom: 0, left: 0, background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: 10, padding: '0 4px', borderTopRightRadius: 4, zIndex: 1 }}>
                                                                {formatDuration(seg.timeStart)}
                                                            </div>
                                                        </div>
                                                        <div style={{ width: 1, background: '#fff' }} />
                                                        <div style={{ flex: 1, position: 'relative', height: 135 }}>
                                                            <Image
                                                                src={seg.endFrame}
                                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                                alt="End"
                                                                className={'!rounded-none'}
                                                            />
                                                            <div style={{ position: 'absolute', bottom: 0, right: 0, background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: 10, padding: '0 4px', borderTopLeftRadius: 4, zIndex: 1 }}>
                                                                {formatDuration(seg.timeEnd)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style={{ padding: 8 }}>
                                                        <div style={{ fontSize: 12, color: '#374151', lineHeight: 1.4, height: 50, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }} title={seg.description}>
                                                            {seg.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>






                    {/* Sticky Bottom Action Bar */}
                    {showEntry && (
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/90 backdrop-blur-md z-10">
                            <div className="max-w-3xl mx-auto">
                                <Button
                                    type="primary"
                                    size="large"
                                    icon={<PlayCircleOutlined />}
                                    className="w-full !h-14 !rounded-full !text-lg !font-bold !bg-gray-900 !text-white hover:!bg-black border-none shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                                    onClick={() => {
                                        // Handle creation action
                                        router.push(`/create/segment-replication?inspirationId=${id}`);
                                    }}
                                >
                                    生成同款风格视频
                                </Button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        );
    }

    return (
        <>
            <div onClick={onOpen} className="cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]">
                {children}
            </div>

            <Modal
                open={open}
                onCancel={onClose}
                footer={null}
                width={1200}
                centered
                destroyOnHidden
                closable={false}
                maskClosable={true}
                styles={{
                    body: { padding: 0, height: '85vh', overflow: 'hidden', borderRadius: 24 }
                }}
                className="premium-detail-modal"
            >
                {renderContent()}
            </Modal>

            <Modal
                title="文案脚本"
                centered
                open={scriptOpen}
                onCancel={() => setScriptOpen(false)}
                width={600}
                styles={{
                    body: { maxHeight: '60vh', overflowY: 'auto' }
                }}
                footer={[
                    <Button
                        key="copy"
                        icon={<CopyOutlined />}
                        onClick={() => {
                            if (data?.script) {
                                navigator.clipboard.writeText(data.script);
                                message.success('复制成功');
                            }
                        }}
                    >
                        复制
                    </Button>
                ]}
            >
                <div style={{ fontSize: 16, lineHeight: 1.8, whiteSpace: 'pre-wrap', color: '#374151', padding: '12px 0' }}>
                    {data?.script || '暂无脚本'}
                </div>
            </Modal>
        </>
    );
};

export default Detail;
