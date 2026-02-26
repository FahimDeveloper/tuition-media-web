import { Pagination } from "antd";

type TProps = {
  onChange: (page: number, size: number) => void;
  page: number;
  limit: number;
  total: number | undefined;
};

const DataPagination = ({ onChange, page, total, limit }: TProps) => {
  return (
    <>
      <Pagination
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
        onChange={onChange}
        total={total}
        pageSizeOptions={[10, 20, 30, 50, 100]}
        current={page}
        pageSize={limit}
        showSizeChanger={true}
      />
    </>
  );
};

export default DataPagination;
