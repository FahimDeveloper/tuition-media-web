import { Button, Input } from "antd";
import { MdOutlineManageSearch } from "react-icons/md";
import JobBoardFilterDrawer from "../shared/JobBoardFilterDrawer";

const TuitionSearchBar = () => {
  return (
    <div className="border-border bg-surface-elevated/84 shadow-theme-lg rounded-2xl border p-3 backdrop-blur">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex-1">
          <Input
            size="large"
            prefix={
              <MdOutlineManageSearch className="text-text-soft text-lg" />
            }
            placeholder="Search by area, location, or address (e.g. Dhanmondi)"
            className="border-border bg-surface-elevated text-text-strong h-[44px] rounded-xl shadow-none"
          />
        </div>

        <JobBoardFilterDrawer />

        <Button
          type="primary"
          size="large"
          className="h-11 rounded-xl px-6 font-medium"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default TuitionSearchBar;
