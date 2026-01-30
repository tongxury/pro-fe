import React, { useState, useEffect } from "react";
import { Table, Card, Input, Space, Button, Drawer, Descriptions, Spin, Tag, Typography, InputNumber, message, Popconfirm } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import useQueryListWithPolling from "@/hooks/useQueryListWithPolling.tsx";
import useUrlState from "@ahooksjs/use-url-state";
import PageContainer from "@/components/PageContainer";
import { listUsers, getUser, recharge } from "@/api/user";
import { useRequest } from "ahooks";
import dayjs from "dayjs";

import { Modal } from 'antd';

const { Text } = Typography;

const RechargeModal = ({ visible, onClose, onOk, loading }: { visible: boolean, onClose: () => void, onOk: (amount: number) => void, loading: boolean }) => {
    const [amount, setAmount] = useState<number | null>(null);

    useEffect(() => {
        if (visible) setAmount(null);
    }, [visible]);

    return (
        <Modal
            title="充值积分"
            open={visible}
            onCancel={onClose}
            confirmLoading={loading}
            onOk={() => amount && onOk(amount)}
            okButtonProps={{ disabled: !amount }}
            width={400}
        >
            <div className="py-4">
                <div className="mb-2 text-gray-500">请输入要增加的积分数量：</div>
                <InputNumber
                    className="w-full"
                    placeholder="例如: 100"
                    value={amount}
                    onChange={val => setAmount(Number(val))}
                    min={1}
                    precision={0}
                    addonAfter="积分"
                />
            </div>
        </Modal>
    );
};

const UserDetailDrawer = ({ id, onClose, visible }: { id: string | null, onClose: () => void, visible: boolean }) => {
    const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);
    const { data, loading, run, refresh } = useRequest(() => getUser({ id: id || '' }), {
        manual: true,
    });

    const { run: runRecharge, loading: recharging } = useRequest(
        async (amount: number) => {
            if (!id) return;
            await recharge({
                id,
                amount
            });
            message.success('充值成功');
            setIsRechargeModalOpen(false);
            refresh();
        },
        {
            manual: true,
        }
    );

    useEffect(() => {
        if (visible && id) {
            run();
        }
    }, [visible, id]);

    const user = data?.data?.user;
    const credit = data?.data?.creditState;

    return (
        <>
            <Drawer
                title="用户详情"
                placement="right"
                onClose={onClose}
                open={visible}
                width={600}
            >
                <Spin spinning={loading}>
                    {user && (
                        <div className="flex flex-col gap-6">
                            <Descriptions title="基本信息" bordered column={1}>
                                <Descriptions.Item label="用户ID">
                                    <Text copyable>{user?._id}</Text>
                                </Descriptions.Item>
                                <Descriptions.Item label="手机号">{user?.phone || '-'}</Descriptions.Item>
                                <Descriptions.Item label="注册时间">
                                    {user?.createdAt ? dayjs(user.createdAt * 1000).format('YYYY-MM-DD HH:mm:ss') : '-'}
                                </Descriptions.Item>
                            </Descriptions>

                            <Descriptions title="账户资产" bordered column={1}>
                                <Descriptions.Item label="当前余额">
                                    <div className="flex justify-between items-center w-full">
                                        <div>
                                            <span className="text-xl font-bold text-blue-600 mr-1">{credit?.balance || 0}</span>
                                            <span className="text-gray-500">积分</span>
                                        </div>
                                        <Button type="primary" size="small" onClick={() => setIsRechargeModalOpen(true)}>
                                            增加积分
                                        </Button>
                                    </div>
                                </Descriptions.Item>
                                <Descriptions.Item label="总额">
                                    {credit?.total || 0} 积分
                                </Descriptions.Item>
                            </Descriptions>
                        </div>
                    )}
                </Spin>
            </Drawer>

            <RechargeModal
                visible={isRechargeModalOpen}
                loading={recharging}
                onClose={() => setIsRechargeModalOpen(false)}
                onOk={runRecharge}
            />
        </>
    );
};

export default function UserList() {
    const [params, setParams] = useUrlState<any>({});
    const [viewId, setViewId] = useState<string | null>(null);

    const { list, total, reload, initialLoading } = useQueryListWithPolling<any, any>({
        service: listUsers,
        params: params,
        key: item => item._id,
        pollingFilter: () => false,
    });

    const columns = [
        {
            title: '用户ID',
            dataIndex: '_id',
            key: '_id',
            width: 200,
            ellipsis: true,
        },
        {
            title: '昵称',
            dataIndex: 'nickname',
            key: 'nickname',
            width: 150,
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
            width: 150,
        },
        {
            title: '余额',
            dataIndex: 'credit',
            key: 'credit',
            width: 100,
        },
        {
            title: '注册时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 180,
            render: (text: string) => text ? dayjs(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss') : '-',
        },
        {
            title: '操作',
            key: 'action',
            width: 100,
            render: (_: any, record: any) => (
                <Space size="middle">
                    <a onClick={() => setViewId(record._id)}>查看详情</a>
                </Space>
            ),
        },
    ];

    const onPageChange = (page: number, size: number) => {
        setParams(prev => ({ ...prev, page, size }));
    }

    const reset = () => {
        setParams({});
    }

    return (
        <PageContainer title={'用户管理'}>
            <div className="p-6 min-h-screen bg-gray-50">
                <div className="max-w-[1600px] mx-auto flex flex-col gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col gap-6">
                        <div className="flex justify-between gap-4">
                            <Space size="middle">
                                <Input
                                    placeholder="搜索用户..."
                                    prefix={<SearchOutlined className="text-gray-400" />}
                                    value={params?.keyword}
                                    onChange={e => setParams(prev => ({ ...prev, keyword: e.target.value }))}
                                    className="w-64"
                                />
                                <Button
                                    icon={<ReloadOutlined />}
                                    onClick={reset}
                                    loading={initialLoading}
                                >
                                    重置
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
                                showTotal: (total) => `共 ${total} 位用户`,
                                onChange: onPageChange,
                            }}
                        />
                    </div>
                </div>
            </div>

            <UserDetailDrawer
                id={viewId}
                visible={!!viewId}
                onClose={() => setViewId(null)}
            />
        </PageContainer>
    );
}
