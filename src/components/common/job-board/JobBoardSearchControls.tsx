import { Button, Input } from "antd";
import { useState } from "react";
import type { ReactNode } from "react";
import type { JobBoardFilterQuery } from "@/types";
import JobBoardFilterDrawer from "./JobBoardFilterDrawer";

type JobBoardSearchControlsProps = {
  onFilter?: (query: JobBoardFilterQuery) => void;
  onSearch?: (search: string) => void;
  icon: ReactNode;
  placeholder: string;
  wrapperClassName: string;
  controlsClassName: string;
  inputClassName: string;
  buttonClassName: string;
  title?: string;
  filterButtonClassName?: string;
};

export default function JobBoardSearchControls({
  onFilter,
  onSearch,
  icon,
  placeholder,
  wrapperClassName,
  controlsClassName,
  inputClassName,
  buttonClassName,
  title,
  filterButtonClassName,
}: JobBoardSearchControlsProps) {
  const [search, setSearch] = useState("");

  const applySearch = () => {
    onSearch?.(search.trim());
  };

  return (
    <section className={wrapperClassName}>
      {title ? (
        <p className="text-text-muted text-xs font-semibold tracking-[0.14em] uppercase">
          {title}
        </p>
      ) : null}
      <div className={controlsClassName}>
        <div className="flex-1">
          <Input
            size="large"
            prefix={icon}
            placeholder={placeholder}
            className={inputClassName}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onPressEnter={applySearch}
          />
        </div>
        <JobBoardFilterDrawer
          onApply={onFilter}
          buttonClassName={filterButtonClassName}
        />
        <Button
          type="primary"
          size="large"
          className={buttonClassName}
          onClick={applySearch}
        >
          Search
        </Button>
      </div>
    </section>
  );
}
