import {ProList} from '@ant-design/pro-components';
import {Button, Progress, Space, Tag, Typography} from 'antd';
import type {Key} from 'react';
import {useState} from 'react';
import {queryOrders, queryUsers} from "@/services";
import {useInfiniteScroll, useRequest} from "ahooks";
import TokenView from "@/components/Views/Token";
import WalletView from "@/components/Views/Wallet";
import {shortenDecimal, TXHash} from "@pro/chain";
import UserView from "@/components/Views/User";

export default () => {
    const [expandedRowKeys, setExpandedRowKeys] = useState<readonly Key[]>([]);

    return (
        <ProList
            // loading={loading}
            rowKey="_id"
            headerTitle="交易列表"
            // toolBarRender={() => {
            //   return [
            //     <Button key="3" type="primary">
            //       新建
            //     </Button>,
            //   ];
            // }}
            expandable={{expandedRowKeys, onExpandedRowsChange: setExpandedRowKeys}}
            // dataSource={data?.data?.list || []}
            request={async (params, sort, filter) => {
                console.log(sort, filter);

                const msg = await queryOrders({
                    ...params,
                    // keyword: params.email?.trim() || '',
                    page: params.current,
                    size: params.pageSize,
                });
                return {
                    data: msg.data?.list || [],
                    // success 请返回 true，
                    // 不然 table 会停止解析数据，即使有数据
                    success: !(msg.data?.code > 0),
                    // 不传会使用 data 的长度，如果是分页一定要传
                    total: msg.data?.total,
                };
            }}
            search={{
                labelWidth: 'auto',
            }}
            options={{
                // setting: {
                //     listsHeight: 400,
                // },
            }}
            form={{
                syncToUrl: (values, type) => {
                    // if (type === 'get') {
                    //     return {
                    //         ...values,
                    //         created_at: [values.startTime, values.endTime],
                    //     };
                    // }
                    return values;
                },
            }}
            pagination={{
                pageSize: 30,
                showQuickJumper: true,
                showSizeChanger: true,
                // onChange: (page) => console.log(page),
            }}
            dateFormatter="string"
            metas={{
                userId: {
                    // dataIndex: ''
                    title: '用户ID',
                    valueType: 'input'
                },
                tokenId: {
                    // dataIndex: ''
                    title: 'Token',
                    valueType: 'input'
                },
                side: {
                    // 自己扩展的字段，主要用于筛选，不在列表中显示
                    title: '方向',
                    valueType: 'radioButton',
                    valueEnum: {
                        buy: {
                            text: '买入',
                            status: 'Success',
                        },
                        sell: {
                            text: '卖出',
                            status: 'Error',
                        },
                    },
                },
                category: {
                    title: '分类',
                    valueType: 'radioButton',
                    valueEnum: {
                        market_quick: {
                            text: '市价(一键)',
                            status: 'Success',
                        },
                        market: {
                            text: '市价',
                            status: 'Error',
                        },
                        limit: {
                            text: '限价',
                            status: 'Error',
                        },
                    },
                },
                status: {
                    dataIndex: 'status',
                    title: '状态',
                    valueType: 'select',
                    valueEnum: {
                        uncompleted: {
                            text: '未完成',
                            status: 'processing',
                        },
                        completed: {
                            text: '已完成',
                            status: 'success',
                        },
                        cancelled: {
                            text: '已取消',
                            // status: 'Error',
                        },
                        failed: {
                            text: '执行失败',
                            status: 'Error',
                        },
                    },
                },
                //
                title: {
                    search: false,
                    render: (dom, entity, index, action, schema) => {
                        return (
                            <TokenView data={entity?.token?.metadata}/>
                        );
                    },
                },
                subTitle: {
                    search: false,
                    render: (dom, entity, index, action, schema) => {
                        return (
                            <Space  size={10} align={'center'}>
                                <UserView data={entity?.user}/>
                                <WalletView data={entity?.wallet}/>
                                <Tag color={entity?.side === 'buy' ? 'green' : 'red'}>
                                    {entity?.side} {shortenDecimal(entity?.quoteAmount?.value,)}
                                </Tag>
                                <Tag>{entity?.category}</Tag>
                            </Space>
                        );
                    },
                },
                // description: {
                //     render: () => {
                //         return 'Ant Design, a design language for background applications, is refined by Ant UED Team';
                //     },
                // },
                avatar: {search: false,},
                content: {
                    search: false,
                    // render: () => (
                    //     <div
                    //         style={{
                    //             minWidth: 200,
                    //             flex: 1,
                    //             display: 'flex',
                    //             justifyContent: 'flex-end',
                    //         }}
                    //     >
                    //         <div
                    //             style={{
                    //                 width: '200px',
                    //             }}
                    //         >
                    //             <div>发布中</div>
                    //             <Progress percent={80}/>
                    //         </div>
                    //     </div>
                    // ),
                },
                actions: {
                    render: (dom, entity, index, action, schema) => {
                        return <TXHash value={entity?.tx}/>;
                    },
                },
            }}
        />
    );
};