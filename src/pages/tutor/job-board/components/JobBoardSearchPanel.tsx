import { FiSearch } from "react-icons/fi";

import { JobBoardSearchControls } from "@/components/common/job-board";
import type { JobBoardFilterQuery } from "@/types";

type JobBoardSearchPanelProps = {
  onFilter?: (query: JobBoardFilterQuery) => void;
  onSearch?: (search: string) => void;
};

export default function JobBoardSearchPanel({
  onFilter,
  onSearch,
}: JobBoardSearchPanelProps) {
  return (
    <div className="border-border bg-surface-elevated shadow-theme-sm rounded-2xl border p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0 flex-1">
          <JobBoardSearchControls
            onSearch={onSearch}
            onFilter={onFilter}
            icon={<FiSearch className="text-text-soft" />}
            placeholder="Search by area, location, or address"
            title="Search tuition jobs"
            wrapperClassName=""
            controlsClassName="mt-3 flex flex-col gap-3 md:flex-row md:items-center"
            inputClassName="border-border bg-surface-elevated text-text-strong shadow-theme-xs placeholder:text-text-soft h-11 rounded-lg"
            buttonClassName="h-11 rounded-lg px-5 text-sm font-semibold"
          />
        </div>
      </div>
    </div>
  );
}
