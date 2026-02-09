import React, { useEffect, useState } from "react";
import {
    Button,
    Input,
    List,
    Pagination,
    Select,
    Skeleton,
    Space,
} from "antd";
import { useRequest } from "ahooks";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { listCollectedResourceSegments, listResourceSegments } from "@/api/resource.ts";
import Detail from "@/pages/inspiration/Detail.tsx";
import DetailV2 from "@/pages/inspiration/DetailV2.tsx";
import useUrlState from "@ahooksjs/use-url-state";
import CompositionInput from "@/components/CompositionInput.tsx";
import InspirationCard from "@/pages/inspiration/components/InspirationCard";

export default function InspirationList() {
    const [params, setParams] = useUrlState<any>({ page: 1, size: 15 });

    const { data: d, loading, run } = useRequest(async () => {
        return listResourceSegments({
            ...params,
            returnFields: [
                "highlightFrames",
                "status",
                "typedTags.text",
                "typedTags.picture",
                "typedTags.scene",
                "segments",
                "collected"
            ].join(","),
        })
    }, {
        // manual: true,
        refreshDeps: [params],
    });
    const data = d?.data || {};

    const initialLoading = loading && !d;

    // useEffect(() => {
    //     run();
    // }, [params]);

    const handleFilterChange = (key: string, value: any) => {
        setParams((prev) => ({ ...prev, [key]: value }));
    };


    const onPageChange = (page: number, size: number) => {
        setParams((prev) => ({ ...prev, page, size }));
    };

    return (
        <div className="p-6 min-h-screen bg-gray-50">
            <div className="max-w-[1600px] mx-auto flex flex-col gap-6">
                {/* Header Section */}
                <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold m-0 text-gray-800">灵感库</h1>
                        <div className="h-6 w-[1px] bg-gray-200"></div>
                        <span className="text-gray-500">发现和管理您的创意视频</span>
                    </div>
                    {/* Upload button removed as per "no new functionality" request, but layout is ready for it */}
                </div>

                {/* Main Content Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col gap-6">
                    {/* Filters */}
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <Space size="large">
                            <div className="bg-gray-100 p-1 rounded-lg inline-flex">
                                <button
                                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${!params.collected ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                    onClick={() => handleFilterChange('collected', undefined)}
                                >
                                    全部灵感
                                </button>
                                <button
                                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${params.collected ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                    onClick={() => handleFilterChange('collected', true)}
                                >
                                    我的收藏
                                </button>
                            </div>

                            <div className="h-6 w-[1px] bg-gray-200"></div>

                            <Space.Compact>
                                <Select
                                    defaultValue="commodity"
                                    onChange={(value, option) =>
                                        handleFilterChange("searchBy", value)
                                    }
                                    options={[
                                        { label: "按商品", value: "commodity" },
                                        { label: "按画面", value: "video" },
                                    ]}
                                />
                                <CompositionInput value={params?.keyword} allowClear
                                    onChangeText={text => handleFilterChange('keyword', text)} />
                            </Space.Compact>
                        </Space>
                    </div>

                    {/* Video Grid */}
                    {initialLoading ? (
                        <List
                            grid={{
                                gutter: 24,
                                xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6,
                            }}
                            dataSource={Array.from({ length: 12 }).map((_, index) => index)}
                            renderItem={() => (
                                <List.Item>
                                    <Skeleton.Button active block
                                        style={{ width: '100%', height: '100%', aspectRatio: '9/16' }} />
                                </List.Item>
                            )}
                        />
                    ) : (
                        <List
                            grid={{
                                gutter: 24,
                                xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6,
                            }}
                            dataSource={data?.list || []}
                            renderItem={(x: any) => (
                                <List.Item>
                                    <InspirationCard data={x} showEntry />
                                </List.Item>
                            )}
                        />
                    )}

                    <div className="flex justify-center mt-8">
                        <Pagination
                            defaultPageSize={15}
                            onChange={onPageChange}
                            showSizeChanger
                            pageSizeOptions={[15, 30, 45]}
                            current={params?.page}
                            size={params?.size}
                            total={data?.total}
                            showTotal={(total) => `共 ${total} 个视频`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
