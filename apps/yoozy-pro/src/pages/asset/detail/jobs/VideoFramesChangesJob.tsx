import React from "react";
import Image from "@/components/Image";
import { ArrowRightOutlined } from "@ant-design/icons";

interface VideoFramesChangesJobProps {
    data: any[];
    editable?: boolean;
}

const FrameItem = React.memo(({ 
    item, 
    index 
}: { 
    item: any; 
    index: number; 
}) => {
    return (
        <div className="flex-shrink-0 min-w-max snap-center group bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden">
                    {/* Header */}
                    <div className="px-5 py-3 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                            <span className="text-xs font-bold text-gray-700 font-mono tracking-tight">片段 #{index + 1}</span>
                        </div>
                    </div>

                    <div className="p-5">
                        <div className="flex flex-row gap-6 items-stretch">

                            {/* 1. Reference (Input) */}
                            {item.ref && (
                                <div className="w-24 flex-shrink-0 flex flex-col">
                                    <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-2">视觉参考</div>
                                    <Image
                                        src={item.ref}
                                        className="w-full h-auto !rounded-xl border border-gray-100 shadow-sm"
                                    />
                                </div>
                            )}

                            {/* Divider */}
                            <div className="w-px bg-gradient-to-b from-transparent via-gray-100 to-transparent"></div>

                            {/* 2. Transformation Flow */}
                            <div className="flex-1 grid grid-cols-[auto,auto,auto] gap-4 items-center">

                                {/* Original */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">原始画面</div>
                                    </div>
                                    <div className="p-2 bg-gray-50 rounded-xl border border-gray-100/50 space-y-2 inline-block">
                                        <div className="grid grid-cols-2 gap-2 w-[200px]">
                                            <div className="aspect-[9/16] bg-gray-200 rounded-lg overflow-hidden relative">
                                                <Image
                                                    src={item.firstFrame}
                                                    className="object-cover w-full h-full opacity-90"
                                                    rootClassName="absolute inset-0 w-full h-full"
                                                />
                                                <div className="absolute top-1 left-1 bg-black/40 backdrop-blur-md rounded px-1.5 py-0.5 text-[8px] font-medium text-white pointer-events-none z-10">START</div>
                                            </div>
                                            <div className="aspect-[9/16] bg-gray-200 rounded-lg overflow-hidden relative">
                                                <Image
                                                    src={item.lastFrame}
                                                    className="object-cover w-full h-full opacity-90"
                                                    rootClassName="absolute inset-0 w-full h-full"
                                                />
                                                <div className="absolute top-1 left-1 bg-black/40 backdrop-blur-md rounded px-1.5 py-0.5 text-[8px] font-medium text-white pointer-events-none z-10">END</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Arrow / Operator */}
                                <div className="flex justify-center text-gray-300 px-2">
                                    <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shadow-sm">
                                        <ArrowRightOutlined className="text-xs text-gray-400" />
                                    </div>
                                </div>

                                {/* Result (AI) */}
                                <div className="space-y-2 relative">
                                    <div className="flex justify-between items-end">
                                        <div className="text-[10px] uppercase tracking-wider text-purple-600 font-bold flex items-center gap-1">
                                            AI 重绘
                                            <span className="w-1 h-1 rounded-full bg-purple-500 animate-pulse"></span>
                                        </div>
                                    </div>

                                    {/* Glow Effect Background */}
                                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-100/50 to-blue-100/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    <div className="relative p-2 bg-white rounded-xl border border-purple-100 shadow-sm space-y-2 ring-1 ring-purple-50 group-hover:ring-purple-100 transition-all inline-block">
                                        <div className="grid grid-cols-2 gap-2 w-[200px]">
                                            <div className="aspect-[9/16] bg-purple-50 rounded-lg overflow-hidden relative shadow-inner">
                                                <Image
                                                    src={item.newFirstFrame}
                                                    className="object-cover w-full h-full"
                                                    rootClassName="absolute inset-0 w-full h-full"
                                                />
                                                <div className="absolute top-1 left-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded px-1.5 py-0.5 text-[8px] font-bold shadow-sm pointer-events-none z-10">START</div>
                                            </div>
                                            <div className="aspect-[9/16] bg-purple-50 rounded-lg overflow-hidden relative shadow-inner">
                                                <Image
                                                    src={item.newLastFrame}
                                                    className="object-cover w-full h-full"
                                                    rootClassName="absolute inset-0 w-full h-full"
                                                />
                                                <div className="absolute top-1 left-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded px-1.5 py-0.5 text-[8px] font-bold shadow-sm pointer-events-none z-10">END</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
    );
});

const VideoFramesChangesJob: React.FC<VideoFramesChangesJobProps> = ({ data, editable }) => {
    if (!data) return null;

    return (
        <div className="mt-4 flex overflow-x-auto pb-4 gap-4 snap-x">
            {data.map((item: any, index: number) => (
                <FrameItem key={index} item={item} index={index} />
            ))}
        </div>
    );
};

export default React.memo(VideoFramesChangesJob);

