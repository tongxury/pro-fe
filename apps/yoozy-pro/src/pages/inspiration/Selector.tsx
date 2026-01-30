import React, { useState } from "react";
import { Input, Pagination, Spin, Typography, Empty } from "antd";
import { useRequest } from "ahooks";
import { SearchOutlined, VideoCameraOutlined, EyeOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { listResourceSegments } from "@/api/resource";
import CompositionInput from "@/components/CompositionInput";
import Detail from "./Detail";
import VideoSegment from "@/components/VideoSegment";

interface InspirationSelectorProps {
    value?: any;
    onChange: (item: any) => void;
}

const InspirationSelector: React.FC<InspirationSelectorProps> = ({ value, onChange }) => {
    const [keyword, setKeyword] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(12);

    const { data: d, loading } = useRequest(() => listResourceSegments({
        page,
        size: pageSize,
        keyword,
        returnFields: "highlightFrames,status,typedTags,root.coverUrl,root.url,timeStart,timeEnd",
    }), {
        refreshDeps: [page, pageSize, keyword],
    });

    const data = d?.data || {};
    const list = data?.list || [];
    const total = data?.total || 0;

    return (
        <div className="space-y-6 animate-fade-in h-full flex flex-col">
            {/* Search Input */}
            <div className="relative group">
                <CompositionInput
                    size="large"
                    placeholder="搜索灵感..."
                    prefix={<SearchOutlined className="text-gray-400 group-hover:text-[#7150ff] transition-colors" />}
                    value={keyword}
                    onChangeText={(text) => {
                        setKeyword(text);
                        setPage(1);
                    }}
                    allowClear
                    className="!h-14 !rounded-xl !bg-gray-50 !border-gray-200 hover:!border-[#7150ff]/50 focus:!border-[#7150ff] !text-lg !pl-4 shadow-sm transition-all duration-300"
                />
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto min-h-0 relative">
                {loading && !list.length ? (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="aspect-[9/16] bg-gray-100 rounded-xl animate-pulse" />
                        ))}
                    </div>
                ) : list.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 content-start">
                        {list.map((item: any) => (
                            <div
                                key={item._id}
                                className="group relative cursor-pointer"
                            >
                                <div className="aspect-[9/16] w-full relative group/item">
                                    <VideoSegment
                                        url={item.root?.url}
                                        coverUrl={item.highlightFrames?.[0]?.url || item.root?.coverUrl}
                                        startTime={item.timeStart}
                                        endTime={item.timeEnd}
                                        minimal
                                        hideDuration
                                        className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-[#7150ff]"
                                    />

                                    {/* Actions Overlay */}
                                    <div className="absolute top-2 right-2 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {/* Selection Button */}
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onChange(item);
                                            }}
                                            className={`
                                                h-8 pl-2.5 pr-3.5 rounded-full backdrop-blur-md flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-300 shadow-sm border group/btn
                                                ${value?._id === item._id
                                                    ? 'bg-[#7150ff] border-[#7150ff] text-white'
                                                    : 'bg-black/40 hover:bg-black/60 text-white border-white/10 hover:border-white/20'}
                                            `}
                                        >
                                            <CheckCircleOutlined className={`text-sm transition-transform duration-300 ${value?._id === item._id ? 'scale-110' : 'group-hover/btn:scale-110'}`} />
                                            <span className="text-xs font-medium translate-y-[0.5px]">
                                                {value?._id === item._id ? "已选" : "选择"}
                                            </span>
                                        </div>

                                        {/* View Detail Button */}
                                        <div
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Detail id={item._id}>
                                                <div className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 cursor-pointer border border-white/10 hover:border-white/20 shadow-sm group/eye">
                                                    <EyeOutlined className="text-sm transition-transform duration-300 group-hover/eye:scale-110" />
                                                </div>
                                            </Detail>
                                        </div>
                                    </div>

                                    {/* Tags & Duration */}
                                    <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5 pointer-events-none">
                                        {/* Duration Badge */}
                                        <span className="text-[10px] bg-black/60 text-white px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/10 font-medium">
                                            {item.timeEnd && item.timeStart !== undefined ? (item.timeEnd - item.timeStart).toFixed(1) + 's' : '00:00'}
                                        </span>

                                        {item.typedTags?.scene?.slice(0, 2).map((tag: string, i: number) => (
                                            <span key={i} className="text-[10px] bg-black/60 text-white px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/10">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Selected Border Only */}
                                    {value?._id === item._id && (
                                        <div className="absolute inset-0 border-4 border-[#7150ff] rounded-xl pointer-events-none" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 py-12">
                        <div className="mb-4 text-gray-200">
                            <VideoCameraOutlined style={{ fontSize: 64 }} />
                        </div>
                        <Empty description="暂无灵感视频" />
                    </div>
                )}
            </div>

            {/* Pagination */}
            {total > 0 && (
                <div className="flex justify-end pt-4 border-t border-gray-100">
                    <Pagination
                        current={page}
                        pageSize={pageSize}
                        total={total}
                        onChange={(p, s) => {
                            setPage(p);
                            setPageSize(s);
                        }}
                        showSizeChanger
                        size="small"
                        showTotal={(t) => `共 ${t} 条`}
                    />
                </div>
            )}
        </div>
    );
};

export default InspirationSelector;
