import React, { useState, useMemo } from "react";
import ImageComponent from "@/components/Image";
import { Button } from "antd";
import {
    ClockCircleOutlined,
    LoadingOutlined,
    CheckCircleOutlined,
    PlusOutlined,
    ReloadOutlined,
    PictureOutlined,
    EditOutlined,
    ExclamationCircleOutlined
} from "@ant-design/icons";
import KeyFrameEditorModal from "./components/KeyFrameEditorModal";

interface Frame {
    url?: string;
    desc?: string;
    status?: 'waiting' | 'running' | 'done' | 'failed';
    prompt?: string;
    refs?: string[];
    error?: string;
}

interface KeyFramesJobProps {
    job: any;
    data: {
        frames: Frame[];
        review?: {
            pass: boolean;
            desc?: string;
        };
    };
    asset: any;
    onRefresh: () => void;
    editable?: boolean;
}

const FrameItem = React.memo(({
    frame,
    index,
    editable,
    label,
    onEdit
}: {
    frame: Frame;
    index: number;
    editable?: boolean;
    label: string;
    onEdit: (index: number) => void;
}) => {
    const isRunning = frame.status?.toLowerCase() === 'running';
    const isFailed = frame.status?.toLowerCase() === 'failed';

    return (
        <div
            className={`flex-1 min-w-[180px] flex flex-col rounded-xl border ${isFailed ? 'border-red-100 bg-red-50/20' : 'border-gray-100'} overflow-hidden group/frame ${isRunning ? 'opacity-90' : ''} cursor-pointer`}
            onClick={() => editable && onEdit(index)}
        >
            <div className="relative aspect-[9/16] bg-gray-50 overflow-hidden">
                {frame.url && !isFailed ? (
                    <div className="absolute inset-0">
                        <ImageComponent
                            src={frame.url}
                            className="object-cover w-full h-full transition-transform duration-700 group-hover/frame:scale-110"
                            rootClassName="w-full h-full"
                            alt={`${label} ${index}`}
                            preview={{
                                mask: (
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        {editable && (
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onEdit(index);
                                                }}
                                                className="flex items-center gap-1.5 px-3 py-1 bg-primary rounded-full text-white text-[10px] font-bold hover:bg-primary/80 transition-colors"
                                            >
                                                <EditOutlined /> 编辑
                                            </div>
                                        )}
                                    </div>
                                )
                            }}
                        />
                    </div>
                ) : (
                    <div
                        className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4"
                    >
                        {isRunning ? (
                            <ReloadOutlined className="text-[#7150ff] text-base animate-spin" />
                        ) : isFailed ? (
                            <>
                                <ExclamationCircleOutlined className="text-red-500 text-xl" />
                                <span className="text-[10px] text-red-500 font-bold">生成失败</span>
                                {frame.error && (
                                    <span className="text-[9px] text-red-400 text-center line-clamp-3 leading-tight">
                                        {frame.error}
                                    </span>
                                )}
                            </>
                        ) : (
                            <PlusOutlined className="text-lg text-gray-200" />
                        )}
                    </div>
                )}

                {/* Label */}
                <div className={`absolute top-2 ${label === '起始帧' ? 'left-2' : 'right-2'} z-10`}>
                    <div className={`px-2 py-0.5 rounded-md ${label === '起始帧' ? 'bg-green-500/90' : 'bg-blue-500/90'} backdrop-blur-sm text-white text-[9px] font-bold border border-white/20`}>
                        {label}
                    </div>
                </div>
            </div>
        </div>
    );
});

const KeyFramesJob: React.FC<KeyFramesJobProps> = ({ job, data, asset, onRefresh, editable }) => {
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

    const framePairs = useMemo(() => {
        if (!data?.frames) return [];
        const pairs: [Frame, Frame | null][] = [];
        for (let i = 0; i < data.frames.length; i += 2) {
            pairs.push([data.frames[i], data.frames[i + 1] || null]);
        }
        return pairs;
    }, [data?.frames]);

    if (!data?.frames || data.frames.length === 0) return <></>;

    return (
        <div className="flex flex-col gap-4 mt-4">
            {data?.review && (
                <div className={`mx-1 p-4 rounded-2xl border ${data.review.pass ? 'bg-green-50/50 border-green-100' : 'bg-red-50/50 border-red-100'} flex items-start gap-3 transition-all duration-300`}>
                    <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center ${data.review.pass ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {data.review.pass ? (
                            <CheckCircleOutlined className="text-sm" />
                        ) : (
                            <ExclamationCircleOutlined className="text-sm" />
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className={`text-sm font-bold ${data.review.pass ? 'text-green-800' : 'text-red-800'}`}>
                            审核{data.review.pass ? '通过' : '未通过'}
                        </div>
                        {data.review.desc && (
                            <div className={`text-xs mt-1 leading-relaxed ${data.review.pass ? 'text-green-700/70' : 'text-red-700/70'} break-words`}>
                                {data.review.desc}
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide snap-x snap-mandatory px-1">
                {framePairs.map((pair, pairIndex) => {
                    const [startFrame, endFrame] = pair;
                    const startIdx = pairIndex * 2;
                    const endIdx = pairIndex * 2 + 1;

                    return (
                        <div
                            key={pairIndex}
                            className="flex-shrink-0 snap-start flex flex-col bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all duration-500 overflow-hidden"
                        >
                            {/* Pair Header */}
                            <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50/50">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <span className="text-primary text-[10px] font-black">#{pairIndex + 1}</span>
                                    </div>
                                    <span className="text-xs font-bold text-gray-600">视频片段</span>
                                </div>
                            </div>

                            {/* Frame Pair Container */}
                            <div className="flex gap-2 p-4">
                                <FrameItem
                                    frame={startFrame}
                                    index={startIdx}
                                    editable={editable}
                                    label="起始帧"
                                    onEdit={setSelectedIdx}
                                />
                                {endFrame && (
                                    <FrameItem
                                        frame={endFrame}
                                        index={endIdx}
                                        editable={editable}
                                        label="结束帧"
                                        onEdit={setSelectedIdx}
                                    />
                                )}
                            </div>
                        </div>
                    );
                })}

                {/* Isolated Operation Panel */}
                <KeyFrameEditorModal
                    job={job}
                    open={selectedIdx !== null}
                    onClose={() => setSelectedIdx(null)}
                    frame={selectedIdx !== null ? data.frames[selectedIdx] : null}
                    index={selectedIdx}
                    asset={asset}
                    onRefresh={() => {
                        onRefresh();
                        setSelectedIdx(null);
                    }}
                />
            </div>
        </div>
    );
};

export default React.memo(KeyFramesJob);
