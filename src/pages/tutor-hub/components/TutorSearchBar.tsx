import { Button, Input } from "antd";
import { useState } from "react";
import { MdOutlineManageSearch } from "react-icons/md";
import type { JobBoardFilterQuery } from "@/types";
import JobBoardFilterDrawer from "./TutorFilterDrawer";

type TuitionSearchBarProps = {
  onFilter?: (query: JobBoardFilterQuery) => void;
  onSearch?: (search: string) => void;
};

const TuitionSearchBar = ({ onFilter, onSearch }: TuitionSearchBarProps) => {
  const [search, setSearch] = useState("");

  const applySearch = () => {
    onSearch?.(search.trim());
  };

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
            className="border-border bg-surface-elevated text-text-strong h-11 rounded-xl shadow-none"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onPressEnter={applySearch}
          />
        </div>

        <JobBoardFilterDrawer onApply={onFilter} />

        <Button
          type="primary"
          size="large"
          className="h-11 rounded-xl px-6 font-medium"
          onClick={applySearch}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default TuitionSearchBar;
