import { useMemo, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  useAllTuitionJobsQuery,
  useSingleTuitionJobsQuery,
} from "@/redux/features/tuition-jobs/tuitionJobsApi";
import type { JobBoardFilterQuery, TuitionJobsQuery } from "@/types";
import { getApiErrorMessage } from "@/utils/api-error.utils";
import { toTuitionJobView } from "@/utils/tuition-job.utils";

const listErrorFallback =
  "Please try again later. The tuition listings could not be loaded.";
const detailsErrorFallback =
  "Please try again later. This tuition could not be loaded.";

export function useTuitionJobBoard() {
  const [query, setQuery] = useState<TuitionJobsQuery>({});
  const { data = [], isLoading, isFetching, isError, error } =
    useAllTuitionJobsQuery(query);
  const errorMessage = getApiErrorMessage(error, listErrorFallback);
  const tuitions = useMemo(() => data.map(toTuitionJobView), [data]);

  const handleSearch = (search: string) => {
    setQuery((currentQuery) => ({
      ...currentQuery,
      ...(search ? { search } : { search: undefined }),
    }));
  };

  const handleFilter = (filterQuery: JobBoardFilterQuery) => {
    setQuery((currentQuery) => ({
      ...currentQuery,
      ...filterQuery,
    }));
  };

  return {
    tuitions,
    totalResults: tuitions.length,
    isLoading,
    isFetching,
    isError,
    errorMessage,
    handleSearch,
    handleFilter,
  };
}

export function useTuitionJobDetails(id?: string) {
  const { data, isLoading, isError, error } = useSingleTuitionJobsQuery(
    id ?? skipToken,
  );
  const errorMessage = getApiErrorMessage(error, detailsErrorFallback);
  const tuition = useMemo(
    () => (data ? toTuitionJobView(data) : undefined),
    [data],
  );

  return {
    tuition,
    isLoading,
    isError,
    errorMessage,
  };
}
