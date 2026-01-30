import React, { useState, useEffect, useMemo } from "react";
import { Drawer, Button, Input, Spin, message, Tabs } from "antd";
import {
    EditOutlined,
    InfoCircleOutlined,
    PictureOutlined,
    PlusOutlined,
    ReloadOutlined,
    CheckCircleOutlined,
    CloseOutlined,
    CloudUploadOutlined
} from "@ant-design/icons";
import ImageComponent from "@/components/Image";
import Uploader from "@/components/UploaderV6";
import { updateWorkflowJobData } from "@/api/workflow";

interface Frame {
    url?: string;
    desc?: string;
    status?: 'waiting' | 'running' | 'done';
    prompt?: string;
    refs?: string[];
}

interface KeyFrameEditorDrawerProps {
    job: any;
    open: boolean;
    onClose: () => void;
    frame: Frame | null;
    index: number | null;
    asset: any;
    onRefresh: () => void;
}

const KeyFrameEditorDrawer: React.FC<KeyFrameEditorDrawerProps> = ({
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
        // From highlightFrames
        asset?.segment?.highlightFrames?.forEach((f: any) => {
            if (f.url) imgs.add(f.url);
        });
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
        if (segment.shootingStyle) parts.push(`拍摄建议：\n${segment.shootingStyle}`);

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

        return parts.join("\n\n");
    };

    const getInitialPrompt = () => {

        // return "";

        if (frame?.prompt || frame?.desc) return frame.prompt || frame.desc || "";
        if (index === null) return "";
        const segmentIndex = Math.floor(index / 2);
        const segment = job?.dataBus?.segmentScript?.segments?.[segmentIndex];
        return formatSegment(segment);
    };

    const [prompt, setPrompt] = useState(getInitialPrompt());
    const [refs, setRefs] = useState<string[]>(frame?.refs || []);
    const [loading, setLoading] = useState(false);

    // Sync internal state when the drawer opens
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
            const currentFrames = asset?.workflow?.dataBus?.keyFrames?.frames || [];
            const newFrames = [...currentFrames];

            newFrames[index] = {
                ...newFrames[index],
                // desc: prompt,
                prompt: prompt,
                refs: refs,
                status: 'running',
                url: undefined,
            };

            await updateWorkflowJobData({
                id: asset.workflow._id,
                name: 'keyFrames',
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
        <Drawer
            title={
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#7150ff]/5 rounded-lg flex items-center justify-center">
                        <EditOutlined className="text-[#7150ff]" />
                    </div>
                    <span className="text-sm font-bold">分镜交互面板 #{index + 1}</span>
                </div>
            }
            placement="right"
            onClose={onClose}
            open={open}
            width={400}
            bodyStyle={{ padding: '24px' }}
            headerStyle={{ borderBottom: '1px solid #f8f9fa' }}
        >
            <div className="flex flex-col h-full gap-8">
                <div className="flex flex-col gap-6 flex-1">
                    {/* Prompt Section */}
                    {/* ... (rest of the content remains identical) ... */}
                    <div className="space-y-3">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <InfoCircleOutlined className="text-xs" />
                            画面描述
                        </label>
                        <Input.TextArea
                            value={prompt}
                            readOnly={isRunning}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="输入画面描述词..."
                            autoSize={{ minRows: 7, maxRows: 12 }}
                            className={`!bg-gray-50/50 border-gray-100 rounded-2xl p-4 text-xs transition-all focus:!bg-white focus:!border-[#7150ff]/30 ${isRunning ? 'cursor-not-allowed opacity-60' : ''}`}
                        />
                    </div>

                    {/* Refs Section */}
                    <div className="space-y-3">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <PictureOutlined className="text-xs" />
                                参考图
                            </span>
                        </label>

                        {/* Current Selection Prominent Preview */}
                        {refs.length > 0 && (
                            <div className="relative group animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border-2 border-[#7150ff]/20 shadow-xl transition-all hover:border-[#7150ff]/40">
                                    <ImageComponent src={refs[0]} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                                    <div className="absolute top-2 right-2 flex gap-2">
                                        <Button
                                            size="small"
                                            shape="circle"
                                            icon={<CloseOutlined className="text-[10px]" />}
                                            onClick={() => setRefs([])}
                                            className="!bg-white/90 !border-none shadow-md hover:!bg-white hover:scale-110 transition-all"
                                        />
                                    </div>
                                    <div className="absolute bottom-3 left-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-[#7150ff] rounded-full animate-pulse" />
                                            <span className="text-[10px] text-white font-bold uppercase tracking-widest opacity-90">当前参考</span>
                                        </div>
                                        <div className="text-[10px] text-white/70 mt-0.5">正在使用此图作为分镜生成参考</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <Tabs
                            defaultActiveKey="history"
                            className="ref-tabs"
                            items={[
                                {
                                    key: 'history',
                                    label: (
                                        <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider">
                                            <PictureOutlined className="text-xs" />
                                            历史素材
                                        </span>
                                    ),
                                    children: (
                                        availableImages.length > 0 ? (
                                            <div className="space-y-2 py-2">
                                                <div className="text-[10px] text-gray-400">
                                                    从已生成的素材中快速选择
                                                </div>
                                                <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide -mx-1 px-1">
                                                    {availableImages.map((url, i) => (
                                                        <div
                                                            key={i}
                                                            className="flex-shrink-0 w-24 h-24 rounded-xl border border-gray-100 overflow-hidden cursor-pointer transition-all relative group bg-gray-50 hover:border-[#7150ff]/30 hover:shadow-md"
                                                        >
                                                            <ImageComponent src={url} className="w-full h-full object-cover transition-all" />
                                                            <div
                                                                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    if (isRunning) return;
                                                                    setRefs([url]);
                                                                    message.info('已选择该图片');
                                                                }}
                                                            >
                                                                <div className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center shadow-sm border border-gray-100 hover:bg-white">
                                                                    <PlusOutlined className="text-[#7150ff] text-[10px]" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="py-8 text-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-100">
                                                <PictureOutlined className="text-gray-200 text-2xl mb-2" />
                                                <div className="text-[10px] text-gray-400">暂无历史素材</div>
                                            </div>
                                        )
                                    )
                                },
                                {
                                    key: 'upload',
                                    label: (
                                        <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider">
                                            <CloudUploadOutlined className="text-xs" />
                                            手动上传
                                        </span>
                                    ),
                                    children: (
                                        <div className="py-2 space-y-2">
                                            <div className="text-[10px] text-gray-400">
                                                上传本地图片作为参考
                                            </div>
                                            <div className={isRunning ? "pointer-events-none opacity-60" : ""}>
                                                <Uploader
                                                    key={index}
                                                    max={1}
                                                    accept="image/*"
                                                    value={refs}
                                                    onUploaded={(data: any) => {
                                                        const urls = data.map((item: any) => item.url);
                                                        setRefs(urls);
                                                    }}
                                                    disabled={isRunning}
                                                />
                                            </div>
                                        </div>
                                    )
                                }
                            ]}
                        />
                    </div>
                </div>

                {/* Persistent Bottom Action */}
                <div className="mt-auto pt-6 border-t border-gray-50">
                    <Button
                        type="primary"
                        block
                        size="large"
                        disabled={isRunning}
                        loading={loading}
                        icon={<ReloadOutlined className={loading ? 'animate-spin' : ''} />}
                        onClick={handleRegenerate}
                        className={`h-12 !rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${isRunning
                            ? '!bg-gray-100 !border-none !text-gray-400'
                            : frame?.url
                                ? '!bg-[#7150ff] hover:!bg-[#5e3dd9] !border-none'
                                : '!bg-gray-900 hover:!bg-black !border-none'
                            }`}
                    >
                        {isRunning ? '生成中...' : frame?.url ? '重新生成分镜' : '开始生成分镜'}
                    </Button>
                </div>
            </div>
        </Drawer>
    );
};

export default KeyFrameEditorDrawer;
