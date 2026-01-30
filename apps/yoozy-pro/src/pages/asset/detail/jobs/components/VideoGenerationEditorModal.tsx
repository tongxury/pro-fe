import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Modal, Button, Input, message, InputNumber } from "antd";
import {
    EditOutlined,
    InfoCircleOutlined,
    ReloadOutlined,
    CheckCircleFilled
} from "@ant-design/icons";
import ImageComponent from "@/components/Image";
import { updateWorkflowJob } from "@/api/workflow";
import { aspectRatioConfig } from "@/consts";

interface VideoGeneration {
    url?: string;
    firstFrame?: string;
    lastFrame?: string;
    status?: string;
    prompt?: string;
    taskId?: string;
    duration?: number;
    aspectRatio?: string;
}

interface VideoGenerationEditorModalProps {
    job: any;
    open: boolean;
    onClose: () => void;
    video: VideoGeneration | null;
    index: number | null;
    asset: any;
    onRefresh: () => void;
}

const VideoGenerationEditorModal: React.FC<VideoGenerationEditorModalProps> = ({
    job,
    open,
    onClose,
    video,
    index,
    asset,
    onRefresh
}) => {
    const [prompt, setPrompt] = useState(video?.prompt || "");
    const [duration, setDuration] = useState<number>(video?.duration || 5);
    const [aspectRatio, setAspectRatio] = useState<string>(video?.aspectRatio || asset?.workflow?.dataBus?.aspectRatio || "9:16");
    const [loading, setLoading] = useState(false);

    // Sync internal state ONLY when the modal opens or when specifically needed
    useEffect(() => {
        if (open) {
            setPrompt(video?.prompt || "");
            setDuration(video?.duration || 5);
            setAspectRatio(video?.aspectRatio || asset?.workflow?.dataBus?.aspectRatio || "9:16");
        }
    }, [open]);

    const isRunning = video?.status?.toLowerCase() === 'running';

    const handleRegenerate = async () => {
        if (!asset || index === null || loading) return;

        setLoading(true);
        try {
            const currentGenerations = job?.dataBus?.videoGenerations || [];
            const newGenerations = [...currentGenerations];

            newGenerations[index] = {
                ...newGenerations[index],
                prompt: prompt,
                duration: duration,
                aspectRatio: aspectRatio,
                status: 'running',
                taskId: '',
                url: '',
            };

            await updateWorkflowJob({
                id: asset.workflow?._id,
                index: job.index,
                dataKey: 'videoGenerations',
                data: {
                    videoGenerations: newGenerations
                },
            });
            message.success(`视频分镜 #${index + 1} 已加入重新生成队列`);
            onRefresh();
        } catch (e) {
            console.error(e);
            message.error('保存失败');
        } finally {
            setLoading(false);
        }
    };

    if (index === null) return null;

    return (
        <Modal
            title={
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#7150ff]/5 rounded-lg flex items-center justify-center">
                        <EditOutlined className="text-[#7150ff]" />
                    </div>
                    <span className="text-sm font-bold">视频分镜交互面板 #{index + 1}</span>
                </div>
            }
            onCancel={onClose}
            open={open}
            width={650}
            footer={null}
            centered
            bodyStyle={{ padding: '24px' }}
        >
            <div className="flex flex-col max-h-[80vh]">
                <div className="overflow-y-auto pr-2 scrollbar-hide flex-1 pb-4">
                    <div className="flex flex-col gap-6">
                        {/* Prompt Section */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <InfoCircleOutlined className="text-xs" />
                                    视频生成提示词
                                </label>
                            </div>
                            <Input.TextArea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="输入视频生成提示词..."
                                autoSize={{ minRows: 6, maxRows: 12 }}
                                className="!bg-gray-50/50 border-gray-100 rounded-2xl p-4 text-xs transition-all focus:!bg-white focus:!border-[#7150ff]/30"
                            />
                           
                        </div>

                        {/* Video Config Section */}
                        <div className="grid grid-cols-2 gap-8">
                            {/* Duration Selection */}
                            <div className="space-y-3">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    生成时长 (秒)
                                </label>
                                <div className="flex flex-col gap-2">
                                    <div className="grid grid-cols-4 gap-2">
                                        {[4, 5, 10, 12].map(d => (
                                            <div
                                                key={d}
                                                onClick={() => setDuration(d)}
                                                className={`py-1.5 text-center rounded-lg border cursor-pointer transition-all font-bold text-[10px] relative ${
                                                    duration === d 
                                                    ? 'bg-primary border-primary text-white shadow-[0_2px_8px_-1px_rgba(113,80,255,0.4)] scale-[1.02] z-10' 
                                                    : 'bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100'
                                                }`}
                                            >
                                                {d}s
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center bg-gray-50/50 border border-gray-100 rounded-lg h-[32px] px-3 transition-all focus-within:border-primary/30 focus-within:bg-white focus-within:shadow-sm">
                                        <span className="text-[9px] text-gray-400 font-black uppercase tracking-wider shrink-0 mr-2">自定义输入</span>
                                        <InputNumber
                                            min={4}
                                            max={12}
                                            step={1}
                                            bordered={false}
                                            value={duration}
                                            onChange={(val) => val && setDuration(Number(val))}
                                            className="w-full !bg-transparent font-bold text-[11px] !shadow-none"
                                            controls={false}
                                        />
                                        <span className="text-[10px] text-gray-400 font-bold shrink-0 ml-2">秒 (4-12s)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Aspect Ratio Selection */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                        视频尺寸 (比例)
                                    </label>
                                    {!video?.aspectRatio && aspectRatio === asset?.workflow?.dataBus?.aspectRatio && (
                                        <span className="text-[9px] text-primary font-bold bg-primary/5 px-1.5 py-0.5 rounded uppercase tracking-wider">继承自全局</span>
                                    )}
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    {Object.values(aspectRatioConfig).map(r => (
                                        <div
                                            key={r}
                                            onClick={() => setAspectRatio(r)}
                                            className={`py-1.5 text-center rounded-lg border cursor-pointer transition-all font-bold text-[10px] relative ${
                                                aspectRatio === r 
                                                ? 'bg-primary border-primary text-white shadow-[0_2px_8px_-1px_rgba(113,80,255,0.4)] scale-[1.05] z-10' 
                                                : 'bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100'
                                            }`}
                                        >
                                            {r}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                       
                    </div>
                </div>

                {/* Persistent Bottom Action */}
                <div className="pt-6 border-t border-gray-50 bg-white">
                    <Button
                        type="primary"
                        block
                        size="large"
                        loading={loading}
                        icon={<ReloadOutlined className={loading ? 'animate-spin' : ''} />}
                        onClick={handleRegenerate}
                        className={`h-12 !rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${
                            (isRunning || video?.url)
                                ? '!bg-[#7150ff] hover:!bg-[#5e3dd9] !border-none'
                                : '!bg-gray-900 hover:!bg-black !border-none'
                            }`}
                    >
                        {(isRunning || video?.url) ? '重新生成视频分镜' : '开始生成视频分镜'}
                    </Button>
                </div>
            </div>

            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </Modal>
    );
};

export default VideoGenerationEditorModal;
