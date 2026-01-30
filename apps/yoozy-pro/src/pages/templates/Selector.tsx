import React, { useState } from "react";
import { Pagination, Empty, Segmented, Select, Space } from "antd";
import { useRequest } from "ahooks";
import { SearchOutlined, AppstoreOutlined, FilterOutlined, ReloadOutlined, EyeOutlined } from "@ant-design/icons";
import { listPublicTemplates, listTemplates } from "@/api/template";
import CompositionInput from "@/components/CompositionInput";
import Detail from "./Detail";

interface TemplateSelectorProps {
    value?: any;
    onChange: (item: any) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ value, onChange }) => {
    const [keyword, setKeyword] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(12);
    const [source, setSource] = useState<'system' | 'mine'>('system');
    const [searchBy, setSearchBy] = useState<'commodity' | 'video'>('commodity');

    const service = source === 'system' ? listPublicTemplates : listTemplates;

    const { data: d, loading, run } = useRequest(() => service({
        page,
        status: 'completed',
        size: pageSize,
        keyword,
        searchBy,
        returnFields: "coverUrl,status,name,commodity.name",
    }), {
        refreshDeps: [page, pageSize, keyword, source, searchBy],
    });

    const data = d?.data || {};
    const list = data?.list || [];
    const total = data?.total || 0;

    return (
        <div className="space-y-6 animate-fade-in h-full flex flex-col">
            {/* Search Input */}
            {/* Header: Tabs & Filters */}
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <Segmented
                        value={source}
                        onChange={(val: any) => {
                            setSource(val);
                            setPage(1);
                        }}
                        options={[
                            { label: '系统模板', value: 'system' },
                            { label: '我的模板', value: 'mine' },
                        ]}
                        className="bg-gray-100"
                    />
                </div>

                <div className="flex gap-2">
                    <Space.Compact className="flex-1">
                        <Select
                            value={searchBy}
                            onChange={(val) => {
                                setSearchBy(val);
                                setPage(1);
                            }}
                            options={[
                                { label: "按商品", value: "commodity" },
                                { label: "按画面", value: "video" },
                            ]}
                            className="w-24 border-none"
                            variant="filled"
                        />
                        <CompositionInput
                            placeholder="搜索模板..."
                            prefix={<SearchOutlined className="text-gray-400" />}
                            value={keyword}
                            onChangeText={(text) => {
                                setKeyword(text);
                                setPage(1);
                            }}
                            allowClear
                            className="flex-1"
                        />
                    </Space.Compact>
                </div>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto min-h-0 relative">
                {loading && !list.length ? (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="aspect-[16/9] bg-gray-100 rounded-xl animate-pulse" />
                        ))}
                    </div>
                ) : list.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 content-start">
                        {list.map((item: any) => (
                            <div
                                key={item._id}
                                className="group relative cursor-pointer"
                                onClick={() => onChange(item)}
                            >
                                <div className="aspect-[9/16] w-full overflow-hidden rounded-xl bg-gray-100 relative border-2 border-transparent hover:border-[#7150ff] transition-all duration-300 shadow-sm hover:shadow-lg">
                                    <img
                                        src={item.coverUrl} // Assuming coverUrl property exists
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

                                    {/* Name/Tags overlay if needed */}
                                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="text-white text-xs font-medium truncate block">
                                            {item.name}
                                        </span>
                                    </div>

                                    {/* View Detail Button */}
                                    <div
                                        className="absolute top-2 right-2 z-10"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Detail itemId={item._id}>
                                            <div className="w-6 h-6 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm flex items-center justify-center text-white transition-colors">
                                                <EyeOutlined className="text-xs" />
                                            </div>
                                        </Detail>
                                    </div>

                                    {/* Selected Overlay */}
                                    {value?._id === item._id && (
                                        <div className="absolute inset-0 bg-[#7150ff]/20 border-4 border-[#7150ff] rounded-xl flex items-center justify-center">
                                            <div className="bg-[#7150ff] text-white px-3 py-1 rounded-full text-xs font-medium shadow-md">
                                                已选择
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 py-12">
                        <div className="mb-4 text-gray-200">
                            <AppstoreOutlined style={{ fontSize: 64 }} />
                        </div>
                        <Empty description="暂无相关模板" />
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

export default TemplateSelector;
