import {Button, Input} from 'antd';
import {MdOutlineManageSearch} from 'react-icons/md';
import FilterDrawer from './FilterDrawer';
import JobBoardFilterDrawer from '../shared/JobBoardFilterDrawer';

const TuitionSearchBar = () => {
  return (
    <div className="rounded-2xl border border-border bg-surface-elevated/84 p-3 shadow-theme-lg backdrop-blur">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex-1">
          <Input
            size="large"
            prefix={
              <MdOutlineManageSearch className="text-lg text-text-soft" />
            }
            placeholder="Search by area, location, or address (e.g. Dhanmondi)"
            className="h-[44px] rounded-xl border-border bg-surface-elevated text-text-strong shadow-none"
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
