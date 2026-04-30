import {Button, Input} from 'antd';
import {FiSearch} from 'react-icons/fi';

import JobBoardFilterDrawer from '../../shared/JobBoardFilterDrawer';

export default function JobBoardSearchPanel() {
  return (
    <section className="rounded-2xl border border-border bg-surface-elevated p-4 shadow-theme-sm sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
            Search tuition jobs
          </p>
          <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center">
            <Input
              size="large"
              prefix={<FiSearch className="text-text-soft" />}
              placeholder="Search by area, location, or address"
              className="h-11 rounded-lg border-border bg-surface-elevated text-text-strong shadow-theme-xs placeholder:text-text-soft"
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
