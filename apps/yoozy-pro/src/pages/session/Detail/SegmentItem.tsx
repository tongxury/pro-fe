import React from "react";
import { Tag, Collapse, Typography, Divider, Popover, Upload, message, Modal } from "antd";
import Image from "@/components/Image";
import classNames from "classnames";
import { PlayCircleFilled, ThunderboltFilled, ArrowRightOutlined, RocketOutlined, CameraOutlined, BuildOutlined, HighlightOutlined, AudioOutlined, LoadingOutlined, CloudUploadOutlined, FolderOpenOutlined, ExperimentOutlined, InfoCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import VideoSegment from "@/components/VideoSegment";
import { upload } from "@/utils/upload/tos";
import { useState } from "react";
import Uploader from "@/components/UploaderV6";
import getVideoCover from "@/utils/file";
import { createAssetV2, createAssetV5 } from "@/api/asset";
import { updateSessionSegmentAsset } from "@/api/session";
import AssetSelector from "@/pages/asset/Selector";
import { Commodity } from "@/types";
import { useRouter } from "@/hooks/useRouter";


const { Paragraph, Text } = Typography;
const { Panel } = Collapse;

interface SegmentItemProps {
    sessionSegment: any;
    commodity: Commodity;
    index: number;
    refresh: () => void;
    editable?: boolean;
}

const SegmentItem: React.FC<SegmentItemProps> = ({ sessionSegment, commodity, index, refresh, editable }) => {

    const router = useRouter();

    const segment = sessionSegment?.segment;
    // Safely access targetChance from safe session navigation or fallback
    const targetChance = sessionSegment?.session?.targetChance;

    const [uploading, setUploading] = useState(false);
    const [showAssetSelector, setShowAssetSelector] = useState(false);

    const handleUpload = async (options: any) => {
        const { file, onSuccess, onError } = options;
        setUploading(true);
        try {
            const url = await upload(file);

            const coverFile = await getVideoCover(file);
            const coverUrl = await upload(coverFile);
            onSuccess(url);

            const res = await createAssetV5({
                url,
                coverUrl,
            })

            console.log(res)


            await updateSessionSegmentAsset({
                id: sessionSegment._id,
                assetId: res.data?._id,
            })

            refresh()
            message.success('上传成功');
            console.log('Uploaded Video URL:', url);
            // TODO: Handle the uploaded URL (e.g., update segment state)
        } catch (error) {
            console.error(error);
            onError(error);
            message.error('上传失败');
        } finally {
            setUploading(false);
        }
    };

    const handleSelectAsset = async (asset: any) => {
        try {
            await updateSessionSegmentAsset({
                id: sessionSegment._id,
                assetId: asset._id,
            });
            message.success('替换成功');
            setShowAssetSelector(false);
            refresh();
        } catch (error) {
            console.error(error);
            message.error('替换失败');
        }
    };

    const handleAIGenerate = () => {
        Modal.confirm({
            title: '创建 AI 视频生成任务',
            icon: <ExclamationCircleOutlined />,
            content: '我们会帮你根据当前的口播文案和关键帧画面 创建一个生成视频的任务，生成完成后 您可以点击 "素材" 选择',
            okText: '确定',
            cancelText: '取消',
            async onOk() {
                // TODO: Trigger actual generation task API
                console.log('Create generation task for segment:', sessionSegment._id);

                const res = await createAssetV2({
                    commodityId: commodity?._id,
                    segment: sessionSegment.segment,
                    initialData: {
                        keyFrames: sessionSegment?.keyFrames,
                    }
                })

                router.push(`/asset-detail/${res.data?._id}`)

                // /asset-detail/6957a5497fdee236b2bfa18a
            },
        });
    };

    const renderTypedTags = (typedTags: any) => {
        if (!typedTags) return null;
        return (
            <div className="flex flex-col gap-1">
                {Object.entries(typedTags).map(([key, tags]: [string, any]) => {
                    if (!tags || tags.length === 0) return null;
                    let label = key;
                    let color = "blue";
                    switch (key) {
                        case 'focusOn': label = "侧重点"; color = "magenta"; break;
                        case 'text': label = "花字"; color = "cyan"; break;
                        case 'person': label = "人物"; color = "geekblue"; break;
                        case 'action': label = "动作"; color = "gold"; break;
                        case 'picture': label = "画面"; color = "orange"; break;
                        case 'scene': label = "场景"; color = "lime"; break;
                        case 'shootingStyle': label = "运镜"; color = "purple"; break;
                        case 'emotion': label = "情绪"; color = "red"; break;
                    }

                    return (
                        <div key={key} className="flex flex-wrap gap-1 items-center">
                            <span className="text-[10px] text-gray-400 mr-1">{label}:</span>
                            {tags.map((tag: string, i: number) => (
                                <Tag key={i} color={color} className="mr-0 text-[10px] px-1 py-0 border-0 bg-opacity-10 opacity-80">
                                    {tag}
                                </Tag>
                            ))}
                        </div>
                    );
                })}
            </div>
        )
    }

    const infoContent = (
        <div className="w-[560px] p-2">
            <div className="mb-3">
                <div className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-blue-400" />
                    原始文案
                </div>
                <Paragraph className="text-[11px] text-gray-500 leading-relaxed mb-0 bg-gray-50/50 p-2.5 rounded-lg border border-gray-100/50">
                    {segment.subtitle || segment.description}
                </Paragraph>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-50">
                {[
                    { label: "风格", value: segment.style },
                    { label: "形式", value: segment.contentStyle },
                    { label: "场景", value: segment.sceneStyle },
                    { label: "运镜", value: segment.shootingStyle },
                ].map((item, i) => item.value && (
                    <div key={i} className="flex flex-col">
                        <span className="text-[8px] font-bold text-gray-300 uppercase">{item.label}</span>
                        <Text className="text-[10px] text-gray-500 font-medium">{item.value}</Text>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 relative group hover:shadow-md transition-shadow">
            {/* Index Badge */}
            <div className="absolute -left-3 -top-3 w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold shadow-lg z-10 border-2 border-white">
                {index + 1}
            </div>

            <div className="flex flex-col lg:flex-row gap-6 items-start">
                {/* 1. Left: Reference (Original Segment) - Compact Popup Style */}
                <div className="shrink-0 flex flex-col gap-4 border-b lg:border-b-0 lg:border-r border-gray-100 pb-6 lg:pb-0 lg:pr-8 relative">
                    <div className="flex items-center justify-between mb-1 px-1">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            <div className="w-1 h-3 bg-blue-500 rounded-full"></div>
                            原始分镜
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 group/video">
                        <div className="relative shrink-0">
                            <VideoSegment
                                className=" w-48 rounded-xl overflow-hidden shadow-sm border border-gray-50 group-hover/video:border-blue-200 transition-colors"
                                url={segment.root?.url}
                                coverUrl={segment.root?.coverUrl}
                                startTime={segment.timeStart}
                                endTime={segment.timeEnd}
                                minimal
                            />
                            <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 bg-black/30 backdrop-blur-md rounded-full text-[8px] text-white/80 font-medium border border-white/5">
                                原始
                            </div>
                        </div>

                        {/* Brief Info Preview - Hover Trigger */}
                        <Popover
                            content={infoContent}
                            placement="rightTop"
                            title={null}
                            overlayClassName="custom-popover"
                            trigger="hover"
                            mouseEnterDelay={0.1}
                        >
                            <div className="w-[200px] space-y-1.5">
                                {/* <Paragraph className="text-[10px] text-gray-400 leading-tight mb-0 line-clamp-2 hover:text-blue-500 transition-colors" title={segment.subtitle || segment.description}>
                                    {segment.subtitle || segment.description}
                                </Paragraph> */}
                                <div className="inline-flex items-center px-1 py-0.5 rounded-md bg-gray-50/50 text-[9px] text-gray-400 font-medium">
                                    查看分镜描述
                                </div>
                            </div>
                        </Popover>
                    </div>

                    {/* Desktop Connector */}
                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 items-center justify-center bg-white border border-gray-100 rounded-full text-gray-300 shadow-sm z-20">
                        <ArrowRightOutlined className="text-[10px]" />
                    </div>
                </div>

                {/* 2. Middle: Intermediate Generation (Subtitle + Keyframes) - Flex-1 */}
                <div className="flex-1 min-w-0 flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-gray-100 pb-6 lg:pb-0 lg:pr-6 relative">
                    {/* Subtitle Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
                            <div className="w-1 h-3 bg-green-500 rounded-full"></div>
                            AI 创作内容
                        </div>
                        <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl p-4 border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.03)] relative overflow-hidden group/script">
                            {sessionSegment.subtitle ? (
                                <div className="relative z-10">
                                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-500 uppercase mb-2">
                                        <BuildOutlined /> 画面脚本
                                    </div>
                                    <Paragraph className="text-gray-800 text-[15px] font-medium leading-relaxed mb-0">
                                        {sessionSegment.subtitle}
                                    </Paragraph>
                                </div>
                            ) : (
                                <div className="relative min-h-[100px] flex flex-col justify-center">
                                    <div className="space-y-3 opacity-40">
                                        <div className="h-4 bg-gray-100 rounded w-full animate-pulse"></div>
                                        <div className="h-4 bg-gray-100 rounded w-5/6 animate-pulse" style={{ animationDelay: '200ms' }}></div>
                                        <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse" style={{ animationDelay: '400ms' }}></div>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-gray-100 shadow-sm">
                                            <LoadingOutlined className="text-blue-500 animate-spin" />
                                            <span className="text-xs font-bold text-gray-500 tracking-wide">AI 正在斟酌文案...</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* Decorative background icon */}
                            {/* <BuildOutlined className="absolute -right-4 -bottom-4 text-6xl text-gray-100/50 -rotate-12 group-hover/script:rotate-0 transition-transform duration-700" /> */}
                        </div>
                    </div>

                    {/* Keyframes Section */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                <div className="w-1 h-3 bg-blue-500 rounded-full"></div>
                                关键帧预览
                            </div>
                            {sessionSegment.keyFrames?.frames && (
                                <div className="text-[10px] text-gray-400 font-medium bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                                    {sessionSegment.keyFrames.frames.length} 帧
                                </div>
                            )}
                        </div>

                        {sessionSegment.keyFrames?.frames && sessionSegment.keyFrames.frames.length > 0 ? (
                            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-1 px-1">
                                {sessionSegment.keyFrames.frames.map((frame: any, idx: number) => (
                                    <div key={idx} className="relative flex-shrink-0 w-32 aspect-[9/16] rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white group/frame cursor-pointer hover:border-blue-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                        <Image
                                            src={frame.url || frame}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover/frame:scale-110"
                                        />
                                        <div className="absolute top-2 left-2 bg-black/60 text-white text-[9px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md opacity-0 group-hover/frame:opacity-100 transition-opacity">
                                            {String(idx + 1).padStart(2, '0')}
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/frame:opacity-100 transition-opacity"></div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="relative">
                                <div className="flex gap-4 overflow-hidden opacity-40">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="flex-shrink-0 w-32 aspect-[9/16] rounded-xl bg-gray-50 border border-dashed border-gray-200 flex flex-col items-center justify-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                                <CameraOutlined className="text-gray-300" />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="w-12 h-1.5 bg-gray-100 rounded mx-auto"></div>
                                                <div className="w-8 h-1.5 bg-gray-100 rounded mx-auto"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-gray-100 shadow-sm">
                                        <LoadingOutlined className="text-blue-500 animate-spin" />
                                        <span className="text-xs font-bold text-gray-500 tracking-wide">AI 正在构思画面...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Desktop Connector */}
                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 items-center justify-center bg-white border border-gray-100 rounded-full text-gray-300 shadow-sm z-10">
                        <ArrowRightOutlined className="text-[10px]" />
                    </div>
                </div>

                {/* 3. Right: Final Video - Compact */}
                <div className="w-full lg:w-[240px] shrink-0 flex flex-col gap-4">
                    <div className="flex items-center gap-2 mb-1 text-xs font-bold text-gray-400 uppercase tracking-widest">
                        <div className="w-1 h-3 bg-purple-500 rounded-full"></div>
                        最终成片
                    </div>

                    {sessionSegment.subtitle && sessionSegment.keyFrames?.frames && sessionSegment.keyFrames.frames.length > 0 ? (
                        <div className="flex-1 flex flex-col gap-3">
                            <div className={classNames(
                                "relative w-48 mx-auto aspect-[9/16] bg-gray-50 rounded-2xl flex flex-col items-center justify-center overflow-hidden shadow-sm transition-all group cursor-pointer",
                                sessionSegment.asset
                                    ? "border border-gray-100"
                                    : "border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-white"
                            )}>
                                {sessionSegment.asset ? (
                                    <VideoSegment
                                        className="w-full h-full"
                                        url={sessionSegment.asset.url}
                                        coverUrl={sessionSegment.asset.coverUrl}
                                    />
                                ) : (
                                    <div className="text-center space-y-3 relative z-10 p-4">
                                        <div className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center mx-auto text-blue-500 group-hover:scale-110 transition-transform duration-500">
                                            <PlayCircleFilled className="text-3xl" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-sm font-bold text-gray-700">等待成片</div>
                                            <div className="text-[10px] text-gray-400 leading-tight">点击开始合成</div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Independent Actions Row */}
                            {editable && (
                                <div className="flex justify-center gap-4 px-2">
                                    {/* Local Upload */}
                                    <Upload
                                        accept="video/*"
                                        customRequest={handleUpload}
                                        showUploadList={false}
                                    >
                                        <div className="flex flex-col items-center gap-1.5 cursor-pointer group/btn">
                                            <div className="w-9 h-9 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm group-hover/btn:border-blue-200 group-hover/btn:text-blue-500 transition-all">
                                                {uploading ? <LoadingOutlined /> : <CloudUploadOutlined />}
                                            </div>
                                            <span className="text-[10px] text-gray-400 group-hover/btn:text-gray-600 font-medium whitespace-nowrap">本地</span>
                                        </div>
                                    </Upload>

                                    {/* Asset Library */}
                                    <div
                                        className="flex flex-col items-center gap-1.5 cursor-pointer group/btn"
                                        onClick={() => setShowAssetSelector(true)}
                                    >
                                        <div className="w-9 h-9 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm group-hover/btn:border-blue-200 group-hover/btn:text-blue-500 transition-all">
                                            <FolderOpenOutlined />
                                        </div>
                                        <span className="text-[10px] text-gray-400 group-hover/btn:text-gray-600 font-medium whitespace-nowrap">素材</span>
                                    </div>

                                    {/* AI Generate */}
                                    <div
                                        className="flex flex-col items-center gap-1.5 cursor-pointer group/btn"
                                        onClick={handleAIGenerate}
                                    >
                                        <div className="w-9 h-9 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm group-hover/btn:border-purple-200 group-hover/btn:text-purple-500 transition-all">
                                            <RocketOutlined />
                                        </div>
                                        <span className="text-[10px] text-gray-400 group-hover/btn:text-gray-600 font-medium whitespace-nowrap">AI生成</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200 p-8">
                            <div className="text-center space-y-4">
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto text-gray-200">
                                        <PlayCircleFilled className="text-3xl" />
                                    </div>
                                    <div className="absolute -top-1 -right-1">
                                        <div className="w-3 h-3 bg-gray-200 rounded-full border-2 border-white animate-pulse"></div>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm font-bold text-gray-400">资源未就绪</div>
                                    <div className="text-[10px] text-gray-300 max-w-[120px] mx-auto leading-relaxed">
                                        待 AI 创作脚本与关键帧完成后即可开始合成
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Asset Selector Modal */}
            <Modal
                title="选择素材"
                open={showAssetSelector}
                onCancel={() => setShowAssetSelector(false)}
                footer={null}
                width={1000}
                centered
                destroyOnClose
            >
                <div className="h-[60vh]">
                    <AssetSelector
                        onChange={handleSelectAsset}
                        value={sessionSegment.asset}
                    />
                </div>
            </Modal>
        </div>
    );
};


export default SegmentItem;
