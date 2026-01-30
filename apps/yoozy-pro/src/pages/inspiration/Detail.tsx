import { ReactNode, useEffect, useState } from "react";
import { Button, Drawer, Tag, Tooltip, Typography, Skeleton, Divider, Modal } from "antd";
import {
    CloseOutlined,
    LoadingOutlined,
    PictureOutlined,
    PlayCircleOutlined,
    StarFilled,
    StarOutlined
} from "@ant-design/icons";
import { useRouter } from "@/hooks/useRouter.tsx";
import VideoSegment from "@/components/VideoSegment";
import { useRequest } from "ahooks";
import { getResourceSegment } from "@/api/resource.ts";
import AssetCreator from "@/pages/asset/create/Creator.tsx";
import Image from "@/components/Image";
import { formatDuration } from "@/utils";

const Detail = ({ id, children }: { id: string, children: ReactNode }) => {

    const [open, setOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [fav, setFav] = useState(false);

    const router = useRouter()

    const { data: d, run, loading } = useRequest(() => {
        return getResourceSegment({ id: id })
    }, { manual: true })

    const data = d?.data

    useEffect(() => {
        if (open) {
            run()
        }
    }, [open])

    // Reset video when opening
    const onOpen = () => {
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
        setIsCreating(false);
    }

    const category = data?.style;


    const renderContent = () => {
        if (loading || !d) {
            return <>
                {/*/!* Left Panel Skeleton *!/*/}
                <div
                    className="w-[400px] xl:w-[480px] flex-shrink-0 bg-gray-100 h-full flex items-center justify-center">
                    <Skeleton.Button active block style={{ width: '100%', height: '100%' }} />
                </div>

                {/* Right Panel Skeleton */}
                <div className="flex-1 bg-white h-full relative overflow-hidden">
                    {/* Header Skeleton */}
                    <div
                        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 py-5 border-b border-gray-100">
                        {/*<Skeleton.Button active size="small" style={{ width: 120, height: 24, borderRadius: 4 }} />*/}
                        {/*<Skeleton.Button active size="small" shape="circle" style={{ width: 40, height: 40 }} />*/}
                    </div>

                    <div className="h-full pt-[80px] p-8 xl:p-12">
                        <div className="max-w-3xl mx-auto flex flex-col gap-8">
                            {/* Title & Tags Skeleton */}
                            <div className="space-y-4">
                                <Skeleton.Button active block
                                    style={{ height: 40, width: '60%', borderRadius: 8 }} />
                                <div className="flex gap-3">
                                    <Skeleton.Button active
                                        style={{ width: 80, height: 28, borderRadius: 100 }} />
                                    <Skeleton.Button active
                                        style={{ width: 80, height: 28, borderRadius: 100 }} />
                                    <Skeleton.Button active
                                        style={{ width: 80, height: 28, borderRadius: 100 }} />
                                </div>
                            </div>

                            {/* Description Card Skeleton */}
                            <Skeleton.Button active block style={{ height: 160, borderRadius: 24 }} />

                            {/* Highlight Frames Skeleton */}
                            <Skeleton.Button active block style={{ height: 200, borderRadius: 24 }} />
                        </div>
                    </div>
                </div>
            </>;
        }

        if (isCreating) {
            return <AssetCreator segment={data} onSuccess={() => setOpen(false)} />
        }

        return <>
            {/* Left Panel: Video Preview */}
            <VideoSegment
                url={data?.root?.url}
                coverUrl={data?.root?.coverUrl}
                startTime={data?.timeStart}
                endTime={data?.timeEnd}
            />

            {/* Right Panel: Detail Info */}
            <div className="flex-1 bg-white overflow-hidden relative">
                {/* Header */}
                <div
                    className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 py-5 bg-white/80 backdrop-blur-md border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <Typography.Title level={4} style={{ margin: 0 }}
                            className="!font-bold text-gray-800">
                            灵感详情
                        </Typography.Title>
                    </div>
                    <Button
                        type="text"
                        icon={<CloseOutlined className="text-lg text-gray-500" />}
                        onClick={onClose}
                        className="hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
                    />
                </div>

                {/* Content */}
                <div className="h-full pt-[80px]">
                    <div className="h-full flex flex-col relative">
                        <div
                            className="flex-1 overflow-y-auto custom-scrollbar p-8 xl:p-12 animate-fade-in pb-32">
                            <div className="max-w-3xl mx-auto">
                                <div className="flex flex-col gap-4">
                                    {/* Title & Tags */}
                                    <div>
                                        <Typography.Title level={3}
                                            className="!mb-4 !text-gray-900 !font-bold leading-tight">
                                            {data?.description}
                                        </Typography.Title>

                                        <div className="flex flex-wrap gap-3 mb-6">
                                            {data?.tags?.map((tag: string, index: number) => (
                                                <Tag key={index}
                                                    className="px-3 py-1 rounded-full bg-[#7150ff]/10 text-[#7150ff] border-[#7150ff]/20 text-sm font-medium m-0">
                                                    #{tag}
                                                </Tag>
                                            ))}
                                            <Tag icon={<PictureOutlined />}
                                                className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 border-gray-200 text-sm font-medium m-0">
                                                {category}
                                            </Tag>
                                        </div>

                                    </div>

                                    {/* Description */}
                                    {/* {(data?.root?.commodity?.name || data?.description) && (
                                        <div
                                            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                <span className="w-1 h-6 bg-[#7150ff] rounded-full" />
                                                内容详情
                                            </h3>
                                            <div className="text-gray-600 leading-relaxed text-base">
                                                {data?.root?.commodity?.name || data?.description}
                                            </div>
                                        </div>
                                    )} */}

                                    {/* Highlight Frames */}
                                    {Array.isArray(data?.highlightFrames) && data.highlightFrames.length > 0 && (
                                        <div
                                            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
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

                                    {/* 高光帧（可选） */}
                                    {/* 视频片段分析 */}
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
                        </div>

                        {/* Fixed Bottom Action Bar */}
                        <div
                            className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md p-6 border-t border-gray-100 flex items-center gap-4 z-10">
                            <Button
                                size="large"
                                className={`!rounded-xl !h-12 !px-6 !font-medium transition-all duration-300 ${fav ? '!bg-yellow-50 !text-yellow-600 !border-yellow-200' : 'hover:!bg-gray-50'}`}
                                icon={fav ? <StarFilled /> : <StarOutlined />}
                                onClick={() => setFav(v => !v)}
                            >
                                {fav ? '已收藏' : '收藏'}
                            </Button>

                            <Button
                                type="primary"
                                size="large"
                                icon={<PlayCircleOutlined />}
                                onClick={() => {
                                    setIsCreating(true);
                                }}
                                className="flex-1 !h-12 !rounded-xl !text-base !font-bold !bg-gradient-to-r from-[#7150ff] to-[#5a3bc4] hover:!from-[#7150ff]/90 hover:!to-[#5a3bc4]/90 border-none shadow-lg shadow-[#7150ff]/20 hover:shadow-[#7150ff]/30 transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                生成同款风格视频
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }

    return (
        <>
            <div onClick={onOpen}>{children}</div>
            <Modal
                width={'80%'}
                // placement="right"
                footer={null}
                centered

                open={open}
                closable={false}
                onCancel={onClose}
                destroyOnHidden
                styles={{
                    body: { padding: 0, overflow: 'hidden' },
                    mask: { backgroundColor: 'rgba(0, 0, 0, 0.2)', backdropFilter: 'blur(4px)' }
                }}
                className="premium-drawer"
            >
                <div className="h-full w-full flex bg-gray-50">
                    {renderContent()}
                </div>
            </Modal>
        </>
    );
};

export default Detail;
