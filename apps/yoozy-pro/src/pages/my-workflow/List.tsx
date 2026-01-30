import React from "react";
import { List, Pagination, Skeleton } from 'antd';
import { listWorkflows } from "@/api/workflow";
import useQueryListWithPolling from "@/hooks/useQueryListWithPolling.tsx";
import useUrlState from "@ahooksjs/use-url-state";
import WorkflowItem from "../asset/WorkflowItem";

export default function WorkflowList({ status, className }: { status?: string, className?: string }) {
    const [params, setParams] = useUrlState<any>({ page: 1, size: 15 });

    const { list, total, initialLoading, reload, mutate } = useQueryListWithPolling<any, any>({
        service: listWorkflows,
        params: {
            ...params,
            status: status === 'processing' ? 'running,waiting,confirming' : status,
        },
        key: (item: any) => item._id,
        pollingFilter: (item: any) => !['completed', 'failed', 'canceled'].includes(item.status),
    })

    const onPageChange = (page: number, size: number) => {
        setParams(prev => ({ ...prev, page, size }));
    }

    const showSkeleton = initialLoading && (!list || list.length === 0);

    return (
        <div className={className}>
            <div className="mx-auto flex flex-col gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col gap-6">
                    <div className="relative">
                        {
                            showSkeleton ?
                                <List
                                    grid={{
                                        gutter: 15,
                                        xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 5,
                                    }}
                                    dataSource={Array.from({ length: 15 }).map((_, index) => (index))}
                                    renderItem={(x: any) => (
                                        <List.Item>
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
                                    renderItem={(workflow: any) => {
                                        return (
                                            <List.Item className="!border-none !pb-0">
                                                <div className="flex flex-col h-full w-full">
                                                    <div className="flex-1">
                                                        <WorkflowItem workflow={workflow} onUpdate={() => reload()} />
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
                            showTotal={(total) => `共 ${total} 个工作流`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
