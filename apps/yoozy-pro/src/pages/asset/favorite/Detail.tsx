import React, { ReactNode, useEffect, useState } from "react";
import { useRequest } from "ahooks";
import { getAsset } from "@/api/asset.ts";
import { Drawer } from "antd";
import { PlayCircleOutlined, ClockCircleOutlined, CheckCircleFilled, CalendarOutlined, TagOutlined, DownOutlined } from "@ant-design/icons";
import { useMediaCacheFn } from "@/hooks/useMediaCache";

const PromptSection = ({ prompt }: { prompt: string }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
            <h3
                className="text-base font-bold text-white mb-2 flex items-center justify-between cursor-pointer hover:opacity-80 transition"
                onClick={() => setExpanded(!expanded)}
            >
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#7150ff] to-[#5a3bc4] rounded flex items-center justify-center">
                        <span className="text-white text-xs">✨</span>
                    </div>
                    AI 提示词
                </div>
                <DownOutlined className={`text-white/60 text-xs transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
            </h3>
            {expanded && (
                <div className="bg-black/30 rounded-lg p-3 animate-fade-in">
                    <p className="text-white/80 text-xs font-mono leading-relaxed whitespace-pre-wrap">{prompt}</p>
                </div>
            )}
        </div>
    )
}

const Detail = ({ id, children }: { id: string, children: ReactNode }) => {
    const [open, setOpen] = useState(false);
    const cached = useMediaCacheFn();

    const { data: d, run, loading } = useRequest(() => getAsset({
        id: id,
        returnFields:
            'url,coverUrl,commodity.title,commodity.brand,commodity.description,commodity.medias,segment.root,segment.timeStart,segment.timeEnd'
    }), { manual: true })
    const data = d?.data

    useEffect(() => {
        if (open) {
            run()
        }
    }, [open])

    const formatDuration = (s?: number) => {
        if (!s && s !== 0) return "00:00";
        const m = Math.floor(s / 60).toString().padStart(2, "0");
        const ss = Math.floor(s % 60).toString().padStart(2, "0");
        return `${m}:${ss}`;
    };

    const renderContent = () => {
        if (loading || !d) {
            return (
                <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#2a1b54] to-slate-900 flex items-center justify-center">
                    <div className="text-center space-y-4">
                        <div className="relative">
                            <div className="w-16 h-16 border-3 border-[#7150ff]/30 border-t-[#7150ff] rounded-full animate-spin mx-auto"></div>
                        </div>
                        <p className="text-white/60 text-base font-medium">加载中...</p>
                    </div>
                </div>
            )
        }

        const coverUrl = data?.url || data?.commodity?.medias?.[0]?.url || data?.commodity?.images?.[0]

        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#2a1b54] to-slate-900 relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#7150ff]/15 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#5a3bc4]/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 py-6 max-w-5xl">
                    <div className="grid lg:grid-cols-3 gap-6">

                        {/* Left: Video Preview - Compact */}
                        <div className="space-y-3">
                            <div className="relative max-w-[240px] mx-auto">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7150ff] to-[#5a3bc4] rounded-xl blur opacity-50"></div>
                                <div className="relative bg-black/40 backdrop-blur-xl rounded-xl overflow-hidden border border-white/10">
                                    {data?.url ? (
                                        <div className="relative" style={{ aspectRatio: '9/16' }}>
                                            <video
                                                src={cached(data.url)}
                                                poster={cached(data?.coverUrl || coverUrl)}
                                                controls
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ) : coverUrl ? (
                                        <div style={{ aspectRatio: '9/16' }}>
                                            <img src={cached(coverUrl)} alt="预览" className="w-full h-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className="aspect-[9/16] flex items-center justify-center bg-gray-800">
                                            <p className="text-gray-400 text-xs">暂无预览</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Status Cards */}
                            <div className="flex flex-col gap-2 max-w-[240px] mx-auto">
                                {data?.duration && (
                                    <div className="bg-white/5 backdrop-blur-xl rounded-lg p-2 border border-white/10">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 bg-gradient-to-br from-[#7150ff] to-[#5a3bc4] rounded flex-shrink-0 flex items-center justify-center">
                                                <ClockCircleOutlined className="text-white text-xs" />
                                            </div>
                                            <div>
                                                <p className="text-white/60 text-xs">时长</p>
                                                <p className="text-white font-bold text-sm">{formatDuration(data.duration)}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>

                        {/* Right: Details */}
                        <div className="lg:col-span-2 space-y-3">
                            {/* Title */}
                            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
                                {data?.commodity?.title && (
                                    <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#b190ff] mb-2">
                                        {data.commodity.title}
                                    </h1>
                                )}
                                {data?.commodity?.brand && (
                                    <div className="flex items-center gap-1.5 mb-3">
                                        <TagOutlined className="text-[#9170ff] text-xs" />
                                        <span className="text-[#b190ff] text-xs font-semibold">{data.commodity.brand}</span>
                                    </div>
                                )}
                                {data?.commodity?.description && (
                                    <p className="text-white/70 text-xs leading-relaxed">{data.commodity.description}</p>
                                )}
                            </div>

                            {/* Prompt */}
                            {/* {data?.prompt && <PromptSection prompt={data.prompt} />} */}

                            {/* Reference Video */}
                            {data?.segment?.root?.url && (
                                <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
                                    <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                                        <div className="w-6 h-6 bg-gradient-to-br from-[#7150ff] to-[#5a3bc4] rounded flex items-center justify-center">
                                            <PlayCircleOutlined className="text-white text-xs" />
                                        </div>
                                        参考视频
                                    </h3>
                                    <div className="bg-black/30 rounded-lg overflow-hidden max-w-[240px]">
                                        <video
                                            src={cached(data.segment.root.url)}
                                            poster={cached(data.segment.root.coverUrl)}
                                            controls
                                            className="w-full h-auto"
                                            onTimeUpdate={(e) => {
                                                const video = e.currentTarget;
                                                const start = data.segment.timeStart || 0;
                                                const end = data.segment.timeEnd || video.duration;

                                                if (video.currentTime < start) {
                                                    video.currentTime = start;
                                                }

                                                if (video.currentTime >= end) {
                                                    video.currentTime = start;
                                                    video.play();
                                                }
                                            }}
                                            onLoadedMetadata={(e) => {
                                                const video = e.currentTarget;
                                                if (data.segment.timeStart) {
                                                    video.currentTime = data.segment.timeStart;
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div onClick={() => setOpen(true)}>{children}</div>
            <Drawer
                title={null}
                width="100%"
                open={open}
                onClose={() => setOpen(false)}
                destroyOnClose
                closeIcon={
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-xl hover:bg-white/20 rounded-full flex items-center justify-center border border-white/20 transition">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                }
                styles={{
                    body: { padding: 0, overflow: 'auto', background: 'transparent' },
                    header: { position: 'absolute', top: 0, right: 0, zIndex: 1000, background: 'transparent', border: 'none', padding: '24px' }
                }}
            >
                {renderContent()}
            </Drawer>
        </>
    );
};

export default Detail;
