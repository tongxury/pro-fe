import { Button, Pagination, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import './index.less';

interface Props {
  columns: ColumnsType<any>;
  selectable: boolean;
  exportable: boolean;
  pageSize: number;
  total: number;
  bordered?: boolean;
  rowClick?: (record: any, rowIndex: number) => void;
  pageChange?: ({ page, size }: { page: number; size: number }) => void; // 更新pageChange的类型定义
  dataSource: any[];
  children?: (text: any, record: any, index: number) => React.ReactNode;
}

const CustomTable: React.FC<Props> = ({
  columns,
  selectable = false,
  exportable = false,
  pageSize = 10,
  total = 0,
  dataSource,
  pageChange,
  rowClick,
  children,
  ...restProps
}) => {
  // 检查是否提供了children渲染函数，并创建操作列
  const actionColumn = children
    ? {
        title: '操作',
        key: 'action',
        render: (text: any, record: any, index: number) =>
          children ? children(text, record, index) : null,
      }
    : null;

  const combinedColumns = actionColumn ? [...columns, actionColumn] : columns;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);

  const handleSelectChange = (selectedKeys: React.Key[]) => {
    setSelectedRowKeys(selectedKeys);
  };

  const rowSelection = selectable
    ? {
        selectedRowKeys,
        onChange: handleSelectChange,
      }
    : undefined;

  const handleExport = () => {
    // 导出逻辑
  };
  const onRowClick = (record: any, rowIndex: number) => {
    // 这里是你想要在点击行时执行的代码
    if (rowClick) {
      rowClick(record, rowIndex);
    }
  };
  const exportButton = exportable ? (
    <Button onClick={handleExport}>导出</Button>
  ) : null;

  const handlePageChange = (page: number, size?: number) => {
    setCurrentPage(page);
    const newPageSize = size || currentPageSize;
    setCurrentPageSize(newPageSize);
    if (pageChange) pageChange({ page, size: newPageSize }); // 使用对象传递参数
  };

  return (
    <>
      {exportButton}
      <Table
        columns={combinedColumns}
        rowSelection={rowSelection}
        dataSource={dataSource}
        pagination={false}
        {...restProps}
        rowKey={(record) => `${record.id}-${currentPage}`}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => onRowClick(record, rowIndex ?? -1), // 绑定点击事件
            // 你还可以在这里绑定其他事件，例如 onDoubleClick, onContextMenu 等
          };
        }}
      />
      <Pagination
        current={currentPage}
        pageSize={currentPageSize}
        total={total}
        showSizeChanger
        showQuickJumper
        onChange={handlePageChange}
        onShowSizeChange={handlePageChange} // 添加onShowSizeChange回调
      />
    </>
  );
};

export default CustomTable;
