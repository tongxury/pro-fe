import React from "react";
import dayjs from "dayjs";
import { List, Pagination, Skeleton, Spin, Select, Input, Button, message, Typography } from 'antd';
import { CheckCircleFilled, ExclamationCircleOutlined, LoadingOutlined, AppstoreOutlined, SyncOutlined, CheckCircleOutlined, CloseCircleOutlined, StarFilled, ExportOutlined, ShoppingOutlined, EditOutlined } from '@ant-design/icons';
import { useRequestData } from "@/hooks/useRequestData";
import { listAssets, getAssetSummary, updateAssetRemark } from "@/api/asset.ts";
import useQueryListWithPolling from "@/hooks/useQueryListWithPolling.tsx";
import useUrlState from "@ahooksjs/use-url-state";
import classNames from 'classnames';
import Detail from "./Detail";
import { formatDuration } from "@/utils";
import AssetView from "./views/AssetView";
import ProductDetail from "../product/Detail";
import AssetItem from "./Item";
import WorkflowAssetItem from "./WorkflowAssetItem";
import CustomAssetItem from "./CustomAssetItem";
import AssetRemark from "./components/AssetRemark";

export default function AssetList({ category, className }: { category?: string, className?: string }) {
    const [params, setParams] = useUrlState<any>({ page: 1, size: 15 });

    const { data: summary } = useRequestData(getAssetSummary, {
        // pollingInterval: 3000,
    });

    const { list, total, initialLoading, reload, mutate } = useQueryListWithPolling<any, any>({
        service: listAssets,
        params: {
            ...params,
            category,
            status: params.status === 'processing' ? 'promptGenerating,promptGenerated,generating,created' : params.status,
            simple: true,
           
        },
        key: (item: any) => item._id,
        pollingFilter: (item: any) => !['completed', 'failed'].includes(item.status),
    })

    const handleUpdateItem = (newItem?: any) => {
        if (!list) return;
        
        // 如果是删除了该项
        if (newItem?._deleted) {
            const newList = list.filter((item: any) => item._id !== newItem._id);
            mutate(newList);
            // 依然需要异步 reload 保持同步，因为 total 和分页会变，但这里我们悄悄做
            reload();
            return;
        }

        if (!newItem?._id) {
            reload();
            return;
        }
        
        const newList = list.map((item: any) => item._id === newItem._id ? newItem : item);
        mutate(newList);
    };

    const onPageChange = (page: number, size: number) => {
        setParams(prev => ({ ...prev, page, size }));
    }

    const onStatusChange = (value: string | undefined) => {
        setParams(prev => ({ ...prev, status: value, page: 1 }));
    }

    const showSkeleton = initialLoading && (!list || list.length === 0);

    return (
        <div className={className}>
            <div className="mx-auto flex flex-col gap-6">
                {/* Header Section */}

                {/* Main Content Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col gap-6">
                    <div className="relative">
                        {
                            showSkeleton ?
                                <List
                                    grid={{
                                        gutter: 15,
                                        xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 5,
                                    }}
                                    dataSource={Array.from({ length: 25 }).map((_, index) => (index))}
                                    renderItem={(x: any) => (
                                        <List.Item>
                                            {/*<div className="aspect-[1/1] w-full object-cover rounded-xl bg-gray-100 animate-pulse" />*/}
                                            <Skeleton.Button active block
                                                style={{ width: '100%', height: '100%', aspectRatio: '9/16' }} />
                                        </List.Item>
                                    )}
                                />
                                :
                                <List
                                    grid={{
                                        gutter: 15,
                                        xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 5,
                                    }}
                                    dataSource={list}
                                    renderItem={(x: any) => {
                                        return (
                                            <List.Item className="!border-none !pb-0">
                                                <div className="flex flex-col h-full w-full">
                                                    <div className="flex-1">
                                                        {
                                                            x.category === 'custom' ? (
                                                                <CustomAssetItem x={x} onUpdate={handleUpdateItem} />
                                                            ) : x.workflow ? (
                                                                <WorkflowAssetItem x={x} onUpdate={handleUpdateItem} />
                                                            ) : (
                                                                <AssetItem x={x} onUpdate={handleUpdateItem} />
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </List.Item>
                                        )
                                    }}
                                />
                        }
                    </div>
                    <div className="flex justify-center mt-8">
                        <Pagination
                            defaultPageSize={15}
                            onChange={onPageChange}
                            showSizeChanger
                            pageSizeOptions={[15, 30, 45]}
                            current={params?.page}
                            size={params?.size}
                            total={total}
                            showTotal={(total) => `共 ${total} 个资产`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
