import { Asset } from "@/types";
import { useMediaCacheFn } from "@/hooks/useMediaCache";
import { CheckCircleFilled, ClockCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { cn } from "@/utils/index";
import { assetWorkflowJobConfig } from "@/consts";
import { Typography } from "antd";
import AssetRemark from "./components/AssetRemark";
import AssetDeleteAction from "./components/AssetDeleteAction";

const formatJobName = (name: string) => name.replace('Job', '').replace(/([A-Z])/g, ' $1').trim();

// Map Tailwind text colors to Hex for inline styles (avoiding JIT purging issues)
const colorMap: Record<string, string> = {
    'text-green-500': '#22c55e',
    'text-emerald-500': '#10b981',
    'text-blue-500': '#3b82f6',
    'text-yellow-500': '#eab308',
    'text-amber-500': '#f59e0b',
    'text-red-500': '#ef4444',
};

const WorkflowAssetItem = ({ x, onUpdate }: { x: Asset, onUpdate?: (newItem?: any) => void }) => {
    const cached = useMediaCacheFn();
    const workflow = x.workflow;

    if (!workflow) return null;

    // Prioritize asset cover, then commodity cover, then commodity images/medias
    const coverUrl = x.coverUrl ||
        x.commodity?.coverUrl ||
        x.commodity?.images?.[0] ||
        x.commodity?.medias?.[0]?.url;

    return (
        <a
            href={`/asset-detail/${x._id}`}
            // Preserving user's aspect-[9/16]
            className="group relative block w-full aspect-[9/16] rounded-2xl overflow-hidden bg-[#0f0f11] border border-white/5 shadow-lg hover:shadow-2xl hover:border-white/10 transition-all duration-300 ring-1 ring-white/5"
        >
            {/* 1. Dynamic Background */}
            <div className="absolute inset-0 z-0">
                {coverUrl ? (
                    <>
                        <img
                            src={cached(coverUrl)}
                            alt="bg"
                            className="w-full h-full object-cover opacity-100 transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Bottom-only gradient mask, ensuring top is clear */}
                        <div className="absolute bottom-0 left-0 right-0 h-[70%] bg-gradient-to-t from-black via-black/90 to-transparent" />
                        <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </>
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1e1e24] via-[#15151a] to-[#0a0a0a]" />
                )}
            </div>

            {/* Remark Overlay */}
            <AssetRemark asset={x} onUpdate={onUpdate || (() => {})} isOverlay />

            <AssetDeleteAction asset={x} onUpdate={onUpdate || (() => {})} className="absolute top-3 right-3" />

            {/* 2. Content Layer - Flex Col with mt-auto to push everything down */}
            <div className="relative z-10 h-full flex flex-col p-5">

                {/* Spacer to push content to bottom */}
                <div className="flex-1" />

                {/* Bottom Content Container */}
                <div className="flex flex-col gap-4">

                    {/* Header (Title & Status) */}
                    <div className="flex items-center justify-between">
                        {/* Header Removed per design */}
                        <div />

                        {/* <div className={cn(
                            "px-2 py-0.5 rounded-full text-[10px] font-medium border backdrop-blur-md",
                            x.status === 'completed'
                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                : "bg-[#7150ff]/10 border-[#7150ff]/20 text-[#9e86ff]"
                        )}>
                            {x.status === 'completed' ? '已完成' : '运行中'}
                        </div> */}
                    </div>

                    {/* Timeline */}
                    <div className="relative"> {/* Removed pl-1 to fix misalignment between absolute line and flex items */}
                        {/* Vertical Guide Line Background */}
                        <div className="absolute left-[9px] top-2 bottom-2 w-[2px] bg-white/10 rounded-full" />

                        {workflow?.jobs?.map((job, i) => {
                            const isCompleted = job.status === 'completed';
                            const isRunning = job.status === 'running';
                            const isConfirming = job.status === 'confirming';

                            // Get config from consts
                            const config = assetWorkflowJobConfig[job.name as keyof typeof assetWorkflowJobConfig];
                            const label = config?.label || formatJobName(job.name);

                            // Get status config
                            const statusDetails = isCompleted
                                ? config?.status?.completed
                                : isRunning
                                    ? config?.status?.running
                                    : isConfirming
                                        ? config?.status?.confirming
                                        : config?.status?.waiting;

                            const textColorClass = statusDetails?.color || 'text-white/40';
                            // Resolve hex color for backgrounds to be safe
                            const safeColor = colorMap[textColorClass] || (isCompleted ? '#10b981' : isRunning ? '#3b82f6' : isConfirming ? '#eab308' : '#ffffff');

                            return (
                                <div key={i} className="flex items-start gap-4 relative mb-3 last:mb-0 group/step">
                                    {/* Connector Line (Active) - Make it THICKER and BRIGHTER */}
                                    {i < workflow.jobs.length - 1 && isCompleted && (
                                        <div
                                            className="absolute left-[9px] top-3 h-[calc(100%+8px)] w-[2px] z-0 rounded-full opacity-80"
                                            style={{ backgroundColor: safeColor }}
                                        />
                                    )}

                                    {/* Dot / Indicator */}
                                    <div
                                        className={cn(
                                            "relative w-5 h-5 flex items-center justify-center shrink-0 rounded-full z-10 transition-all duration-300",
                                            isCompleted ? "text-white shadow-[0_0_12px_rgba(0,0,0,0.5)] scale-100" :
                                                (isRunning || isConfirming) ? "border-2" :
                                                    "bg-[#1a1a1a] border border-white/20"
                                        )}
                                        style={
                                            isCompleted ? { backgroundColor: safeColor } :
                                                (isRunning || isConfirming) ? { borderColor: safeColor, backgroundColor: '#0f0f11' } :
                                                    undefined
                                        }
                                    >
                                        {isCompleted && <CheckCircleFilled style={{ fontSize: 10, color: '#fff' }} />}
                                        {(isRunning || isConfirming) && (
                                            <div
                                                className="w-2 h-2 rounded-full animate-pulse"
                                                style={{ backgroundColor: safeColor }}
                                            />
                                        )}
                                        {!isCompleted && !isRunning && !isConfirming && <div className="w-1.5 h-1.5 rounded-full bg-white/20" />}
                                    </div>

                                    {/* Text Content */}
                                    <div className={cn(
                                        "flex flex-col mt-0.5 transition-all duration-300", // Changed -mt-0.5 to mt-0.5 for better vertical alignment
                                        isRunning ? "opacity-100" :
                                            isCompleted ? "opacity-90" :
                                                "opacity-60"
                                    )}>
                                        <span className={cn(
                                            "text-xs font-bold",
                                            isRunning ? "text-white" : "text-white/90"
                                        )}>
                                            {label}
                                        </span>

                                        {statusDetails?.name && (
                                            <span
                                                className={cn("text-[10px] font-medium mt-0.5",
                                                    isRunning ? "animate-pulse" : "",
                                                )}
                                                style={{ color: safeColor }}
                                            >
                                                {statusDetails.name}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-3">
                        <div className="flex items-center gap-1.5 text-[10px] text-white font-mono opacity-60">
                            <ClockCircleOutlined />
                            <span>{dayjs(Number(x.createdAt || Date.now() / 1000) * 1000).format("MM-DD HH:mm")}</span>
                        </div>

                        {/* Commodity Thumbnail */}
                        {x.commodity && (
                            <div className="flex items-center gap-2 group/commodity z-20">
                                <div className="w-8 h-8 rounded-md overflow-hidden border border-white/10 bg-white/5 shadow-sm group-hover/commodity:border-white/30 transition-colors">
                                    <img
                                        src={cached(x.commodity.coverUrl || x.commodity.images?.[0] || x.commodity.medias?.[0]?.url)}
                                        alt="commodity"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Interactive Hover Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#7150ff]/20 to-emerald-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none z-[-1]" />
        </a>
    )
}

export default WorkflowAssetItem;