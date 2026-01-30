import { listOngoingIssues } from "@/api/issue";
import { useRequestData } from "@/hooks/useRequestData";
import { Badge, Dropdown, Menu, Spin, Empty } from "antd";
import { LoadingOutlined, BellOutlined, RightOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useRouter } from "@/hooks/useRouter";
import { issueConfig } from "@/consts";

const OngoingIssues = () => {

    const router = useRouter();
    const { data: issues, loading } = useRequestData(
        () => listOngoingIssues({ page: 1, pageSize: 5 }),
        {
            pollingInterval: 10000, // Poll every 10s
        }
    );

    const count = issues?.list?.length || 0;
    const list = issues?.list || [];

    const overlay = (
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 w-80 overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
                <span className="font-bold text-sm text-gray-700">进行中的任务 {count > 0 && `(${count})`}</span>
                {loading && <LoadingOutlined className="text-blue-500 text-xs" />}
            </div>

            <div className="max-h-[300px] overflow-y-auto">
                {list.length > 0 ? (
                    <div className="flex flex-col">
                        {list.map((item: any) => (
                            <div
                                key={item._id}
                                className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0 flex items-center justify-between group"
                                onClick={() => {
                                    if (item.category === "templateReplication") {
                                        router.push(`/sessions/${item._id}`);
                                    } else
                                        if (item.category === 'segmentReplication') {
                                            router.push(`/asset-detail/${item._id}`);
                                        }
                                }}
                            >
                                <div className="flex flex-col gap-1 overflow-hidden">
                                    <div className="flex items-center gap-1.5 min-w-0">
                                        {/* @ts-ignore */}
                                        {issueConfig[item.category]?.label && (
                                            // @ts-ignore
                                            <span className={`shrink-0 px-1.5 py-0.5 rounded text-[10px] font-medium border ${issueConfig[item.category]?.bg || 'bg-gray-50'} ${issueConfig[item.category]?.color || 'text-gray-500'} ${issueConfig[item.category]?.border || 'border-gray-100'}`}>
                                                {/* @ts-ignore */}
                                                {issueConfig[item.category]?.label}
                                            </span>
                                        )}
                                        <span className="text-sm text-gray-700 font-medium truncate">{item.title || "未命名任务"}</span>
                                    </div>
                                    <span className="text-xs text-gray-400 capitalize">{item.status}</span>
                                </div>
                                <RightOutlined className="text-gray-300 text-xs group-hover:text-blue-500 transition-colors" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-8 flex flex-col items-center gap-2 text-gray-400">
                        {/* <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无进行中的任务" /> */}
                        <div className="text-xs">暂无任务</div>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <Dropdown
            dropdownRender={() => overlay}
            placement="bottomRight"
            trigger={['click', 'hover']}
        >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-50 cursor-pointer transition-colors border border-transparent hover:border-gray-100 group">
                <div className="relative">
                    <BellOutlined className={`text-lg transition-colors ${count > 0 ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'}`} />
                    {count > 0 && <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 bg-red-500 rounded-full border border-white flex items-center justify-center text-white text-[10px] shadow-sm leading-none">{count}</span>}
                </div>
                {count > 0 ? (
                    <span className="text-xs font-bold text-gray-600">
                        {count} 个进行中
                    </span>
                ) : (
                    <span className="text-xs text-gray-400 group-hover:text-gray-500">
                        任务中心
                    </span>
                )}
            </div>
        </Dropdown>
    );
};

export default OngoingIssues;
