import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Flex, message, Tag } from 'antd';
import { useRef } from 'react';
import { queryUsers, updateUser } from '@/services';
import moment from 'moment';


export default () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns[] = [
    {
      title: 'Nickname',
      dataIndex: 'nickname',
      copyable: true,
      // renderFormItem: (schema, config, form, action) => <div></div>,
      render: (dom, entity) => <div>{entity.nickname}</div>,
      // ellipsis: true,
      fixed: 'left',
    },
    {
      title: 'ID',
      search: false,
      copyable: true,
      width: 220,
      render: (dom, entity) => <div>{entity._id}</div>,
    },
    {
      title: 'Register Time',
      search: false,
      render: (dom, entity) => moment(entity.createdAt * 1000).fromNow(),
      search: false,
    },
    //
    // {
    //   title: 'Option',
    //   valueType: 'option',
    //   key: 'option',
    //   render: (text, record, _, action) => [
    //     <UserProfile id={record?.user?.id} action={action} />,
    //   ],
    // },
  ];

  return (<PageContainer>
      {/*<Summary />*/}
      <ProTable<any>
        style={{ marginTop: 15 }}
        columns={columns}
        actionRef={actionRef}
        cardBordered
        columnEmptyText={'-'}
        scroll={{ x: 1300 }}
        request={async (params, sort, filter) => {
          console.log(sort, filter);

          const msg = await queryUsers({
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
            option: { fixed: 'right', disable: true },
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
        headerTitle="用户列表"
        toolBarRender={() => []}
      />
    </PageContainer>
  );
};
