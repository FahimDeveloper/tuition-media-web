import {Input, Button} from 'antd';
import {MdOutlineManageSearch} from 'react-icons/md';
import {FiSliders} from 'react-icons/fi';
import FilterDrawer from './FilterDrawer';

const TuitionSearchBar = () => {
  return (
    <div className="rounded-2xl border border-black/5 bg-white/80 p-3 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        {/* Location Input */}
        <div className="flex-1">
          <Input
            size="large"
            prefix={<MdOutlineManageSearch className="text-lg text-gray-400" />}
            placeholder="Search by area, location, or address (e.g. Dhanmondi)"
            className="h-[44px] rounded-xl"
          />
        </div>

        {/* More Filters */}
        <FilterDrawer />

        {/* Search Button */}
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
