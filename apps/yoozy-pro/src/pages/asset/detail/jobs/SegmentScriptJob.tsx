import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Input, message } from "antd";
import { ClockCircleOutlined, EditOutlined } from "@ant-design/icons";
import { updateWorkflowJob } from "@/api/workflow";
import { useDebounceEffect } from "ahooks";
import classNames from "classnames";

interface SegmentScriptJobProps {
    data: {
        segments?: any[];
        script?: string;
    };
    asset: any;
    job: any;
    onRefresh: () => void;
    editable?: boolean;
}

const EMPTY_ARRAY: any[] = [];

const SegmentItem = React.memo(({ 
    segment, 
    index, 
    editable, 
    onSubtitleChange, 
    onFocus 
}: { 
    segment: any; 
    index: number; 
    editable?: boolean; 
    onSubtitleChange: (index: number, value: string) => void;
    onFocus: (index: number) => void;
}) => {
        return (
        <div className="flex-shrink-0 w-[400px] snap-start bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
                        {/* Header: Style & Index */}
                        <div className="bg-gray-50/50 px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#7150ff]/10 text-[#7150ff] text-xs font-bold">
                                    {index + 1}
                                </span>
                                <h3 className="font-bold text-gray-800 text-sm">
                                    {segment.style || `分镜 ${index + 1}`}
                                </h3>
                            </div>
                <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-full border border-gray-100 shadow-sm">
                    <ClockCircleOutlined className="text-[10px] text-gray-400" />
                    <span className="text-[10px] font-bold text-gray-500 tabular-nums">
                        {segment.timeStart || 0}s - {segment.timeEnd || 0}s
                    </span>
                </div>
                        </div>

                        <div className="p-5 space-y-4">
                {/* Key Fields Section */}
                <div className="space-y-3">
                    {segment.coreAction && (
                        <div>
                            <div className="text-[10px] text-gray-400 mb-1 font-bold uppercase tracking-wider pl-1">核心动作</div>
                            <div className="bg-[#7150ff]/5 rounded-xl p-3 border border-[#7150ff]/10">
                                <div className="text-sm text-[#7150ff] font-bold">{segment.coreAction}</div>
                            </div>
                        </div>
                    )}

                    {segment.elementTransformation && (
                        <div>
                            <div className="text-[10px] text-gray-400 mb-1 font-bold uppercase tracking-wider pl-1">元素变换</div>
                            <p className="text-sm text-gray-700 leading-relaxed pl-1">
                                {segment.elementTransformation}
                            </p>
                        </div>
                    )}

                    {segment.visualChange && (
                        <div>
                            <div className="text-[10px] text-gray-400 mb-1 font-bold uppercase tracking-wider pl-1">视觉变化</div>
                            <p className="text-sm text-gray-600  leading-relaxed pl-1 ">
                                {segment.visualChange}
                            </p>
                        </div>
                    )}

{segment.intention && (
                            <div>
                            <div className="text-[10px] text-gray-400 mb-1 font-bold uppercase tracking-wider pl-1">意图</div>
                            <p className="text-sm text-gray-600  leading-relaxed pl-1 ">
                                {segment.intention}
                            </p>
                        </div>
                    )}


                    <div>
                        <div 
                            className={classNames(
                                "flex items-center gap-1.5 mb-1 pl-1",
                                editable ? "cursor-pointer group/label" : ""
                            )}
                            onClick={() => editable && onFocus(index)}
                        >
                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider group-hover/label:text-[#7150ff] transition-colors">文案</div>
                            {editable && <EditOutlined className="text-[10px] text-[#7150ff] opacity-60 group-hover/label:opacity-100 transition-opacity" />}
                        </div>
                        {editable ? (
                            <Input.TextArea
                                value={segment.subtitle}
                                onChange={(e) => onSubtitleChange(index, e.target.value)}
                                autoSize={{ minRows: 1, maxRows: 4 }}
                                variant="borderless"
                                className="!bg-[#7150ff]/5 !text-sm !text-[#7150ff] !font-bold rounded-xl !p-3 border border-[#7150ff]/10 hover:!bg-[#7150ff]/10 focus:!border-[#7150ff]/30 focus:!bg-white transition-all cursor-text"
                            />
                        ) : (
                            <div className="bg-[#7150ff]/5 rounded-xl p-3 border border-[#7150ff]/10">
                                <div className="text-sm text-[#7150ff] font-bold">{segment.subtitle}</div>
                            </div>
                        )}
                    </div>
                            </div>

                            {/* Styles Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100/50">
                                    <div className="text-xs text-gray-400 mb-1 font-medium">内容风格</div>
                                    <div className="text-sm text-gray-600 font-medium">{segment.contentStyle}</div>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100/50">
                                    <div className="text-xs text-gray-400 mb-1 font-medium">场景风格</div>
                                    <div className="text-sm text-gray-600 font-medium">{segment.sceneStyle}</div>
                                </div>
                            </div>

                            {/* Tags - Flattened */}
                            {segment.typedTags && (
                                <div className="flex flex-wrap gap-2 pt-2 border-t border-dashed border-gray-100">
                                    {Object.values(segment.typedTags)
                                        .flat()
                                        .filter(tag => typeof tag === 'string')
                                        .map((tag: any, i: number) => (
                                            <span key={i} className="text-xs px-2.5 py-1 bg-[#7150ff]/5 border border-[#7150ff]/10 text-[#7150ff] rounded-lg font-medium transition-colors hover:bg-[#7150ff]/10">
                                                {tag}
                                            </span>
                                        ))
                                    }
                                </div>
                            )}
                        </div>
                    </div>
    );
});

const SegmentScriptJob: React.FC<SegmentScriptJobProps> = ({ job, data, asset, onRefresh, editable }) => {
    const segments = data?.segments || EMPTY_ARRAY;
    const script = data?.script || '';

    const [localScript, setLocalScript] = useState(script);
    const [localSegments, setLocalSegments] = useState<any[]>(segments);
    const [saving, setSaving] = useState(false);

    const prevSegmentsRef = useRef(JSON.stringify(segments));
    const prevScriptRef = useRef(script);

    const textareaRefs = useRef<(any)[]>([]);

    useEffect(() => {
        if (script !== prevScriptRef.current) {
            setLocalScript(script);
            prevScriptRef.current = script;
        }
    }, [script]);

    useEffect(() => {
        const segmentsStr = JSON.stringify(segments);
        if (segmentsStr !== prevSegmentsRef.current) {
            setLocalSegments(segments);
            prevSegmentsRef.current = segmentsStr;
        }
    }, [segments]);

    const handleSave = async () => {
        if (!asset || saving) return;
        setSaving(true);
        try {
            await updateWorkflowJob({
                id: asset.workflow?._id,
                index: job.index,
                dataKey: 'segmentScript',
                data: {
                    segmentScript: {
                        ...data,
                        script: localScript,
                        segments: localSegments,
                    }
                }
            });
            message.success('已自动保存变更');
            onRefresh();
        } catch (e) {
            console.error(e);
            message.error('自动保存失败');
        } finally {
            setSaving(false);
        }
    };

    useDebounceEffect(
        () => {
            if (localScript !== script || JSON.stringify(localSegments) !== JSON.stringify(segments)) {
                handleSave();
            }
        },
        [localScript, localSegments],
        { wait: 1000 }
    );

    const handleSubtitleChange = useCallback((index: number, value: string) => {
        setLocalSegments(prev => {
            const next = [...prev];
            next[index] = { ...next[index], subtitle: value };
            return next;
        });
    }, []);

    const handleFocus = useCallback((index: number) => {
        textareaRefs.current[index]?.focus();
    }, []);

    const renderSegments = useMemo(() => {
        return localSegments.map((segment: any, index: number) => (
            <SegmentItem
                key={index}
                segment={segment}
                index={index}
                editable={editable}
                onSubtitleChange={handleSubtitleChange}
                onFocus={handleFocus}
            />
        ));
    }, [localSegments, editable, handleSubtitleChange, handleFocus]);

    if (!data) return null;

    if (segments.length > 0) {
        return (
            <div className="flex flex-col gap-4">
                <div className="mt-2 flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
                    {renderSegments}
                </div>
            </div>
        );
    }

    return (
        <div className="mt-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">脚本编辑</span>
            </div>
            <Input.TextArea
                value={localScript}
                onChange={(e) => setLocalScript(e.target.value)}
                readOnly={!editable}
                placeholder="输入或粘贴脚本内容..."
                autoSize={{ minRows: 10, maxRows: 25 }}
                className={`!bg-gray-50/50 border-gray-100 rounded-2xl p-6 text-sm leading-relaxed transition-all focus:!bg-white focus:!border-[#7150ff]/30 ${!editable ? 'cursor-not-allowed opacity-80' : ''}`}
            />
        </div>
    );
};

export default React.memo(SegmentScriptJob);

