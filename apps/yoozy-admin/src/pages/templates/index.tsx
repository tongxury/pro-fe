import React, { useEffect, useState } from "react";
import { addItem, deleteItem, listItems, refreshItem } from "@/api/item.ts";
import { Button, Card as FilterCard, Col, DatePicker, Input, List, Pagination, Row, Select, Skeleton, Space } from 'antd';
import { FilterOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import ItemView from "./ItemView";
import UploadTriggerButton from "./UploadTriggerButton";
import useQueryListWithPolling from "@/hooks/useQueryListWithPolling.tsx";
import useUrlState from "@ahooksjs/use-url-state";
import CompositionInput from "@/components/CompositionInput.tsx";
import PageContainer from "@/components/PageContainer";
import { listTemplates } from "@/api/template";


export default function Home() {

    const [params, setParams] = useUrlState<any>({});

    const { list, total, reload, initialLoading } = useQueryListWithPolling<any, any>({
        service: listTemplates,
        params: {
            ...params,
            returnFields: 'coverUrl,status,commodity.name,url'

        },
        key: item => item._id,
        pollingFilter: (item) => item.extra?.polling,
    })

    // useEffect(() => {
    //     reload();
    // }, [params]);

    const onAdd = (results: any[]) => {
        addItem(results?.map(x => ({ url: x.videoUrl, coverUrl: x.coverUrl }))).then(() => {
            reload()
        });
    };

    const onDelete = (id: string) => {
        deleteItem({ id }).then(() => {
            reload()
        });
    };

    const onRefresh = (id: string) => {
        refreshItem({ id }).then(() => {
            reload()
        });
    };

    const onPageChange = (page: number, size: number) => {
        setParams(prev => ({ ...prev, page, size }));
    }

    const reset = () => {
        setParams(prev => {
            return Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: undefined }), {})
        });
    }

    const handleFilterChange = (key: string, value: any) => {
        setParams((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <PageContainer title={'视频库'}>
            <div className="p-6 min-h-screen bg-gray-50">
                <div className="max-w-[1600px] mx-auto flex flex-col gap-6">
                    {/* Header Section */}
                    <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
                        <div className="flex items-center gap-4">
                            <h1 className="text-2xl font-bold m-0 text-gray-800">视频库</h1>
                            <div className="h-6 w-[1px] bg-gray-200"></div>
                            <span className="text-gray-500">管理您的视频模版</span>
                        </div>
                        <UploadTriggerButton onUploaded={(results) => {
                            console.log('上传结果:', results);
                            onAdd(results)
                        }} />
                    </div>

                    {/* Main Content Section */}
                    <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col gap-6">
                        {/* Filters */}
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                            <Space size="large">
                                <div className="flex items-center gap-2">
                                    <FilterOutlined className="text-gray-400" />
                                    <span className="font-medium text-gray-700">筛选</span>
                                </div>
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
                                    // className="w-32"
                                    // variant="borderless"
                                    />
                                    <CompositionInput
                                        value={params?.keyword}
                                        onChangeText={text => setParams(prevState => ({
                                            ...prevState,
                                            keyword: text
                                        }))}
                                        placeholder="搜索视频模版..."
                                        className="max-w-md rounded-full px-4"
                                    />
                                </Space.Compact>

                                <Button
                                    icon={<ReloadOutlined />}
                                    onClick={reset}
                                    loading={initialLoading}
                                    shape="circle"
                                    type="text"
                                />
                            </Space>


                        </div>

                        {initialLoading ? (
                            <List
                                grid={{
                                    gutter: 24,
                                    xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 6,
                                }}
                                dataSource={Array.from({ length: 12 }).map((_, index) => index)}
                                renderItem={() => (
                                    <List.Item>
                                        <Skeleton.Button active block
                                            style={{ width: '100%', height: '100%', aspectRatio: '1/1' }} />
                                    </List.Item>
                                )}
                            />
                        ) : (
                            <List
                                loading={initialLoading}
                                grid={{
                                    gutter: 24,
                                    xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 6,
                                }}
                                dataSource={list || []}
                                renderItem={(item) => (
                                    <List.Item>
                                        <ItemView data={item} onDelete={onDelete} onRefresh={onRefresh} />
                                    </List.Item>
                                )}
                            />
                        )}

                        <div className="flex justify-center mt-8">
                            <Pagination
                                defaultPageSize={20}
                                onChange={onPageChange}
                                showSizeChanger
                                current={params?.page}
                                size={params?.size}
                                total={total}
                                showTotal={(total) => `共 ${total} 个模版`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}
