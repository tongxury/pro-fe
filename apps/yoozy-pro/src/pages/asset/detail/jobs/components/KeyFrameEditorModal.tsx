import React, { useState, useEffect, useMemo } from "react";
import { Modal, Button, Input, message, Image } from "antd";
import {
    EditOutlined,
    InfoCircleOutlined,
    PictureOutlined,
    ReloadOutlined,
    CheckCircleOutlined,
    EyeOutlined,
} from "@ant-design/icons";
import ImageComponent from "@/components/Image";
import Uploader from "@/components/UploaderV6";
import { updateWorkflowJob } from "@/api/workflow";

interface Frame {
    url?: string;
    desc?: string;
    status?: 'waiting' | 'running' | 'done' | 'failed';
    prompt?: string;
    refs?: string[];
    error?: string;
}

interface KeyFrameEditorModalProps {
    job: any;
    open: boolean;
    onClose: () => void;
    frame: Frame | null;
    index: number | null;
    asset: any;
    onRefresh: () => void;
}

const KeyFrameEditorModal: React.FC<KeyFrameEditorModalProps> = ({
    job,
    open,
    onClose,
    frame,
    index,
    asset,
    onRefresh
}) => {
    const availableImages = useMemo(() => {
        const imgs = new Set<string>();
        // From keyFrames
        job?.dataBus?.keyFrames?.frames?.forEach((f: any) => {
            if (f.url) imgs.add(f.url);
        });
        // // From highlightFrames
        // asset?.segment?.highlightFrames?.forEach((f: any) => {
        //     if (f.url) imgs.add(f.url);
        // });
        // From commodity medias
        asset?.commodity?.medias?.forEach((m: any) => {
            if (m.url) imgs.add(m.url);
        });
        return Array.from(imgs);
    }, [asset, job.dataBus]);

    const formatSegment = (segment: any) => {
        if (!segment) return "";
        const parts = [];
        if (segment.style) parts.push(`【分镜标题：${segment.style}】`);
        if (segment.contentStyle) parts.push(`视觉风格：${segment.contentStyle}`);
        if (segment.sceneStyle) parts.push(`场景：${segment.sceneStyle}`);
        if (segment.description) parts.push(`画面描写：${segment.description}`);
        // if (segment.shootingStyle) parts.push(`拍摄建议：\n${segment.shootingStyle}`);


        if (segment.typedTags) {
            const tagsParts = [];
            for (const [key, values] of Object.entries(segment.typedTags)) {
                if (Array.isArray(values) && values.length > 0) {
                    tagsParts.push(`${key}: ${values.join(", ")}`);
                }
            }
            if (tagsParts.length > 0) {
                parts.push(`标签：\n${tagsParts.join("\n")}`);
            }
        }

        if (index % 2 == 0) {
            parts.push(`依据以上分镜描述，生成一张视频首帧图片`);
        } else {
            parts.push(`依据以上分镜描述，生成一张视频尾帧图片`);
        }

        return parts.join("\n\n");
    };

    const getInitialPrompt = () => {
        if (frame?.prompt || frame?.desc) return frame.prompt || frame.desc || "";
        if (index === null) return "";
        const segmentIndex = Math.floor(index / 2);
        const segment = job?.dataBus?.segmentScript?.segments?.[segmentIndex];
        return formatSegment(segment);
    };

    const [prompt, setPrompt] = useState(getInitialPrompt());
    const [refs, setRefs] = useState<string[]>(frame?.refs || []);
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [previewOpen, setPreviewOpen] = useState(false);

    // Sync internal state when the frame or index changes
    useEffect(() => {
        if (open) {
            setPrompt(getInitialPrompt());
            setRefs(frame?.refs || []);
        }
    }, [open]);

    const isRunning = frame?.status?.toLowerCase() === 'running';

    const handleRegenerate = async () => {
        if (!asset || index === null || loading) return;

        setLoading(true);
        try {
            const currentFrames = job?.dataBus?.keyFrames?.frames || [];
            const newFrames = [...currentFrames];

            newFrames[index] = {
                // ...newFrames[index],
                // desc: prompt,
                prompt: prompt,
                refs: refs,
                status: 'running',
                // url: undefined,
            };

            // await updateWorkflowJobData({
            //     id: asset.workflow._id,
            //     name: 'keyFrames',
            //     data: {
            //         keyFrames: {
            //             ...asset.workflow.dataBus.keyFrames,
            //             frames: newFrames,
            //         }
            //     },
            // });

            await updateWorkflowJob({
                id: asset.workflow?._id,
                index: job.index,
                dataKey: 'keyFrames',
                data: {
                    keyFrames: {
                        ...job.dataBus.keyFrames,
                        frames: newFrames,
                    }
                },
            });
            message.success(`分镜 #${index + 1} 已加入生成队列`);
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
                    <span className="text-sm font-bold">分镜交互面板 #{index + 1}</span>
                </div>
            }
            onCancel={onClose}
            open={open}
            width={750}
            footer={null}
            centered
            bodyStyle={{ padding: '24px' }}
        >
            <div className="flex flex-col max-h-[80vh]">
                <div className="overflow-y-auto pr-2 scrollbar-hide flex-1 pb-4">
                    <div className="flex flex-col gap-8">
                        {/* Prompt Section */}
                        <div className="space-y-3">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <InfoCircleOutlined className="text-xs" />
                                画面描述
                            </label>
                            <Input.TextArea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="输入画面描述词..."
                                autoSize={{ minRows: 7, maxRows: 12 }}
                                className={`!bg-gray-50/50 border-gray-100 rounded-2xl p-4 text-xs transition-all focus:!bg-white focus:!border-[#7150ff]/30`}
                            />
                            <div className="mt-2 p-3 bg-amber-50 rounded-xl border border-amber-100">
                                <div className="text-[10px] text-amber-600 font-bold uppercase mb-1 flex items-center gap-1">
                                    <InfoCircleOutlined className="text-[10px]" /> 温馨提示
                                </div>
                                <div className="text-[10px] text-amber-500 leading-relaxed space-y-1.5">
                                    <p>这里的描述词将直接发送给绘图模型。请<b>直接描述画面内容</b>，避免使用指令性语句（如“帮我写一段...”或“描述一下...”），以免模型审核机制误识别为文本处理任务而拒绝。</p>
                                    <div className="bg-white/50 p-2 rounded-lg border border-amber-100/50 space-y-1">
                                        <p className="text-gray-400">❌ 帮我生成一段关于手表的口播文案，背景要精美（带有“文案”易被拒绝）</p>
                                        <p className="text-amber-600 font-bold">✅ 一张展示名贵手表的精美特写，背景是充满科技感的实验室，电影级光效</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Refs Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <PictureOutlined className="text-xs" />
                                    参考素材
                                </label>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-bold text-gray-400">
                                        {refs.length}/5
                                    </span>
                                    {refs.length > 0 && (
                                        <Button
                                            type="link"
                                            size="small"
                                            onClick={() => setRefs([])}
                                            className="!text-[10px] !p-0 !h-auto !text-[#7150ff] hover:!text-[#5e3dd9]"
                                        >
                                            清除全部
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {/* Unified Selection & Upload Grid */}
                            <div className={`p-4 bg-gray-50/50 rounded-2xl border border-gray-100 transition-all`}>
                                <Uploader
                                    key={index}
                                    max={5}
                                    accept="image/*"
                                    value={refs}
                                    onUploaded={(data) => {
                                        const newUrls = data.map(item => typeof item === 'string' ? item : item.url);
                                        setRefs(newUrls.slice(0, 5));
                                    }}
                                />
                            </div>

                            {/* Historical Library Scroll */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between px-1">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">从历史库选择</span>
                                </div>

                                {availableImages.length > 0 ? (
                                    <div className="flex overflow-x-auto gap-2.5 pb-2 -mx-1 px-1">
                                        {availableImages.map((url, i) => {
                                            const isSelected = refs.includes(url);
                                            return (
                                                <div
                                                    key={i}
                                                    className={`flex-shrink-0 w-20 aspect-[9/16] rounded-xl border-2 overflow-hidden cursor-pointer transition-all relative group bg-white ${isSelected ? 'border-[#7150ff] ring-2 ring-[#7150ff]/10' : 'border-gray-100 hover:border-[#7150ff]/30'
                                                        }`}
                                                    onClick={() => {
                                                        if (isSelected) {
                                                            setRefs(prev => prev.filter(item => item !== url));
                                                        } else if (refs.length < 5) {
                                                            setRefs(prev => [...prev, url]);
                                                        } else {
                                                            message.warning('参考图数量已达上限 (5张)');
                                                        }
                                                    }}
                                                >
                                                    <ImageComponent preview={false} src={url} className="w-full h-full object-cover transition-all group-hover:scale-105" />
                                                    
                                                    {/* Preview Overlay Icon */}
                                                    <div 
                                                        className="absolute top-1.5 right-1.5 w-6 h-6 rounded-lg bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer text-white opacity-0 group-hover:opacity-100 transition-all z-20 hover:bg-[#7150ff]"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setPreviewImage(url);
                                                            setPreviewOpen(true);
                                                        }}
                                                    >
                                                        <EyeOutlined style={{ fontSize: 12 }} />
                                                    </div>

                                                    {isSelected && (
                                                        <div className="absolute inset-0 bg-[#7150ff]/10 flex items-center justify-center">
                                                            <div className="w-6 h-6 bg-[#7150ff] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                                                                <CheckCircleOutlined className="text-white text-[11px]" />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="py-6 border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center gap-2">
                                        <PictureOutlined className="text-gray-200 text-xl" />
                                        <span className="text-[10px] text-gray-400">暂无历史素材</span>
                                    </div>
                                )}
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
                        className={`h-12 !rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${isRunning || frame?.url
                                ? '!bg-[#7150ff] hover:!bg-[#5e3dd9] !border-none'
                                : '!bg-gray-900 hover:!bg-black !border-none'
                            }`}
                    >
                        {isRunning ? '重新生成分镜' : frame?.url ? '重新生成分镜' : '开始生成分镜'}
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

            {previewImage && (
                <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(null),
                    }}
                    src={previewImage}
                />
            )}
        </Modal>
    );
};

export default KeyFrameEditorModal;
