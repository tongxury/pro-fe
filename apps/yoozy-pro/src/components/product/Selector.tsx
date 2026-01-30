import { Input, Typography, Skeleton } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useRequest } from "ahooks";
import { listCommodities } from "@/api/task.ts";


const Selector = ({ onConfirm }: { onConfirm: (item: any) => void }) => {

    const [searchValue, setSearchValue] = useState("");

    const { data, loading } = useRequest(() => listCommodities({ keyword: searchValue, }), {
        refreshDeps: [searchValue]
    })

    return (
        <div>
            <div className="space-y-4">
                {/* 搜索框标签 */}
                <div>
                    <Typography.Text strong className="text-base">
                        选择商品
                    </Typography.Text>
                </div>

                {/* 搜索输入框 */}
                <Input
                    size="large"
                    placeholder="搜索商品名称..."
                    prefix={<SearchOutlined className="text-gray-400" />}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    allowClear
                    className="rounded-lg"
                />

                {/* 商品列表 */}
                <div className="flex flex-row items-center gap-2 overflow-x-auto min-h-[188px]">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="w-[120px] flex-shrink-0 p-2 bg-gray-50 rounded-lg border border-gray-100">
                                <Skeleton.Button active block className="!h-[120px] !w-full !rounded-lg mb-2" />
                                <Skeleton active paragraph={{ rows: 1, width: '100%' }} title={false} />
                            </div>
                        ))
                    ) : (
                        data?.data?.list?.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => onConfirm(item)}
                                className={'w-[120px] flex-shrink-0 p-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 transition-colors'}
                            >
                                {/* 商品图片 */}
                                <div className="w-full h-[120px] mb-2">
                                    {item.images && item.images.length > 0 ? (
                                        <img
                                            src={item.images[0]}
                                            alt={item.title}
                                            className="w-full h-full rounded-lg object-cover"
                                        />
                                    ) : (
                                        <div
                                            className="w-full h-full flex items-center justify-center text-2xl bg-white/50 rounded-lg">
                                            📦
                                        </div>
                                    )}
                                </div>

                                {/* 商品标题 */}
                                <div>
                                    <Typography.Text
                                        className="block text-xs line-clamp-2 h-8"
                                        ellipsis
                                    >
                                        {item.title}
                                    </Typography.Text>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Selector;
