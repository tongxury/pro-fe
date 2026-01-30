import {ActionType, PageContainer, ProColumns, ProTable} from '@ant-design/pro-components';
import {useRef} from 'react';
import {queryUsers, queryWithdrawals, updateUser} from '@/services';
import moment from 'moment';
import UserView from "@/components/Views/User";
import Approve from "@/pages/Withdrawal/Applying/Approve";


export default () => {
    const actionRef = useRef<ActionType>();

    const columns: ProColumns[] = [
        {
            title: '用户',
            dataIndex: 'nickname',
            copyable: false,
            // renderFormItem: (schema, config, form, action) => <div></div>,
            render: (dom, entity) => <UserView data={entity.user} />,
            // ellipsis: true,
            fixed: 'left',
        },

        {
            title: '申请时间',
            search: false,
            render: (dom, entity) => moment(entity.createdAt * 1000).fromNow(),
        },
        {
            title: '金额',
            search: false,
            render: (dom, entity) => <div>
                {entity.amount?.value} {entity.token?.symbol}
            </div>,
        },

        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (text, record, _, action) => [
                // <UserProfile id={record?.user?.id} action={action} />,
                <Approve userId={record.user?._id} token={record.token?._id} action={action} />
            ],
        },
    ];

    return (<PageContainer>
            {/*<Summary />*/}
            {/* @ts-ignore */}
            <ProTable<any>
                style={{marginTop: 15}}
                columns={columns}
                actionRef={actionRef}
                cardBordered
                columnEmptyText={'-'}
                // scroll={{x: 1300}}
                request={async (params, sort, filter) => {
                    const msg = await queryWithdrawals({
                        status: 'withdrawalApplying',
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
                editable={{
                    type: 'multiple',
                }}
                columnsState={{
                    persistenceKey: 'pro-table-singe-demos',
                    persistenceType: 'localStorage',
                    defaultValue: {
                        option: {fixed: 'right', disable: true},
                    },
                    onChange(value) {
                        console.log('value: ', value);
                    },
                }}
                rowKey="id"
                search={{
                    labelWidth: 'auto',
                }}
                options={{
                    setting: {
                        listsHeight: 400,
                    },
                }}
                form={{
                    // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
                    syncToUrl: (values, type) => {
                        if (type === 'get') {
                            return {
                                ...values,
                                created_at: [values.startTime, values.endTime],
                            };
                        }
                        return values;
                    },
                }}
                pagination={{
                    defaultPageSize: 15,
                    showQuickJumper: true,
                    showSizeChanger: true,
                    // onChange: (page) => console.log(page),
                }}
                dateFormatter="string"
                headerTitle="申请列表"
                toolBarRender={() => []}
            />
        </PageContainer>
    );
};
