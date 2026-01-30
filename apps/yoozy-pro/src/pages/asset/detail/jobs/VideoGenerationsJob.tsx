import React, { useState, useCallback, useMemo } from "react";
import { Spin, Modal, Button, Tooltip, message } from "antd";
import { 
    LoadingOutlined, 
    EditOutlined, 
    PlayCircleFilled,
    DownloadOutlined,
    PlusOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined
} from "@ant-design/icons";
import VideoGenerationEditorModal from "./components/VideoGenerationEditorModal";
import LazyVideo from "@/components/LazyVideo";

import { updateWorkflowJob } from "@/api/workflow";
import { videoGenerationCategoryConfig } from "@/consts";

interface VideoGenerationsJobProps {
    job: any;
    data: any[];
    asset: any;
    onRefresh: () => void;
    editable?: boolean;
}

// 子组件：悬浮操作遮罩
const HoverMask = ({ 
    item, 
    index, 
    editable, 
    onEdit, 
    isFailed 
}: { 
    item: any; 
    index: number; 
    editable?: boolean; 
    onEdit: (index: number) => void;
    isFailed?: boolean;
}) => (
    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 z-20">
        {editable && (
            <div
                onClick={() => onEdit(index)}
                className={`flex items-center gap-1.5 px-3 py-1 ${isFailed ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/80'} rounded-full text-white text-[10px] font-bold transition-colors cursor-pointer`}
            >
                <EditOutlined /> {isFailed ? '修改提示词重试' : '编辑提示词'}
            </div>
        )}
    </div>
);

// 视图 1：成功状态
const SuccessView = ({ item, index, editable, onDownload, onEdit }: any) => (
    <div className="group relative aspect-[9/16] bg-gray-100 rounded-xl overflow-hidden border border-gray-100">
        <LazyVideo
            src={item.url}
            className="object-cover w-full h-full"
            // @ts-ignore
            poster={item.lastFrame || item.coverUrl}
            timeStart={item.timeStart}
            timeEnd={item.timeEnd}
            playsInline
            loop
            muted
            onMouseEnter={(e: any) => e.target.play()}
            onMouseLeave={(e: any) => e.target.pause()}
            showDownload={!!item.url}
            onDownload={() => onDownload(item.url, index)}
        />
        <HoverMask item={item} index={index} editable={editable} onEdit={onEdit} />
    </div>
);

// 视图 2：生成中状态
const RunningView = ({ item, index, editable, onEdit }: any) => (
    <div className="group relative aspect-[9/16] bg-gray-100 rounded-xl overflow-hidden border border-gray-100">
        <div className="w-full h-full relative">
            {(item.lastFrame || item.coverUrl) && (
                <img 
                    src={item.lastFrame || item.coverUrl} 
                    className="w-full h-full object-cover opacity-40 blur-[1px]" 
                    alt="" 
                />
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/5 backdrop-blur-[2px] z-10">
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} className="text-primary" spin />} />
                <span className="text-[10px] text-gray-500 mt-2 font-bold tracking-widest uppercase">生成中</span>
            </div>
        </div>
        <HoverMask item={item} index={index} editable={editable} onEdit={onEdit} />
    </div>
);

// 视图 3：失败状态
const FailedView = ({ item, index, editable, onEdit }: any) => (
    <div className="group relative aspect-[9/16] bg-red-50/50 rounded-xl overflow-hidden border border-red-100">
        <div className="w-full h-full relative">
            {(item.lastFrame || item.coverUrl) && (
                <img 
                    src={item.lastFrame || item.coverUrl} 
                    className="w-full h-full object-cover opacity-20 grayscale"
                    alt="" 
                />
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50/10 backdrop-blur-[2px] z-10">
                <ExclamationCircleOutlined className="text-red-500 text-2xl mb-2" />
                <span className="text-[10px] text-red-500 font-bold tracking-tight px-4 text-center">生成失败</span>
                <span className="text-[9px] text-red-400 mt-1 px-4 text-center">请修改提示词重试</span>
            </div>
        </div>
        <HoverMask item={item} index={index} editable={editable} onEdit={onEdit} isFailed />
    </div>
);

const VideoCard = React.memo(({ 
    item, 
    index, 
    editable, 
    onPreview, 
    onDownload, 
    onEdit,
    onDelete
}: { 
    item: any; 
    index: number; 
    editable?: boolean; 
    onPreview: (url: string) => void;
    onDownload: (url: string, index: number) => void;
    onEdit: (index: number) => void;
    onDelete?: (index: number) => void;
}) => {
    const isFailed = item.status?.toLowerCase() === 'failed';
    const isRunning = item.status?.toLowerCase() === 'running' || (!item.url && !isFailed);
    const isSuccess = item.url && !isFailed && !isRunning;

    return (
        <div 
            className={`flex-shrink-0 snap-start flex flex-col bg-white rounded-[24px] border ${isFailed ? 'border-red-100' : 'border-gray-100'} shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all duration-500 overflow-hidden w-[220px]`}
        >
            {/* Header */}
            <div className={`px-4 py-2.5 border-b ${isFailed ? 'border-red-50/50 bg-red-50/30' : 'border-gray-100 bg-gray-50/50'}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-lg ${isFailed ? 'bg-red-100' : 'bg-primary/10'} flex items-center justify-center`}>
                            <span className={`${isFailed ? 'text-red-500' : 'text-primary'} text-[10px] font-black`}>#{index + 1}</span>
                        </div>
                        <span className={`text-xs font-bold ${isFailed ? 'text-red-600' : 'text-gray-600'}`}>
                            {(videoGenerationCategoryConfig as any)[item.category || 'videoGeneration']?.name}
                        </span>
                    </div>
                    {item.category && editable && (
                        <Tooltip title="删除片段">
                            <DeleteOutlined 
                                className={`hover:text-red-500 cursor-pointer transition-colors text-xs ${isFailed ? 'text-red-300' : 'text-gray-400'}`}
                                onClick={() => onDelete?.(index)}
                            />
                        </Tooltip>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col gap-3">
                {isFailed && <FailedView item={item} index={index} editable={editable} onEdit={onEdit} />}
                {isRunning && <RunningView item={item} index={index} editable={editable} onEdit={onEdit} />}
                {isSuccess && <SuccessView item={item} index={index} editable={editable} onDownload={onDownload} onEdit={onEdit} />}
            </div>
        </div>
    );
});

const VideoGenerationsJob: React.FC<VideoGenerationsJobProps> = ({ job, data, asset, onRefresh, editable }) => {
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    const [previewVideo, setPreviewVideo] = useState<string | null>(null);

    const handleDownload = useCallback(async (url: string, index: number) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `video-generation-${index + 1}.mp4`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Download failed:', error);
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.download = `video-generation-${index + 1}.mp4`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }, []);

    const handleEdit = useCallback((index: number) => {
        setSelectedIdx(index);
    }, []);

    const handleDelete = useCallback((index: number) => {
        Modal.confirm({
            title: '删除片段',
            icon: <DeleteOutlined className="text-red-500" />,
            content: `确定要删除第 #${index + 1} 个片段吗？`,
            okText: '确定',
            okButtonProps: { danger: true },
            cancelText: '取消',
            centered: true,
            onOk: async () => {
                try {
                    const newGenerations = [...data];
                    newGenerations.splice(index, 1);

                    await updateWorkflowJob({
                        id: asset.workflow?._id,
                        index: job.index,
                        dataKey: 'videoGenerations',
                        data: {
                            videoGenerations: newGenerations
                        },
                    });
                    message.success('片段已删除');
                    onRefresh();
                } catch (e) {
                    message.error('删除失败，请重试');
                }
            }
        });
    }, [asset?.workflow?._id, job.index, onRefresh, data]);

    const handleAddTransition = useCallback((index: number) => {
        Modal.confirm({
            title: '添加过度帧',
            icon: <PlusOutlined className="text-primary" />,
            content: `确定要在视频 #${index + 1} 和 #${index + 2} 之间添加过度帧吗？`,
            okText: '确定',
            cancelText: '取消',
            centered: true,
            onOk: async () => {
                try {
                    const newGenerations = [...data];
                    const transitionItem = {
                        status: "running",
                        firstFrame: data[index]?.lastFrame || data[index]?.coverUrl,
                        lastFrame: data[index + 1]?.firstFrame || data[index + 1]?.coverUrl,
                        tmpPrompt: "请帮我生成一段你最推荐的即梦转场提示词适配这新的两张图(需要给出1个方案即可)",
                        aspectRatio: data[index]?.aspectRatio || "9:16",
                        category: "transition",
                        duration: 4,
                    };
                    
                    newGenerations.splice(index + 1, 0, transitionItem);

                    await updateWorkflowJob({
                        id: asset.workflow?._id,
                        index: job.index,
                        dataKey: 'videoGenerations',
                        data: {
                            videoGenerations: newGenerations
                        },
                    });
                    message.success('已请求添加过度帧');
                    onRefresh();
                } catch (e) {
                    message.error('操作失败，请重试');
                }
            }
        });
    }, [asset?.workflow?._id, job.index, onRefresh, data]);

    const videoCards = useMemo(() => {
        if (!data) return null;
        const cards: React.ReactNode[] = [];
        data.forEach((item: any, index: number) => {
            cards.push(
                <VideoCard
                    key={`card-${index}`}
                    item={item}
                    index={index}
                    editable={editable}
                    onPreview={setPreviewVideo}
                    onDownload={handleDownload}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            );
            
            if (index < data.length - 1 && editable) {
                cards.push(
                    <div key={`transition-${index}`} className="flex items-center">
                        <Tooltip title="添加过度帧">
                            <div 
                                onClick={() => handleAddTransition(index)}
                                className="w-8 h-8 rounded-full border border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all cursor-pointer shadow-sm bg-white"
                            >
                                <PlusOutlined className="text-xs" />
                            </div>
                        </Tooltip>
                    </div>
                );
            }
        });
        return cards;
    }, [data, editable, handleDownload, handleEdit, handleAddTransition]);

    if (!data) return null;

    return (
        <div className="mt-4 flex overflow-x-auto gap-6 pb-6 scrollbar-hide snap-x snap-mandatory px-1">
            {videoCards}

            <VideoGenerationEditorModal
                job={job}
                open={selectedIdx !== null}
                onClose={() => setSelectedIdx(null)}
                video={selectedIdx !== null ? data[selectedIdx] : null}
                index={selectedIdx}
                asset={asset}
                onRefresh={() => {
                    onRefresh();
                    setSelectedIdx(null);
                }}
            />

            {/* Video Preview Modal */}
            <Modal
                open={!!previewVideo}
                onCancel={() => setPreviewVideo(null)}
                footer={null}
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

            <style>{`
                .video-preview-modal .ant-modal-content {
                    background: transparent;
                    box-shadow: none;
                }
                .video-preview-modal .ant-modal-close {
                    color: white;
                }
            `}</style>
        </div>
    );
};

export default React.memo(VideoGenerationsJob);
