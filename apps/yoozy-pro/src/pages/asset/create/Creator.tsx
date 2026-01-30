import React, { useMemo, useState } from "react";
import { Button, message } from "antd";
import { CheckCircleFilled, EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { Asset, Commodity, Prompts, Segment } from "@/types.ts";
import { createAsset, generatePrompt, getAsset, startGenerating, updatePrompt } from "@/api/asset.ts";
import CommoditySelector from "@/pages/product/Selector.tsx";
import CommodityView from "@/pages/product/CommodityView.tsx";
import VideoSegment from "@/components/VideoSegment";
import { useInterval, useRequest } from "ahooks";
import CompositionInput from "@/components/CompositionInput.tsx";
import Credit from "@/components/Credit";
import { creditCostAsset } from "@/consts";

interface ContentProps {
    baseAssetId?: string;
    segment?: Segment;
    commodity?: Commodity;
    prompts?: Prompts;
    onSuccess?: (id: string) => void;
    onCreated?: (id: string) => void;
}

const AssetCreator: React.FC<ContentProps> = ({ baseAssetId, segment, commodity, prompts, onSuccess, onCreated }) => {

    const [id, setId] = useState<any>();

    const [selectedCommodity, setSelectedCommodity] = useState<any>(commodity);
    const [promptGenerating, setPromptGenerating] = useState<boolean>(false);
    const [tmpPrompt, setTmpPrompt] = useState<string>();
    const [isSaving, setIsSaving] = useState(false);

    const [submitting, setSubmitting] = useState(false);

    const { data, run } = useRequest(() => {
        return id ? getAsset({ id: id }) : undefined
    }, {
        onSuccess: (data, params) => {
            if (data?.data?.prompt) {
                setPromptGenerating(false);
            }
        }
    })

    useInterval(() => {
        run()
    }, promptGenerating ? 5000 : undefined)

    const asset = useMemo<Asset>(() => {
        const d = data?.data
        return {
            ...d,
            segment: segment,
            prompt: tmpPrompt !== undefined ? tmpPrompt : d?.prompt,
            commodity: selectedCommodity || d?.commodity,
            promptGenerating: promptGenerating,
        }
    }, [data, tmpPrompt, selectedCommodity, promptGenerating]);

    const onPromptChange = (text: string) => {

        setTmpPrompt(text)
        const save = async () => {
            setIsSaving(true);
            try {
                await updatePrompt({ id, text: tmpPrompt });
            } finally {
                setIsSaving(false);
            }
        };
        save();
    }


    const generateScript = async () => {

        setPromptGenerating(true)

        const ass = await createAsset({
            // templateId: segment?._id,
            baseAssetId,
            segment: segment,
            prompts,
            commodity: selectedCommodity,
        })


        if (ass?.code) {

            setPromptGenerating(false)
            return
        }


        if (!ass?.data?._id) return;

        onCreated?.(ass?.data?._id)

        setId(ass?.data?._id)

        generatePrompt({ id: ass?.data?._id }).then(res => {
            void message.success(`镜头描述正在生成中，您可以稍后到"资产库"中继续后续步骤`)
        })
    };

    const onCreate = () => {
        setSubmitting(true)
        startGenerating({ id }).then((res) => {
            void message.success(`视频正在生成中，请稍后到"资产库"中查看`)
            onSuccess?.(res?.data?._id);
        }).finally(() => {
            setSubmitting(false)
        })
    }

    return (
        <div className="h-full w-full flex bg-gray-50">
            {/* Left Panel: Video Preview */}
            {/* <div>{JSON.stringify(asset?.segment?._id)}</div> */}
            <VideoSegment
                url={asset?.segment?.root?.url}
                coverUrl={asset?.segment?.root?.coverUrl}
                startTime={asset?.segment?.timeStart}
                endTime={asset?.segment?.timeEnd}
            />

            {/* Right Panel: Create Form */}
            <div className="flex-1 bg-white overflow-hidden relative">
                <div className="flex flex-col h-full bg-white">
                    {/* 主内容区 */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <div className="mx-auto p-8 w-full h-full">
                            {/* 已选商品区域 */}
                            {asset?.commodity ? (
                                <div className="space-y-8 animate-fade-in">
                                    {/* 商品信息卡片 - 精简版 */}
                                    <CommodityView
                                        data={asset?.commodity}
                                    />

                                    {/* AI 营销文案卡片 */}
                                    <div
                                        className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                                        <div
                                            className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <CheckCircleFilled className="text-green-500 text-lg" />
                                                <span className="font-semibold text-gray-800">画面复刻</span>
                                                {isSaving && (
                                                    <span
                                                        className="text-xs text-gray-400 flex items-center gap-1 ml-2 animate-fade-in">
                                                        <LoadingOutlined /> 保存中...
                                                    </span>
                                                )}
                                                {!isSaving && tmpPrompt !== undefined && tmpPrompt !== asset?.prompt && (
                                                    <span
                                                        className="text-xs text-green-500 flex items-center gap-1 ml-2 animate-fade-in">
                                                        <CheckCircleFilled /> 已保存
                                                    </span>
                                                )}
                                            </div>


                                            {!asset?.prompt && (
                                                <Button
                                                    type="primary"
                                                    onClick={generateScript}
                                                    loading={asset?.promptGenerating}
                                                    className="!bg-gradient-to-r from-green-500 to-emerald-500 border-none shadow-md shadow-green-100"
                                                >
                                                    生成镜头描述
                                                </Button>
                                            )}
                                        </div>
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
                                                        // className="!bg-gray-50 !border-gray-100 hover:!border-green-300 focus:!border-green-500 !rounded-xl !text-gray-700 !text-base !p-4 transition-all duration-300"
                                                        placeholder="AI 生成的文案将显示在这里..."
                                                    />
                                                </div>
                                            ) : (
                                                <div
                                                    className="py-8 text-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                                    <div className="mb-2">
                                                        <EditOutlined className="text-2xl opacity-50" />
                                                    </div>
                                                    <p>点击上方按钮生成镜头描述</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                /* 商品选择区域 */
                                <CommoditySelector
                                    value={selectedCommodity}
                                    onChange={(commodity) => setSelectedCommodity(commodity)}
                                />
                            )}
                        </div>
                    </div>

                    {/* 底部操作按钮 */}
                    <div
                        className="border-t border-gray-100 bg-white/80 backdrop-blur-md px-8 py-6 sticky bottom-0 z-10">
                        <div className="max-w-[800px] mx-auto flex gap-4">
                            <Button
                                size="large"
                                type="primary"
                                loading={submitting}
                                icon={<CheckCircleFilled />}
                                disabled={!(asset?.commodity && asset?.prompt && asset?.status === 'promptGenerated')}
                                onClick={onCreate}
                                className="!h-12 !rounded-xl !font-medium !text-white !bg-gradient-to-r from-[#7150ff] to-[#5a3bc4] hover:!from-[#7150ff]/90 hover:!to-[#5a3bc4]/90 border-none shadow-lg shadow-[#7150ff]/20 disabled:!bg-gray-100 disabled:!from-gray-100 disabled:!to-gray-100 disabled:!text-gray-400 disabled:!shadow-none disabled:!translate-y-0 flex-1"
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
        </div>
    );
};


export default AssetCreator;
