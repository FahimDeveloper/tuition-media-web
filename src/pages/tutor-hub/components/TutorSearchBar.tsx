import { useState } from "react";
import { Button, Input } from "antd";
import { MdOutlineManageSearch } from "react-icons/md";
import type { PublicTeachersQuery } from "@/types";
import TutorFilterDrawer from "./TutorFilterDrawer";

type TutorSearchBarProps = {
  onFilter?: (query: PublicTeachersQuery) => void;
  onSearch?: (search: string) => void;
};

const TutorSearchBar = ({ onFilter, onSearch }: TutorSearchBarProps) => {
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

        <TutorFilterDrawer onApply={onFilter} />

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

export default TutorSearchBar;
