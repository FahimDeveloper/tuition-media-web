/* eslint-disable @typescript-eslint/no-explicit-any */

import { Table } from "antd";
import { memo, useRef } from "react";

type TProps = {
  columns: any;
  data: Array<any>;
  loading: boolean;
};

const DataTable = memo(({ columns, data, loading }: TProps) => {
  const tableRef = useRef<any>(null);
  const props: any = {
    bordered: true,
    loading: loading,
    pagination: false,
    showHeader: true,
    size: "middle",
  };
  return (
    <>
      <Table
        {...props}
        ref={tableRef}
        columns={columns}
        rowKey={(record) => record?.id}
        dataSource={data}
        scroll={{ x: "calc(700px + 30%)", y: "calc(100vh - 23em)" }}
      />
    </>
  );
});

export default DataTable;
