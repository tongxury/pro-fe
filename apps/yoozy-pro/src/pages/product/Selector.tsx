import { Commodity } from "@/types.ts";
import { useState } from "react";
import { useRequest } from "ahooks";
import { listCommodities } from "@/api/task.ts";
import { SearchOutlined, PictureOutlined } from "@ant-design/icons";
import { Empty, Spin, Typography } from "antd";
import CompositionInput from "@/components/CompositionInput.tsx";

interface CommoditySelectorProps {
    value?: Commodity;
    onChange: (value: Commodity) => void;
}

const CommoditySelector = ({ value, onChange }: CommoditySelectorProps) => {
    const [searchValue, setSearchValue] = useState("");

    const { data: cms, loading } = useRequest(() => listCommodities({ keyword: searchValue, returnFields: 'status,images,title,brand' }), {
        refreshDeps: [searchValue]
    });

    return (
        <div className="space-y-6 animate-fade-in h-full flex flex-col">
            {/* 搜索框 */}
            <div className="relative group">
                <CompositionInput

                    size="large"
                    placeholder="搜索商品名称..."
                    prefix={<SearchOutlined
                        className="text-gray-400 group-hover:text-[#7150ff] transition-colors" />}
                    value={searchValue}
                    onChangeText={(text) => setSearchValue(text)}
                    allowClear
                    className="!h-14 !rounded-xl !bg-gray-50 !border-gray-200 hover:!border-[#7150ff]/50 focus:!border-[#7150ff] !text-lg !pl-4 shadow-sm transition-all duration-300"
                />
            </div>

            {/* 商品列表 */}
            <div className="flex-1 overflow-y-auto min-h-0 relative">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 content-start">
                    {loading ? (
                        <div
                            className="col-span-full h-full flex flex-col items-center justify-center text-gray-500">
                            <Spin size="large" />
                            <div className="mt-4 text-sm">正在搜索商品...</div>
                        </div>
                    ) : (
                        <>
                            {cms?.data?.list?.map((item: any) => (
                                <div
                                    key={item.id}
                                    onClick={() => onChange(item)}
                                    className="group relative bg-white rounded-xl border border-gray-100 overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                >
                                    {/* 商品图片 */}
                                    <div
                                        className="aspect-square w-full bg-gray-100 relative overflow-hidden">
                                        {item.images && item.images.length > 0 ? (
                                            <img
                                                src={item.images[0]}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div
                                                className="w-full h-full flex items-center justify-center text-3xl text-gray-300">
                                                <PictureOutlined />
                                            </div>
                                        )}
                                        {/* 选中遮罩 */}
                                        <div
                                            className="absolute inset-0 bg-[#7150ff]/0 group-hover:bg-[#7150ff]/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <div
                                                className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[#7150ff] text-xs font-medium shadow-sm transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                                选择此商品
                                            </div>
                                        </div>
                                    </div>

                                    {/* 商品标题 */}
                                    <div className="p-3">
                                        <Typography.Text
                                            className="block text-sm text-gray-700 font-medium line-clamp-2 group-hover:text-[#7150ff] transition-colors"
                                            ellipsis={{ tooltip: item.title }}
                                        >
                                            {item.title}
                                        </Typography.Text>
                                    </div>
                                </div>
                            ))}
                            {(!cms?.data?.list || cms.data.list.length === 0) && (
                                <div className="col-span-full py-12">
                                    <Empty description="暂无商品，请尝试搜索其他关键词" />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CommoditySelector;
