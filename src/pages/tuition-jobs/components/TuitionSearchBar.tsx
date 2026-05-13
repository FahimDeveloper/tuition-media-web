import { MdOutlineManageSearch } from "react-icons/md";
import type { JobBoardFilterQuery } from "@/types";
import { JobBoardSearchControls } from "@/components/common/job-board";

type TuitionSearchBarProps = {
  onFilter?: (query: JobBoardFilterQuery) => void;
  onSearch?: (search: string) => void;
};

const TuitionSearchBar = ({ onFilter, onSearch }: TuitionSearchBarProps) => (
  <JobBoardSearchControls
    onSearch={onSearch}
    onFilter={onFilter}
    icon={<MdOutlineManageSearch className="text-text-soft text-lg" />}
    placeholder="Search by area, location, or address (e.g. Dhanmondi)"
    wrapperClassName="border-border bg-surface-elevated/84 shadow-theme-lg rounded-2xl border p-3 backdrop-blur"
    controlsClassName="flex flex-col gap-3 md:flex-row md:items-center"
    inputClassName="border-border bg-surface-elevated text-text-strong h-11 rounded-xl shadow-none"
    buttonClassName="h-11 rounded-xl px-6 font-medium"
  />
);

export default TuitionSearchBar;
