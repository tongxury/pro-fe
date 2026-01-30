import { useMediaCacheFn } from "@/hooks/useMediaCache";
import { Asset } from "@/types";
import { formatDuration } from "@/utils";
import { CheckCircleFilled, ExclamationCircleOutlined, LoadingOutlined, StarFilled, HourglassOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import dayjs from "dayjs";
import AssetRemark from "../components/AssetRemark";
import AssetDeleteAction from "../components/AssetDeleteAction";

const AssetView: React.FC<{ x: Asset, onUpdate?: (newItem?: any) => void }> = ({ x, onUpdate }) => {

    const cached = useMediaCacheFn();

    const status = x?.status;

    // State flags
    const isPromptGenerating = status === 'promptGenerating';
    const isPromptGenerated = status === 'promptGenerated';
    const isGenerating = status === 'generating' || status === 'created';
    const isCompleted = status === 'completed';
    const isFailed = status === 'failed';

    // 获取背景图
    // const backgroundImage = x.commodity?.medias?.[0]?.url || x.commodity?.images?.[0];
    // 封面图（如果存在）
    const coverUrl = x?.coverUrl;

    const spentTime = x?.extra?.completedAt ? dayjs(x?.extra?.completedAt * 1000).diff(dayjs(x?.createdAt * 1000), 'minute') : 0;

    return <div className="group relative cursor-pointer">
        <div
            className="aspect-[9/9] w-full overflow-hidden rounded-xl bg-gray-100 relative shadow-sm hover:shadow-md transition-all duration-300">
            {/* 图片 */}
            <img
                src={cached(coverUrl)}
                // src={coverUrl}f
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* 渐变遮罩 */}
            <div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />

            {/* Remark Overlay */}
            <AssetRemark asset={x} onUpdate={onUpdate || (() => {})} isOverlay />

            <AssetDeleteAction asset={x} onUpdate={onUpdate || (() => {})} className="absolute top-3 right-3" />

            {/* 生成中遮罩 */}
            {(isGenerating || isPromptGenerating) && (
                <div className="absolute inset-0 bg-black/40 z-10 transition-all duration-300 backdrop-blur-[2px] flex items-center justify-center">
                    <div className="flex flex-col items-center animate-fade-in mx-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center mb-2 shadow-inner border border-white/10">
                            <HourglassOutlined className="text-white text-base animate-pulse" />
                        </div>
                        <div className="text-white text-xs font-bold tracking-wide">
                            预计 <span className="text-[#a18aff]">20分钟</span>
                        </div>

                        {
                            x?.extra?.context?.status === 'queued' &&
                            <div className="text-white/60 text-[10px] mt-0.5 scale-90 font-medium">
                                正在排队中，请耐心等待
                            </div>
                        }

                        {
                            x?.extra?.context?.status === 'running' &&
                            <div className="text-white/60 text-[10px] mt-0.5 scale-90 font-medium">
                                正在极速生成中
                            </div>
                        }


                    </div>
                </div>
            )}

            {/* 收藏角标 */}
            {x?.favorite && (
                <div
                    className="absolute top-12 right-2.5 px-1.5 py-1 rounded-md z-10">
                    <StarFilled style={{ color: '#faad14', fontSize: 20 }} />
                </div>
            )}

            {/* 状态标签 (Tags) */}
            <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
                {/* 文案生成中 */}
                {isPromptGenerating && (
                    <div
                        className="px-2.5 py-1 rounded-lg bg-[#7150ff]/90 backdrop-blur-md border border-[#7150ff]/30 shadow-lg shadow-[#7150ff]/20 flex items-center gap-1.5 animate-fade-in">
                        <Spin indicator={<LoadingOutlined
                            style={{ fontSize: 12, color: '#fff' }} spin />} />
                        <span
                            className="text-white text-xs font-medium">文案生成中 </span>
                    </div>
                )}

                {/* 文案已生成 */}
                {isPromptGenerated && (
                    <div
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/90 backdrop-blur-md border border-emerald-400/30 shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 animate-fade-in">
                        <CheckCircleFilled className="text-white text-xs" />
                        <span
                            className="text-white text-xs font-medium">文案已生成</span>
                    </div>
                )}

                {/* 视频生成中 */}
                {isGenerating && (
                    <div
                        className="px-2.5 py-1 rounded-lg bg-[#7150ff]/90 backdrop-blur-md border border-[#7150ff]/30 shadow-lg shadow-[#7150ff]/20 flex items-center gap-1.5 animate-fade-in">
                        <Spin indicator={<LoadingOutlined
                            style={{ fontSize: 12, color: '#fff' }} spin />} />
                        <span
                            className="text-white text-xs font-medium">视频生成中</span>
                    </div>
                )}

                {/* 生成失败 */}
                {isFailed && (
                    <div
                        className="px-2.5 py-1 rounded-lg bg-red-500/90 backdrop-blur-md border border-red-400/30 shadow-lg shadow-red-500/20 flex items-center gap-1.5 animate-fade-in">
                        <ExclamationCircleOutlined className="text-white text-xs" />
                        <span
                            className="text-white text-xs font-medium">生成失败</span>
                    </div>
                )}
            </div>

            {/* 创建时间 - 仅在 hover 时显示 */}
            {x?.createdAt && (
                <div className="absolute left-3 bottom-3 flex flex-col gap-1">
                    {spentTime > 0 && (
                        <div className="px-2 py-1 rounded-md bg-black/30 backdrop-blur-sm text-white text-xs font-medium w-fit">
                            耗时 {spentTime} 分钟
                        </div>
                    )}
                    <div
                        className="px-2 py-1 rounded-md bg-black/30 backdrop-blur-sm text-white text-xs font-medium w-fit">
                        {dayjs(x.createdAt * 1000).format('YYYY-MM-DD HH:mm')}
                    </div>
                </div>
            )}

            {/* 时长标签 - 仅处理完成时显示 */}
            {isCompleted && x?.duration && (
                <div
                    className="absolute right-2 bottom-2 px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
                    {formatDuration(x?.duration || 0)}
                </div>
            )}
        </div>
    </div>

}

export default AssetView;