import { Button, Input } from "antd";
import { FiSearch } from "react-icons/fi";

import JobBoardFilterDrawer from "../../../tuition_jobs/components/JobBoardFilterDrawer";

export default function JobBoardSearchPanel() {
  return (
    <section className="border-border bg-surface-elevated shadow-theme-sm rounded-2xl border p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-text-muted text-xs font-semibold tracking-[0.14em] uppercase">
            Search tuition jobs
          </p>
          <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center">
            <Input
              size="large"
              prefix={<FiSearch className="text-text-soft" />}
              placeholder="Search by area, location, or address"
              className="border-border bg-surface-elevated text-text-strong shadow-theme-xs placeholder:text-text-soft h-11 rounded-lg"
            />
            <div className="flex items-center gap-3">
              <JobBoardFilterDrawer />
              <Button
                type="primary"
                size="large"
                className="h-11 rounded-lg px-5 text-sm font-semibold"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
