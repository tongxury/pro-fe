import {
    updateMode,
    updateSubtitle,
    updateTaskGenerateVideoSegment,
    updateTaskSegmentAIVideoSegment,
    updateTaskSegmentAsset,
    deleteTaskSegmentAsset
} from "@/api/task.ts";
import AssetCreatorDrawer from "@/pages/asset/create/CreatorDrawer";
import AssetEditorDrawer from "@/pages/asset/edit/AssetEditorDrawerV2";
import AssetView from "@/pages/asset/views/AssetView";
import { DeleteOutlined, LoadingOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Tooltip, Skeleton, Input, Checkbox, Popconfirm, message, Typography } from "antd";
import { useState, useEffect } from "react";

export default function Step3({ data, onChange, reload }: { data: any, onChange: (data: any) => void, reload?: () => void }) {
    // Local state for subtitle editing

    // State for sequential generation
    const [mode, setMode] = useState(data?.mode);

    // State for saving subtitle
    const [savingSubtitle, setSavingSubtitle] = useState<string | null>(null);

    // Initialize subtitles from data



    const updateTaskMode = (mode: string) => {
        setMode(mode);
        updateMode({ id: data?._id, mode }).then(() => {
            reload?.();
        });
    };

    const updateTaskAsset = (segmentId: string, assetId: string) => {
        if (!assetId) return;
        updateTaskSegmentAsset({ id: segmentId, assetId }).then(() => {
            reload?.();
        });
    };

    const handleDeleteVideo = async (segmentId: string) => {
        deleteTaskSegmentAsset({ id: segmentId }).then(() => {
            reload?.();
        });

    };

    const canGenerateVideo = (currentIndex: number) => {

        if (!data?.segments?.[currentIndex]?.subtitle) return false;
        if (mode !== "sequential") return true; // 非串行模式，都可以生成
        if (currentIndex === 0) return true; // 第一个分镜始终可以生成

        // 检查前一个分镜是否已经有选中的视频
        const previousSegment = data?.segments?.[currentIndex - 1];

        return previousSegment?.assetId
    };

    if (!data?.segments) {
        return (
            <div className="flex flex-col gap-8 p-5">
                {[1, 2, 3].map(i => (
                    <div key={i} className="flex flex-col gap-4">
                        <Skeleton.Input active size="small" style={{ width: 150 }} />
                        <div className="flex gap-4 overflow-hidden">
                            {[1, 2, 3].map(j => (
                                <Skeleton.Node key={j} active style={{ width: 300, height: 400 }} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-8 min-h-screen animate-fade-in pb-20">

            {/* 顶部最终结果展示 - 如果有 */}
            {data?.status === 'videoGenerated' && (
                <div className="w-full bg-gradient-to-r from-[#7150ff]/10 to-[#7150ff]/5 p-6 rounded-2xl border border-[#7150ff]/20 mb-4">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-1 h-4 bg-gradient-to-b from-[#7150ff] to-[#a18aff] rounded-full"></div>
                        <p className="text-lg font-bold text-gray-800 tracking-tight">最终生成结果</p>
                    </div>
                    <div className="flex justify-center">
                        <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-gray-100">
                            <video
                                src={data?.generatedResult?.url}
                                controls
                                className="h-[400px] object-cover bg-black"
                            >
                                <source src={data?.generatedResult?.url} />
                            </video>
                        </div>
                    </div>
                </div>
            )}

            {/* 分段处理区域 - 垂直布局，每个分段一个大卡片 */}
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-4 bg-gradient-to-b from-[#7150ff] to-[#a18aff] rounded-full"></div>
                        <p className="text-lg font-bold text-gray-800 tracking-tight">视频分镜处理</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            checked={mode === "sequential"}
                            onChange={(e) => updateTaskMode(e.target.checked ? "sequential" : "normal")}
                            disabled={data?.segments?.some((x: any) => x.assetId)}
                            className="text-sm"
                        >
                            <span className="text-sm text-gray-600">所有分镜任务保持一致（串行生成）</span>
                        </Checkbox>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {data?.segments?.map((se: any, index: number) => {
                        const x = se.segment;

                        if (!x) return null;

                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                            >
                                {/* Header */}
                                <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2">
                                            <span className="bg-[#7150ff] text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm shadow-[#7150ff]/20">
                                                分镜 {index + 1}
                                            </span>
                                            <span className="text-xs font-mono text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
                                                {x?.timeStart || 0}s ~ {x?.timeEnd || 0}s
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {Object.keys(x.typedTags).slice(0, 3).map((xx, i) => (
                                            <span key={i} className="px-2 py-0.5 text-[10px] text-gray-500 bg-white border border-gray-200 rounded-md">
                                                {{
                                                    focusOn: "关注点",
                                                    text: "文本",
                                                    person: "人物",
                                                    action: "动作",
                                                    picture: "画面",
                                                    scene: "场景",
                                                    shootingStyle: "拍摄技巧"
                                                }[xx] as any}: {x.typedTags[xx]?.[0]}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
                                    <div className="lg:col-span-4 flex flex-col gap-6">
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <p className="text-sm font-bold text-gray-700">画面描述</p>
                                            </div>
                                            <Tooltip title={x?.description}>
                                                <p className="line-clamp-4 text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100/50">
                                                    {x?.description}
                                                </p>
                                            </Tooltip>
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                                    </svg>
                                                </div>
                                                <p className="text-sm font-bold text-gray-700">参考帧</p>
                                            </div>
                                            <div className="grid grid-cols-3 gap-3">
                                                {se.segment?.highlightFrames?.slice(0, 3).map((f: any, i: number) => (
                                                    <div key={i} className="aspect-[9/16] rounded-lg overflow-hidden bg-gray-100 border border-gray-200 relative group shadow-sm">
                                                        <img
                                                            src={f.url}
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="lg:col-span-4 flex flex-col gap-4">
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-green-50 text-green-500 flex items-center justify-center">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                                    </svg>
                                                </div>
                                                <p className="text-sm font-bold text-gray-700">口播文案</p>
                                            </div>
                                            {se.status === "textGenerating" ? (
                                                <span className="flex items-center gap-1 text-xs text-[#7150ff] font-medium bg-[#7150ff]/5 px-2 py-0.5 rounded-full">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#7150ff] animate-pulse"></span>
                                                    生成中...
                                                </span>
                                            ) : savingSubtitle === se._id && (
                                                <span className="flex items-center gap-1 text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full animate-fade-in">
                                                    <LoadingOutlined className="text-[10px]" />
                                                    保存中...
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex-1 relative group flex flex-col">
                                            <Typography.Paragraph
                                                // className="!mb-0 text-sm text-gray-600 leading-relaxed min-h-[140px]"
                                                editable={
                                                    (!!se.assetId || se.status === 'textGenerating') ? false :
                                                        {
                                                            onChange: (val) => {
                                                                if (val === se.subtitle) return;
                                                                setSavingSubtitle(se._id);
                                                                updateSubtitle({ id: se._id, subtitle: val }).then(() => {
                                                                    reload?.();
                                                                }).finally(() => {
                                                                    setSavingSubtitle(null);
                                                                });
                                                            },
                                                            triggerType: ['text', 'icon'],
                                                            // autoSize: { minRows: 4, maxRows: 12 }
                                                        }
                                                }
                                            >
                                                {se.subtitle}
                                            </Typography.Paragraph>
                                        </div>
                                    </div>

                                    {/* 右侧：视频生成 */}
                                    <div className="lg:col-span-4 flex flex-col gap-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <p className="text-sm font-bold text-gray-700">视频片段</p>
                                            </div>
                                            {se?.assetId && (
                                                <Popconfirm
                                                    title="确认删除"
                                                    description="确定要删除这个视频片段吗？此操作无法撤销。"
                                                    onConfirm={() => handleDeleteVideo(se._id)}
                                                    okText="删除"
                                                    cancelText="取消"
                                                    okButtonProps={{ danger: true }}
                                                >
                                                    <Button
                                                        type="text"
                                                        size="small"
                                                        danger
                                                        icon={<DeleteOutlined />}
                                                        className="hover:bg-red-50"
                                                    >
                                                        删除视频
                                                    </Button>
                                                </Popconfirm>
                                            )}
                                        </div>

                                        <div className="flex-1 flex flex-col">
                                            {
                                                se?.assetId ?
                                                    <AssetEditorDrawer
                                                        assetId={se?.assetId}
                                                        onSuccess={(id) => { updateTaskAsset(se?._id, id) }}>
                                                        <AssetView x={se?.asset} />
                                                    </AssetEditorDrawer> :
                                                    canGenerateVideo(index) ? (
                                                        <AssetCreatorDrawer
                                                            baseAssetId={data?.mode === "sequential" ? data?.segments?.[index - 1]?.assetId : undefined}
                                                            segment={se?.segment}
                                                            commodity={data?.commodity}
                                                            prompts={{
                                                                subtitle: se?.subtitle,
                                                            }}
                                                            onCreated={(id) => { updateTaskAsset(se?._id, id) }}
                                                        >
                                                            <div className="group cursor-pointer h-full">
                                                                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#7150ff] transition-all duration-300 overflow-hidden h-full">
                                                                    {/* Background gradient effect on hover */}
                                                                    <div className="absolute inset-0 bg-gradient-to-br from-[#7150ff]/5 to-[#a18aff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                                                    {/* Content */}
                                                                    <div className="relative flex flex-col items-center justify-center gap-4 p-6 h-full">
                                                                        {/* Icon */}
                                                                        <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                                            <svg className="w-8 h-8 text-[#7150ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                                                            </svg>
                                                                        </div>

                                                                        {/* Text */}
                                                                        <div className="text-center">
                                                                            <p className="text-sm font-semibold text-gray-700 mb-1">创建视频</p>
                                                                            <p className="text-xs text-gray-500">点击开始生成</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </AssetCreatorDrawer>
                                                    ) : (
                                                        <Tooltip title={mode === "sequential" ? "串行模式下，需先完成前序分镜的视频生成" : "请先填写口播文案"}>
                                                            <div className="cursor-not-allowed h-full">
                                                                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-dashed border-gray-300 opacity-50 h-full">
                                                                    {/* Content */}
                                                                    <div className="relative flex flex-col items-center justify-center gap-4 p-6 h-full">
                                                                        {/* Icon */}
                                                                        <div className="w-16 h-16 rounded-2xl bg-gray-200 flex items-center justify-center">
                                                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                                            </svg>
                                                                        </div>

                                                                        {/* Text */}
                                                                        <div className="text-center">
                                                                            <p className="text-sm font-semibold text-gray-500 mb-1">等待中</p>
                                                                            <p className="text-xs text-gray-400">需先完成前序</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Tooltip>
                                                    )

                                            }
                                        </div>

                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
