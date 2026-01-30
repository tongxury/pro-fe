import ComForm from '@/components/ComForm';
import ComTable from '@/components/ComTable';
import { getAssets } from '@/services';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import './index.less';
export default function Embrave() {
  const fields = [
    // {
    //   type: 'input' as const,
    //   name: 'name',
    //   label: 'Name',
    //   rules: [{ required: true, message: 'Please enter your name' }],
    // },
    {
      type: 'select' as const,
      name: 'status',
      label: '审核状态',
      options: [
        { value: 'pending', label: 'In Verification' },
        { value: 'normal', label: 'Succeeded' },
        { value: 'discard', label: 'Failed' },
      ],
      onChange: (value: string) => {
        console.log(`Selected status: ${value}`);
        // 这里可以添加更多的逻辑
      },
      // rules: [{ required: true, message: 'Please select your gender' }],
    },
    // {
    //   type: 'checkbox' as const,
    //   name: 'hobbies',
    //   label: 'Hobbies',
    //   options: [
    //     { value: 'reading', label: 'Reading' },
    //     { value: 'sports', label: 'Sports' },
    //     { value: 'music', label: 'Music' },
    //   ],
    // },
    // 添加其他字段...
  ];
  const onFinish = (values: any) => {
    console.log('Form values:', values);
    // 处理表单提交逻辑
  };
  const columns = [
    { title: '文件名', dataIndex: 'fileName', key: 'fileName' },
    { title: '学校', dataIndex: 'school', key: 'school' },
    { title: '课程', dataIndex: 'course', key: 'course' },
    { title: '年份', dataIndex: 'year', key: 'year' },
    { title: '状态', dataIndex: 'status', key: 'status' },
  ];
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const getData = async (params: { size: number; page: number }) => {
    const { data } = await getAssets(params);
    console.log(data, 53);
    const arr = (data?.assets || []).map((item: any, index: number) => {
      const { file, status } = item;
      return {
        ...item,
        fileName: file.name,
        key: index,
        status: status.name,
      };
    });
    setList(arr);
    setTotal(data?.total || 0);
  };
  useEffect(() => {
    getData({ page: 1, size: 10 });
  }, []);
  const currentChange = (params: any) => {
    const { page, size } = params;
    getData({ page, size });
  };
  const currentRowClick = (record: any, rowIndex: number) => {
    console.log(record, rowIndex, 82);
  };
  return (
    <div className="embrave">
      <ComForm fields={fields} onFinish={onFinish}></ComForm>
      <div className="com-table">
        <ComTable
          columns={columns}
          selectable={false}
          exportable={false}
          pageSize={10}
          total={total}
          pageChange={currentChange}
          rowClick={currentRowClick}
          dataSource={list}
        >
          {(text, record, index) => (
            <div className="table-columns">
              <Button onClick={() => console.log('通过操作', record, index)}>
                通过
              </Button>
              <Button onClick={() => console.log('不通过操作', record)}>
                不通过
              </Button>
            </div>
          )}
        </ComTable>
      </div>
    </div>
  );
}
