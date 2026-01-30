import React, { useState } from "react";
import { Button, message, Tooltip } from "antd";
import { CheckCircleFilled, EditOutlined, LoadingOutlined, InfoCircleOutlined, ThunderboltFilled } from "@ant-design/icons";
import { Asset } from "@/types.ts";
import { startGenerating, updatePrompt } from "@/api/asset.ts";
import CommodityView from "@/pages/product/CommodityView.tsx";
import VideoSegment from "@/components/VideoSegment";
import CompositionInput from "@/components/CompositionInput.tsx";
import Credit from "@/components/Credit.tsx";
import { creditCostAsset } from "@/consts";

interface ContentProps {
    data?: Asset;
    onSuccess?: (id: string) => void;
}

const AssetCreator2: React.FC<ContentProps> = ({ data, onSuccess }) => {

    const [tmpPrompt, setTmpPrompt] = useState<string>();
    const [isSaving, setIsSaving] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [isMarketingCopyCollapsed, setIsMarketingCopyCollapsed] = useState(true);

    const onPromptChange = (text: string) => {

        if (text == "") return;

        setTmpPrompt(text)

        const save = async () => {
            setIsSaving(true);
            try {
                await updatePrompt({ id: data?._id, text: tmpPrompt });
            } finally {
                setIsSaving(false);
            }
        };
        save();
    }

    const onCreate = () => {
        setSubmitting(true)
        startGenerating({ id: data?._id }).then((res) => {
            void message.success(`视频正在生成中，请稍后到"资产库"中查看`)
            onSuccess?.(res?.data?._id);
        }).finally(() => {
            setSubmitting(false)
        })
    }

    const asset = data

    return (
        <div className="h-full flex bg-[#f8f9fc]">
            {/* Left Panel: Video Preview */}
            <div className="w-[400px] xl:w-[480px] flex-shrink-0 bg-white border-r border-gray-100 flex flex-col z-20 relative h-full shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
                <div className="flex-1 flex flex-col min-h-0 relative">
                    <div className="px-8 py-6 border-b border-gray-50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#7150ff]/10 flex items-center justify-center text-[#7150ff]">
                                <ThunderboltFilled className="text-xl" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 leading-tight">创作预览</h3>
                                <p className="text-xs text-gray-400 mt-0.5">基于参考视频生成</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 p-8 flex flex-col items-center justify-center bg-gray-50/30">
                        <div className="relative w-full max-w-[340px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl ring-8 ring-white">
                            <VideoSegment
                                url={asset?.segment?.root?.url}
                                coverUrl={asset?.segment?.root?.coverUrl}
                                startTime={asset?.segment?.timeStart}
                                endTime={asset?.segment?.timeEnd}
                                minimal
                            />

                            {/* Overlay gradient for better text visibility if needed */}
                            <div className="absolute inset-0 pointer-events-none ring-1 ring-black/5 rounded-2xl"></div>
                        </div>

                        <div className="mt-8 text-center max-w-[280px]">
                            <p className="text-sm text-gray-500 leading-relaxed">
                                左侧展示的是参考视频片段，AI 将学习其运镜和节奏，结合您的商品生成新的视频。
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel: Create Form */}
            <div className="flex-1 overflow-hidden relative flex flex-col">
                {/* Header */}
                <div className="px-8 py-6 bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">视频配置</h2>
                        <p className="text-sm text-gray-500 mt-1">配置生成参数，打造完美视频</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-[#7150ff]/5 text-[#7150ff] text-xs font-medium border border-[#7150ff]/10">
                            创作模式
                        </span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                    <div className="max-w-[800px] mx-auto space-y-6 animate-fade-in">
                        {/* Commodity Card */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 group">
                            <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
                                <span className="font-bold text-gray-700 flex items-center gap-2">
                                    <span className="w-1.5 h-4 rounded-full bg-[#7150ff]"></span>
                                    商品信息
                                </span>
                            </div>
                            <div className="p-0">
                                <CommodityView data={asset?.commodity} />
                            </div>
                        </div>

                        {/* AI Script Card */}
                        <div className="bg-white pb-6 rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 group">
                            <div
                                className="px-6 py-4 border-b border-gray-50 bg-gray-50/30 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => setIsMarketingCopyCollapsed(!isMarketingCopyCollapsed)}
                            >
                                <div className="flex items-center gap-2">
                                    <span className={`w-1.5 h-4 rounded-full bg-gray-300 transition-colors duration-300 ${!isMarketingCopyCollapsed ? 'bg-[#7150ff]' : ''}`}></span>
                                    <span className="font-bold text-gray-700">画面复刻文案</span>
                                    <Tooltip title="AI 根据参考视频和商品信息生成的画面描述，您可以进行修改">
                                        <InfoCircleOutlined className="text-gray-300 hover:text-gray-500 cursor-help transition-colors" />
                                    </Tooltip>
                                </div>

                                <div className="flex items-center gap-3">
                                    {isSaving && (
                                        <span className="text-xs text-[#7150ff] flex items-center gap-1.5 bg-[#7150ff]/5 px-2.5 py-1 rounded-full animate-fade-in">
                                            <LoadingOutlined /> 保存中...
                                        </span>
                                    )}
                                    {!isSaving && tmpPrompt !== undefined && tmpPrompt !== asset?.prompt && (
                                        <span className="text-xs text-green-500 flex items-center gap-1.5 bg-green-50 px-2.5 py-1 rounded-full animate-fade-in">
                                            <CheckCircleFilled /> 已保存
                                        </span>
                                    )}
                                    <Button type="text" size="small" className="text-gray-400 hover:text-[#7150ff]">
                                        {isMarketingCopyCollapsed ? '展开' : '收起'}
                                    </Button>
                                </div>
                            </div>

                            {isMarketingCopyCollapsed && asset?.prompt && (
                                <div
                                    className="px-6 py-3 text-gray-500 text-sm line-clamp-2 cursor-pointer hover:bg-gray-50 transition-colors border-b border-transparent hover:border-gray-50"
                                    onClick={() => setIsMarketingCopyCollapsed(false)}
                                >
                                    {asset.prompt}
                                </div>
                            )}

                            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isMarketingCopyCollapsed ? 'max-h-0 opacity-0' : 'max-h-[800px] opacity-100'}`}>
                                <div className="p-6">
                                    {asset?.prompt ? (
                                        <div className="animate-fade-in">
                                            <CompositionInput
                                                textarea
                                                disabled={asset?.promptGenerating}
                                                rows={12}
                                                size="large"
                                                value={asset?.prompt}
                                                onChangeText={(e) => onPromptChange(e)}
                                                placeholder="AI 生成的文案将显示在这里..."
                                            />
                                        </div>
                                    ) : (
                                        <div className="py-12 text-center bg-gray-50/50 rounded-xl border-2 border-dashed border-gray-100 group-hover:border-[#7150ff]/20 transition-colors duration-300">
                                            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-4 text-gray-300 group-hover:text-[#7150ff] group-hover:scale-110 transition-all duration-300">
                                                <EditOutlined className="text-2xl" />
                                            </div>
                                            <p className="text-gray-500 font-medium">点击上方按钮生成营销文案</p>
                                            <p className="text-xs text-gray-400 mt-1">AI 正在准备中...</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* Bottom Action Bar */}

                <div className="border-t border-gray-100 bg-white/80 backdrop-blur-xl px-8 py-5 flex-shrink-0 z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
                    <div className="max-w-[800px] mx-auto flex gap-4">
                        <Button
                            size="large"
                            type="primary"
                            loading={submitting}
                            icon={!submitting && <CheckCircleFilled />}
                            disabled={!(asset?.commodity && asset?.prompt && asset?.status === 'promptGenerated')}
                            onClick={onCreate}
                            className="!h-12 !rounded-xl !text-base !font-bold !text-white !bg-gradient-to-r from-[#7150ff] to-[#5a3bc4] hover:!from-[#7150ff]/90 hover:!to-[#5a3bc4]/90 border-none shadow-lg shadow-[#7150ff]/20 hover:shadow-[#7150ff]/30 hover:-translate-y-0.5 disabled:!bg-gray-100 disabled:!from-gray-100 disabled:!to-gray-100 disabled:!text-gray-400 disabled:!shadow-none disabled:!translate-y-0 transition-all duration-300 flex-1"
                        >
                            {submitting ? '正在生成视频...' : <div className="flex items-center gap-2">
                                <span>开始生成视频</span>
                                <div className="w-[1px] h-3 bg-white/30"></div>
                                <Credit value={creditCostAsset} color="#fff" />
                            </div>}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default AssetCreator2;
