import React, { useState, useMemo, useCallback } from "react";
import { Modal, Tooltip, message, Button, Tag, Tabs, Slider, InputNumber } from "antd";
import { 
    DownloadOutlined, 
    PlayCircleFilled,
    ScissorOutlined,
    FieldTimeOutlined,
    EditOutlined,
    LoadingOutlined,
    CheckCircleOutlined,
    ReloadOutlined,
    SettingOutlined,
    PauseCircleFilled,
    FontSizeOutlined,
    PictureOutlined,
    CustomerServiceOutlined,
    CloseCircleFilled
} from "@ant-design/icons";
import { updateWorkflowJob } from "@/api/workflow";
import LazyVideo from "@/components/LazyVideo";
import Video from "@/components/Video";
import { FlowerSelector, FontSelector, ToneSelector } from "@/components/remix";
import RemixOptionsSelector from "./components/RemixOptionsSelector";

interface SegmentsRemixJobProps {
    job: any;
    data: any;
    asset: any;
    onRefresh: () => void;
    editable?: boolean;
}

const SegmentCard = React.memo(({ 
    item, 
    index, 
    editable, 
    isRemixing, 
    onPreview, 
    onDownload, 
    onOpenEditor 
}: { 
    item: any; 
    index: number; 
    editable?: boolean; 
    isRemixing: boolean; 
    onPreview: (url: string) => void;
    onDownload: (url: string, index: number) => void;
    onOpenEditor: (index: number) => void;
}) => {
    return (
        <div className="flex-shrink-0 snap-start flex flex-col gap-3 w-[180px]">
            {/* Header */}
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center">
                        <span className="text-primary text-[10px] font-bold">#{index + 1}</span>
                    </div>
                    <span className="text-[11px] font-bold text-gray-500">分段</span>
                </div>
            </div>

            {/* Video Card */}
            <div className="group relative aspect-[9/16] bg-gray-100 rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <LazyVideo
                    src={item.videoGeneration.url}
                    className="object-cover w-full h-full"
                    // @ts-ignore
                    poster={item.videoGeneration.lastFrame || item.videoGeneration.firstFrame}
                    timeStart={item.remixOptions?.crop?.[0] ?? item.remixOptions?.timeStart}
                    timeEnd={item.remixOptions?.crop?.[1] ?? item.remixOptions?.timeEnd}
                    playbackRate={item.remixOptions?.speed || 1}
                    playsInline loop muted
                    onMouseEnter={(e: any) => e.target.play()}
                    onMouseLeave={(e: any) => e.target.pause()}
                    showDownload={!!item.videoGeneration.url}
                    onDownload={() => onDownload(item.videoGeneration.url, index)}
                />
            </div>

            {/* Config Preview Tags */}
            <div 
                className={`flex flex-col gap-1.5 px-1 ${editable && !isRemixing ? 'cursor-pointer hover:bg-gray-50/50 rounded-lg p-1 -m-1 transition-colors' : ''}`}
                onClick={() => editable && !isRemixing && onOpenEditor(index)}
            >
                <div className="flex items-center gap-2 text-[10px] text-gray-400">
                    <ScissorOutlined className="text-primary/50" />
                    <span>
                        裁剪: {((item.remixOptions?.crop?.[0] ?? item.remixOptions?.timeStart) || 0).toFixed(1)}s - 
                        {((item.remixOptions?.crop?.[1] ?? item.remixOptions?.timeEnd) || item.videoGeneration?.duration || 5).toFixed(1)}s
                    </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-400">
                    <FieldTimeOutlined className="text-primary/50" />
                    <span>倍速: {item.remixOptions?.speed || 1}x</span>
                </div>
                {item.remixOptions?.flower && (
                    <div className="flex items-center gap-2 text-[10px] text-gray-400">
                        <PictureOutlined className="text-primary/50" />
                        <span className="truncate">花字: {item.remixOptions.flower.name || '已设置'}</span>
                    </div>
                )}
                {item.remixOptions?.font && (
                    <div className="flex items-center gap-2 text-[10px] text-gray-400">
                        <FontSizeOutlined className="text-primary/50" />
                        <span className="truncate">字体: {item.remixOptions.font.name || '已设置'}</span>
                    </div>
                )}
                {item.remixOptions?.tone && (
                    <div className="flex items-center gap-2 text-[10px] text-gray-400">
                        <CustomerServiceOutlined className="text-primary/50" />
                        <span className="truncate">配音: {item.remixOptions.tone.name || '已设置'}</span>
                    </div>
                )}
            </div>
        </div>
    );
});

const SegmentsRemixJob: React.FC<SegmentsRemixJobProps> = ({ job, data, asset, onRefresh, editable }) => {
    const [previewVideo, setPreviewVideo] = useState<string | null>(null);
    const [editingIdx, setEditingIdx] = useState<number | null>(null);
    const [showOptions, setShowOptions] = useState(false);
    const [saving, setSaving] = useState(false);
    const [showSegments, setShowSegments] = useState(false);

    // Local state for editing to ensure smooth UI
    const [localCrop, setLocalCrop] = useState<[number, number]>([0, 5]);
    const [localSpeed, setLocalSpeed] = useState<number>(1);
    const [localFlower, setLocalFlower] = useState<any>(null);
    const [localFont, setLocalFont] = useState<any>(null);
    const [localTone, setLocalTone] = useState<any>(null);
    const lastInitIdx = React.useRef<number | null>(null);
    const videoRef = React.useRef<HTMLVideoElement>(null);

    // Sync local state ONLY when a different segment is opened
    React.useEffect(() => {
        if (editingIdx !== null && editingIdx !== lastInitIdx.current && data?.segments?.[editingIdx]) {
            const segment = data.segments[editingIdx];
            const duration = Number(segment.videoGeneration?.duration) || 5;
            
            // Priority: crop array > individual timeStart/timeEnd > default [0, duration]
            const start = segment.remixOptions?.crop?.[0] ?? segment.remixOptions?.timeStart ?? 0;
            const end = segment.remixOptions?.crop?.[1] ?? segment.remixOptions?.timeEnd ?? duration;
            
            setLocalCrop([Number(start), Number(end)]);
            setLocalSpeed(Number(segment.remixOptions?.speed) || 1);
            setLocalFlower(segment.remixOptions?.flower || null);
            setLocalFont(segment.remixOptions?.font || null);
            setLocalTone(segment.remixOptions?.tone || null);
            lastInitIdx.current = editingIdx;
        } else if (editingIdx === null) {
            lastInitIdx.current = null;
        }
    }, [editingIdx, data?.segments]);

    // Video preview logic: seek to start when crop[0] changes
    React.useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = localCrop[0];
        }
    }, [localCrop[0]]);

    const isRemixing = data?.status === 'running' && job?.status !== 'completed';

    const handleSave = async () => {
        if (!asset || editingIdx === null || saving) return;
        
        setSaving(true);
        try {
            const currentSegments = JSON.parse(JSON.stringify(data.segments));
            const segment = currentSegments[editingIdx];
            if (!segment.remixOptions) segment.remixOptions = {};
            
            segment.remixOptions.crop = localCrop;
            segment.remixOptions.speed = localSpeed;
            segment.remixOptions.flower = localFlower;
            segment.remixOptions.font = localFont;
            segment.remixOptions.tone = localTone;
            // Also include timeStart and timeEnd just in case the backend uses these names
            segment.remixOptions.timeStart = localCrop[0];
            segment.remixOptions.timeEnd = localCrop[1];

            // Prepare the payload exactly as the backend expects
            const remixData = {
                ...data,
                segments: currentSegments,
                status: 'waiting' // Reset status to waiting to trigger re-generation
            };

            await updateWorkflowJob({
                id: asset.workflow?._id,
                index: job.index,
                dataKey: 'remix',
                data: {
                    remix: remixData
                },
            });
            
            message.success('保存成功');
            onRefresh();
            setEditingIdx(null);
        } catch (e) {
            console.error('Save failed:', e);
            message.error('保存失败');
        } finally {
            setSaving(false);
        }
    };

    const handleUpdateGlobalOptions = async (type: 'flower' | 'font' | 'tone', item: any) => {
        if (!asset || saving) return;
        try {
            const newData = { ...data, [type]: item };
            await updateWorkflowJob({
                id: asset.workflow?._id,
                index: job.index,
                dataKey: 'remix',
                data: {
                    remix: newData
                }
            });
            message.success('全局配置已更新');
            onRefresh();
        } catch (e) {
            message.error('更新失败');
        }
    };

    const handleDownload = useCallback(async (url: string, index: number) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = index === -1 ? `remix-master.mp4` : `remix-segment-${index + 1}.mp4`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
        } catch (e) {
            window.open(url, '_blank');
        }
    }, []);

    const handleOpenEditor = useCallback((index: number) => {
        setEditingIdx(index);
    }, []);

    const renderSegments = useMemo(() => {
        if (!data?.segments) return null;
        return data.segments.map((item: any, index: number) => (
            <SegmentCard
                key={index}
                item={item}
                index={index}
                editable={editable}
                isRemixing={isRemixing}
                onPreview={setPreviewVideo}
                onDownload={handleDownload}
                onOpenEditor={handleOpenEditor}
            />
        ));
    }, [data?.segments, editable, isRemixing, handleDownload, handleOpenEditor]);

    if (!data?.segments) return null;

    const handleStartGeneration = async () => {
        if (!asset || saving) return;
        setSaving(true);
        try {
            await updateWorkflowJob({
                id: asset.workflow?._id,
                index: job.index,
                dataKey: 'remix',
                data: {
                    remix: {
                        ...data,
                        status: 'running',
                        taskId: '',
                        url: '',
                        coverUrl: '',
                    },
                }
            });
            onRefresh();
            message.success('已开始生成视频');
        } catch (e) {
            console.error('Failed to start generation:', e);
            message.error('启动生成失败');
        } finally {
            setSaving(false);
        }
    };

    const hasResult = !!(data.url || data.coverUrl);
    const displayMode = (hasResult && !showSegments && !isRemixing) ? 'result' : 'edit';

    return (
        <div className="mt-4">
            {/* Final Video Result Panel */}
            {displayMode === 'result' ? (
                    <div className="flex flex-col lg:flex-row gap-10 items-stretch p-5">
                        {/* Video Player Section */}
                        <div className="w-full lg:w-[320px] shrink-0 group">
                            <div className="relative aspect-[9/16] bg-black rounded-[40px] overflow-hidden shadow-2xl ring-[6px] ring-white transition-all duration-700 group-hover:scale-[1.03] group-hover:shadow-primary/10">
                                {data.url ? (
                                    <LazyVideo
                                        src={data.url}
                                        className="object-cover w-full h-full"
                                        // @ts-ignore
                                        poster={data.coverUrl}
                                        controls
                                        playsInline
                                        showDownload={!!data.url}
                                        onDownload={() => handleDownload(data.url, -1)}
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gray-900">
                                        <img src={data.coverUrl} className="absolute inset-0 w-full h-full object-cover opacity-30 blur-md" alt="" />
                                        <div className="relative z-10 p-6 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
                                            <LoadingOutlined className="text-white/60 text-4xl animate-spin" />
                                        </div>
                                        <span className="text-white/60 text-sm font-bold tracking-widest uppercase relative z-10">正在合成预览...</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Info & Actions Section */}
                        <div className="flex-1 flex flex-col justify-between py-4">
                            <div>
                                <div className="flex items-center gap-4 mb-8">
                                    <Tag 
                                        color="success"
                                        icon={<CheckCircleOutlined />}
                                        className="rounded-full px-4 py-1 border-none font-bold text-[10px] uppercase tracking-wider m-0 shadow-sm"
                                    >
                                        合成完成
                                    </Tag>
                                </div>
                                
                                <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">混剪成片预览</h2>
                                <p className="text-base text-gray-500 leading-relaxed max-w-[480px] font-medium">
                                    这是根据当前配置合成的最终视频。如果您想调整分段参数或重新配置，请点击下方“调整分段参数”。
                                </p>
                            </div>

                            <div className="mt-10 flex flex-wrap items-center gap-6">
                                {editable && (
                                    <Button 
                                        icon={<SettingOutlined />} 
                                        onClick={() => setShowSegments(true)}
                                        className="h-16 px-10 rounded-3xl font-black text-sm uppercase tracking-[0.2em] border-2 border-gray-100 hover:border-primary hover:text-primary transition-all bg-white shadow-lg shadow-gray-100"
                                    >
                                        调整分段参数
                                    </Button>
                                )}
                                {data.url && (
                                    <Button 
                                        type="primary" 
                                        icon={<DownloadOutlined />} 
                                        onClick={() => handleDownload(data.url, -1)}
                                        className="h-16 px-10 rounded-3xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all"
                                    >
                                        下载高清成片
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
            ) : (
                /* Operation Panel (Status Bar + Segments) */
                <>
                    {/* Status Bar */}
                    <div className="flex items-center justify-between mb-8 px-2">
                        <div className="flex items-center gap-6">
                            {data.status && (
                                <Tag 
                                    color={isRemixing ? 'processing' : 'success'} 
                                    icon={isRemixing ? <LoadingOutlined spin /> : <CheckCircleOutlined />}
                                    className="rounded-full px-4 py-1 border-none font-bold text-[10px] uppercase tracking-wider m-0 shadow-sm"
                                >
                                    {data.status === 'waiting' ? '等待队列' : 
                                     data.status === 'running' ? '正在合成' : 
                                     data.status === 'completed' ? '合成完成' : data.status}
                                </Tag>
                            )}
                            
                            <div className="flex items-center gap-4 border-l border-gray-100 ml-2 pl-6">
                                {isRemixing && (
                                    <span className="text-[10px] text-primary font-black animate-pulse tracking-widest uppercase">
                                        正在合成最终成片...
                                    </span>
                                )}
                                
                                {editable && !isRemixing && (
                                    <Button 
                                        size="small" 
                                        type="link" 
                                        icon={<ReloadOutlined />} 
                                        onClick={handleStartGeneration}
                                        loading={saving}
                                        className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-primary p-0 h-auto flex items-center"
                                    >
                                        {hasResult ? '重新合成视频' : '开始合成视频'}
                                    </Button>
                                )}

                                {hasResult && (
                                    <Button 
                                        size="small" 
                                        type="link" 
                                        icon={<PlayCircleFilled />} 
                                        onClick={() => setShowSegments(false)}
                                        className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-primary p-0 h-auto flex items-center"
                                    >
                                        返回查看成片
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex overflow-x-auto pb-4 gap-6 scrollbar-hide snap-x snap-mandatory">
                        {renderSegments}
                    </div>
                </>
            )}

            <Modal
                title={<div className="font-bold text-gray-800">调整分段 #{editingIdx !== null ? editingIdx + 1 : ''}</div>}
                open={editingIdx !== null}
                onCancel={() => setEditingIdx(null)}
                width={1000}
                centered
                footer={null}
                bodyStyle={{ padding: '24px' }}
            >
                {editingIdx !== null && (
                    <div className="flex flex-col lg:flex-row gap-8 h-[650px] overflow-hidden">
                        {/* Left Side: Video Preview */}
                        <div className="w-full lg:w-[320px] flex flex-col gap-4 shrink-0 h-full">
                            <div className="flex-1 bg-black rounded-[32px] overflow-hidden shadow-2xl ring-8 ring-gray-50 relative">
                                <Video
                                    ref={videoRef}
                                    src={data.segments[editingIdx].videoGeneration?.url}
                                    className="w-full h-full object-cover"
                                    timeStart={localCrop[0]}
                                    timeEnd={localCrop[1]}
                                    playbackRate={localSpeed}
                                    controls
                                    playsInline
                                    muted
                                    autoPlay
                                    loop
                                />
                            </div>
                        </div>

                        {/* Right Side: Summary & Tabs & Actions */}
                        <div className="flex-1 min-w-0 flex flex-col h-full">
                            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                                {/* Config Summary Card */}
                                <div className="bg-white border border-gray-100 rounded-[24px] p-4 shadow-sm mb-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-4 bg-primary rounded-full"></div>
                                            <span className="text-[11px] font-black text-gray-800 uppercase tracking-widest">配置摘要</span>
                                        </div>
                                        <Tag color="blue" className="m-0 border-none rounded-full text-[10px] font-black px-3">
                                            分段 #{editingIdx + 1}
                                        </Tag>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        {/* Core Params */}
                                        <div className="bg-gray-50/80 rounded-2xl p-3 border border-gray-100/50">
                                            <div className="flex items-center gap-2 mb-2 text-[9px] text-gray-400 font-bold uppercase">
                                                <ScissorOutlined className="text-primary/60" /> 裁剪范围
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-[11px] font-bold text-gray-700">{(localCrop[0] || 0).toFixed(1)}s - {(localCrop[1] || 0).toFixed(1)}s</span>
                                                <Button 
                                                    size="small" 
                                                    type="link" 
                                                    className="text-[10px] p-0 h-auto font-bold"
                                                    onClick={() => {
                                                        if (videoRef.current) {
                                                            videoRef.current.currentTime = localCrop[0] || 0;
                                                            videoRef.current.play();
                                                        }
                                                    }}
                                                >
                                                    预览
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50/80 rounded-2xl p-3 border border-gray-100/50">
                                            <div className="flex items-center gap-2 mb-2 text-[9px] text-gray-400 font-bold uppercase">
                                                <FieldTimeOutlined className="text-primary/60" /> 播放倍速
                                            </div>
                                            <span className="text-[11px] font-bold text-gray-700">{localSpeed}x</span>
                                        </div>
                                    </div>

                                    {/* Style Params */}
                                    {(localFlower || localFont || localTone) && (
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {localFlower && (
                                                <div className="bg-orange-50/50 border border-orange-100/50 rounded-xl px-2.5 py-1.5 flex items-center gap-2 group/item relative pr-6">
                                                    <PictureOutlined className="text-orange-400 text-[10px]" />
                                                    <span className="text-[10px] font-bold text-orange-700 truncate max-w-[80px]">{localFlower.name}</span>
                                                    <CloseCircleFilled 
                                                        className="absolute right-1.5 text-orange-200 hover:text-orange-400 cursor-pointer transition-colors text-[12px]" 
                                                        onClick={() => setLocalFlower(null)}
                                                    />
                                                </div>
                                            )}
                                            {localFont && (
                                                <div className="bg-blue-50/50 border border-blue-100/50 rounded-xl px-2.5 py-1.5 flex items-center gap-2 group/item relative pr-6">
                                                    <FontSizeOutlined className="text-blue-400 text-[10px]" />
                                                    <span className="text-[10px] font-bold text-blue-700 truncate max-w-[80px]">{localFont.name}</span>
                                                    <CloseCircleFilled 
                                                        className="absolute right-1.5 text-blue-200 hover:text-blue-400 cursor-pointer transition-colors text-[12px]" 
                                                        onClick={() => setLocalFont(null)}
                                                    />
                                                </div>
                                            )}
                                            {localTone && (
                                                <div className="bg-purple-50/50 border border-purple-100/50 rounded-xl px-2.5 py-1.5 flex items-center gap-2 group/item relative pr-6">
                                                    <CustomerServiceOutlined className="text-purple-400 text-[10px]" />
                                                    <span className="text-[10px] font-bold text-purple-700 truncate max-w-[80px]">{localTone.name}</span>
                                                    <CloseCircleFilled 
                                                        className="absolute right-1.5 text-purple-200 hover:text-purple-400 cursor-pointer transition-colors text-[12px]" 
                                                        onClick={() => setLocalTone(null)}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="bg-gray-50/50 rounded-3xl border border-gray-100 p-2">
                                    <Tabs 
                                        defaultActiveKey="crop"
                                        size="small"
                                        className="remix-editor-tabs"
                                        items={[
                                            { 
                                                key: 'crop', 
                                                label: '时长裁剪', 
                                                children: (
                                                    <div className="p-6">
                                                        <div className="flex items-center justify-between mb-4">
                                                            <span className="text-xs font-bold text-gray-500">时长裁剪 (秒)</span>
                                                            <div className="flex items-center gap-2">
                                                                <InputNumber
                                                                    size="small"
                                                                    min={0}
                                                                    max={localCrop[1]}
                                                                    step={0.1}
                                                                    value={localCrop[0]}
                                                                    onChange={(val) => val !== null && setLocalCrop([Number(val), localCrop[1]])}
                                                                    className="w-20"
                                                                />
                                                                <span className="text-gray-300">-</span>
                                                                <InputNumber
                                                                    size="small"
                                                                    min={localCrop[0]}
                                                                    max={data.segments[editingIdx].videoGeneration?.duration || 5}
                                                                    step={0.1}
                                                                    value={localCrop[1]}
                                                                    onChange={(val) => val !== null && setLocalCrop([localCrop[0], Number(val)])}
                                                                    className="w-20"
                                                                />
                                                            </div>
                                                        </div>
                                                        <Slider
                                                            range
                                                            min={0}
                                                            max={data.segments[editingIdx].videoGeneration?.duration || 5}
                                                            step={0.1}
                                                            value={[localCrop[0], localCrop[1]]}
                                                            onChange={(val) => setLocalCrop([Number(val[0]), Number(val[1])])}
                                                        />
                                                        <div className="mt-8 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                                                            <div className="text-[10px] text-amber-600 font-bold uppercase mb-1">温馨提示</div>
                                                            <div className="text-[10px] text-amber-500 leading-relaxed">
                                                                裁剪后的片段将作为混剪成片的一部分，请确保裁剪范围在视频有效时长内。
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            },
                                            { 
                                                key: 'speed', 
                                                label: '播放倍速', 
                                                children: (
                                                    <div className="p-6">
                                                        <div className="flex items-center justify-between mb-4">
                                                            <span className="text-xs font-bold text-gray-500">倍速调整</span>
                                                            <InputNumber
                                                                min={0.1}
                                                                max={40}
                                                                step={0.1}
                                                                value={localSpeed}
                                                                onChange={(val) => val !== null && setLocalSpeed(val)}
                                                                className="!rounded-lg w-24"
                                                                addonAfter="x"
                                                            />
                                                        </div>
                                                        <Slider
                                                            min={0.1}
                                                            max={40}
                                                            step={0.1}
                                                            value={localSpeed}
                                                            onChange={(val) => setLocalSpeed(Number(val))}
                                                            className="mb-8"
                                                            marks={{ 1: '1x', 10: '10x', 20: '20x', 40: '40x' }}
                                                        />
                                                        <div className="grid grid-cols-4 gap-4 mt-10">
                                                            {[0.5, 1, 1.5, 2].map(s => (
                                                                <div 
                                                                    key={s}
                                                                    onClick={() => setLocalSpeed(s)}
                                                                    className={`py-3 text-center rounded-xl border cursor-pointer transition-all font-bold text-xs ${
                                                                        localSpeed === s
                                                                        ? 'bg-primary border-primary text-white shadow-lg'
                                                                        : 'bg-white border-gray-100 text-gray-500 hover:border-primary/30'
                                                                    }`}
                                                                >
                                                                    {s}x
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )
                                            },
                                            {
                                                key: 'flower',
                                                label: '花字模板',
                                                children: (
                                                    <div className="p-4 h-[350px] overflow-y-auto custom-scrollbar">
                                                        <div className="flex justify-between items-center mb-4 px-2">
                                                            <span className="text-[10px] text-gray-400 font-bold uppercase">选择花字样式</span>
                                                            {localFlower && (
                                                                <Button size="small" type="link" onClick={() => setLocalFlower(null)} className="text-[10px] p-0 h-auto">清除选择</Button>
                                                            )}
                                                        </div>
                                                        <FlowerSelector value={localFlower} onChange={(item) => setLocalFlower(item)} />
                                                    </div>
                                                )
                                            },
                                            {
                                                key: 'font',
                                                label: '字体选择',
                                                children: (
                                                    <div className="p-4 h-[350px] overflow-y-auto custom-scrollbar">
                                                        <div className="flex justify-between items-center mb-4 px-2">
                                                            <span className="text-[10px] text-gray-400 font-bold uppercase">选择文字字体</span>
                                                            {localFont && (
                                                                <Button size="small" type="link" onClick={() => setLocalFont(null)} className="text-[10px] p-0 h-auto">清除选择</Button>
                                                            )}
                                                        </div>
                                                        <FontSelector value={localFont} onChange={(item) => setLocalFont(item)} />
                                                    </div>
                                                )
                                            },
                                            {
                                                key: 'tone',
                                                label: '配音音色',
                                                children: (
                                                    <div className="p-4 h-[350px] overflow-y-auto custom-scrollbar">
                                                        <div className="flex justify-between items-center mb-4 px-2">
                                                            <span className="text-[10px] text-gray-400 font-bold uppercase">选择配音音色</span>
                                                            {localTone && (
                                                                <Button size="small" type="link" onClick={() => setLocalTone(null)} className="text-[10px] p-0 h-auto">清除选择</Button>
                                                            )}
                                                        </div>
                                                        <ToneSelector value={localTone} onChange={(item) => setLocalTone(item)} />
                                                    </div>
                                                )
                                            }
                                        ]}
                                    />
                                </div>
                            </div>

                            {/* Bottom Action - Sticky */}
                            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end shrink-0 bg-white">
                                <Button 
                                    type="primary" 
                                    onClick={handleSave} 
                                    loading={saving}
                                    className="h-12 px-12 rounded-2xl font-bold shadow-lg shadow-primary/20"
                                >
                                    确认并保存配置
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Video Preview Modal */}
            <Modal
                open={!!previewVideo}
                onCancel={() => setPreviewVideo(null)}
                footer={null}
                closable={false}
                centered
                width={400}
                bodyStyle={{ padding: 0 }}
                className="video-preview-modal"
                closeIcon={<div className="w-8 h-8 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-all mt-[-20px] mr-[-20px]">×</div>}
            >
                {previewVideo && (
                    <div className="relative aspect-[9/16] bg-black rounded-2xl overflow-hidden">
                        <video
                            src={previewVideo}
                            className="w-full h-full"
                            controls
                            autoPlay
                            playsInline
                        />
                    </div>
                )}
            </Modal>

            <RemixOptionsSelector 
                open={showOptions}
                onClose={() => setShowOptions(false)}
                onSelect={handleUpdateGlobalOptions}
                currentValues={{
                    flower: data.flower,
                    font: data.font,
                    tone: data.tone
                }}
                videoUrl={data.url}
                coverUrl={data.coverUrl}
            />

            <style>{`
                .video-preview-modal .ant-modal-content {
                    background: transparent;
                    box-shadow: none;
                }
                .video-preview-modal .ant-modal-close {
                    color: white;
                }
                .remix-editor-tabs .ant-tabs-nav {
                    position: sticky;
                    top: 0;
                    z-index: 20;
                    background: #f9fafb; /* gray-50 */
                    margin-bottom: 0 !important;
                    padding: 0 16px;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e5e7eb;
                    border-radius: 10px;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default React.memo(SegmentsRemixJob);
