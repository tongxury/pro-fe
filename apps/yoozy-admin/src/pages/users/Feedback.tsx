import React, { useState } from "react";
import { Table, Input, Space, Button, Tag, Rate } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import useQueryListWithPolling from "@/hooks/useQueryListWithPolling.tsx";
import useUrlState from "@ahooksjs/use-url-state";
import PageContainer from "@/components/PageContainer";
import { listFeedbacks } from "@/api/feedback";
import dayjs from "dayjs";

export default function FeedbackList() {
    const [params, setParams] = useUrlState<any>({});

    const { list, total, reload, initialLoading } = useQueryListWithPolling<any, any>({
        service: listFeedbacks,
        params: params,
        key: item => item._id,
        pollingFilter: () => false,
    });

    const columns = [
        // {
        //     title: '关联ID',
        //     dataIndex: 'targetId',
        //     key: 'targetId',
        //     width: 200,
        //     ellipsis: true,
        // },

        {
            title: '用户ID',
            dataIndex: 'userId',
            key: 'userId',
            width: 200,
            ellipsis: true,
        },
        {
            title: '评分',
            dataIndex: ['content', 'rating'],
            key: 'rating',
            width: 150,
            render: (rating: string) => <Rate disabled allowHalf value={Number(rating)} count={10} style={{ fontSize: 16 }} />
        },
        {
            title: '问题标签',
            dataIndex: 'issues',
            key: 'issues',
            render: (issues: string[]) => (
                <div className="flex flex-wrap gap-1">
                    {issues?.map((issue, index) => (
                        <Tag key={index} color="red">{issue}</Tag>
                    ))}
                </div>
            )
        },
        {
            title: '详细描述',
            dataIndex: ['content', 'customText'],
            key: 'customText',
            ellipsis: true,
        },
        {
            title: '提交时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 180,
            render: (text: string) => text ? dayjs(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss') : '-',
        },
        {
            title: '操作',
            dataIndex: 'url',
            key: 'url',
            width: 80,
            render: (text: string, record: any) => text ? <a href={'/user-assets/' + record?.targetId} target="_blank" rel="noopener noreferrer">查看</a> : '-',
        },
    ];

    const onPageChange = (page: number, size: number) => {
        setParams(prev => ({ ...prev, page, size }));
    }

    const reset = () => {
        setParams({});
    }

    return (
        <PageContainer title={'用户反馈'}>
            <div className="p-6 min-h-screen bg-gray-50">
                <div className="max-w-[1600px] mx-auto flex flex-col gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col gap-6">
                        <div className="flex justify-between gap-4">
                            <Space size="middle">
                                {/* <Input
                                    placeholder="搜索..."
                                    prefix={<SearchOutlined className="text-gray-400" />}
                                    value={params?.keyword}
                                    onChange={e => setParams(prev => ({ ...prev, keyword: e.target.value }))}
                                    className="w-64"
                                /> */}
                                <Button
                                    icon={<ReloadOutlined />}
                                    onClick={reset}
                                    loading={initialLoading}
                                >
                                    刷新
                                </Button>
                            </Space>
                        </div>

                        <Table
                            rowKey="_id"
                            loading={initialLoading}
                            dataSource={list || []}
                            columns={columns}
                            pagination={{
                                current: Number(params?.page) || 1,
                                pageSize: Number(params?.size) || 20,
                                total: total,
                                showSizeChanger: true,
                                showTotal: (total) => `共 ${total} 条反馈`,
                                onChange: onPageChange,
                            }}
                        />
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}
