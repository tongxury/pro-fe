import React, { useState } from "react";
import { Pagination, Empty } from "antd";
import { useRequest } from "ahooks";
import { SearchOutlined, FolderOpenOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { listAssets } from "@/api/asset";
import CompositionInput from "@/components/CompositionInput";
import classNames from "classnames";

interface AssetSelectorProps {
    value?: any;
    onChange: (item: any) => void;
}

const AssetSelector: React.FC<AssetSelectorProps> = ({ value, onChange }) => {
    const [keyword, setKeyword] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(12);

    const { data: d, loading } = useRequest(() => listAssets({
        page,
        size: pageSize,
        keyword,
        status: "completed", // Only show completed assets for selection usually
        returnFields: "url,coverUrl,name,status,createdAt",
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
                    placeholder="搜索我的资产..."
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
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="aspect-[9/16] bg-gray-100 rounded-xl animate-pulse" />
                        ))}
                    </div>
                ) : list.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 content-start">
                        {list.map((item: any) => (
                            <div
                                key={item._id}
                                className="group relative cursor-pointer"
                                onClick={() => onChange(item)}
                            >
                                <div className={classNames(
                                    "aspect-[9/16] w-full overflow-hidden rounded-xl bg-gray-100 relative border-2 transition-all duration-300 shadow-sm hover:shadow-lg",
                                    value?._id === item._id ? "border-[#7150ff] ring-2 ring-[#7150ff]/20" : "border-transparent hover:border-[#7150ff]"
                                )}>
                                    {item.coverUrl ? (
                                        <img
                                            src={item.coverUrl}
                                            alt={item.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
                                            <VideoCameraOutlined className="text-3xl" />
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

                                    {/* Item Info (optional) */}
                                    {/* <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent flex items-end opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="text-white text-xs truncate w-full">{item.name || '未命名资产'}</div>
                                    </div> */}

                                    {/* Selected Overlay */}
                                    {value?._id === item._id && (
                                        <div className="absolute inset-0 bg-[#7150ff]/10 flex items-center justify-center">
                                            <div className="bg-[#7150ff] text-white px-3 py-1 rounded-full text-xs font-medium shadow-md flex items-center gap-1">
                                                <FolderOpenOutlined /> 已选择
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
                            <FolderOpenOutlined style={{ fontSize: 64 }} />
                        </div>
                        <Empty description="暂无符合条件的资产" />
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

export default AssetSelector;
