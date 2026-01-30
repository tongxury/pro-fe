import React from "react";
import { List, Pagination, Skeleton } from 'antd';
import { listSessions } from "@/api/session";
import useQueryListWithPolling from "@/hooks/useQueryListWithPolling.tsx";
import useUrlState from "@ahooksjs/use-url-state";
import classNames from 'classnames';
import SessionItem from "./Item";

const SessionList = ({ className }: { className?: string }) => {
    const [params, setParams] = useUrlState<any>({ page: 1, size: 15 });

    const { list, total, initialLoading, reload } = useQueryListWithPolling<any, any>({
        service: listSessions,
        params: {
            ...params,
        },
        key: (item: any) => item._id,
        pollingFilter: (item: any) => false,
    });

    const onPageChange = (page: number, size: number) => {
        setParams(prev => ({ ...prev, page, size }));
    }

    return (
        <div className={className}>
            <div className="mx-auto flex flex-col gap-6">

                {/* Main Content Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col gap-6">
                    {
                        initialLoading ?
                            <List
                                grid={{
                                    gutter: 15,
                                    xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 5,
                                }}
                                dataSource={Array.from({ length: 25 }).map((_, index) => (index))}
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
                                renderItem={(x: any) => {
                                    return (
                                        <List.Item>
                                            <SessionItem x={x} />
                                        </List.Item>
                                    )
                                }}
                            />
                    }
                    <div className="flex justify-center mt-8">
                        <Pagination
                            defaultPageSize={15}
                            onChange={onPageChange}
                            showSizeChanger
                            pageSizeOptions={[15, 30, 45]}
                            current={params?.page}
                            size={params?.size}
                            total={total}
                            showTotal={(total) => `共 ${total} 个会话`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SessionList;