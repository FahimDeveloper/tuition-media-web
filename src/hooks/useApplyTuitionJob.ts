import { useCallback, useMemo, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/useAppHooks";
import {
  useAppliedTuitionJobsQuery,
  useApplyTuitionJobMutation,
} from "@/redux/features/tuition-job-application/tuitionJobApplicationApi";
import type { AppliedApplication } from "@/types";
import { getApiErrorMessage } from "@/utils/api-error.utils";

const defaultAppliedJobsErrorMessage =
  "Unable to check previous applications.";

export function useApplyTuitionJob(tuitionJobId: string) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, accessToken } = useAppSelector((state) => state.auth);
  const applicantId = user?._id;
  const isLoggedIn = Boolean(user && accessToken);
  const [submittedTuitionJobId, setSubmittedTuitionJobId] = useState("");
  const [applyTuitionJob, { isLoading: isApplying }] =
    useApplyTuitionJobMutation();
  const {
    data: appliedApplications = [],
    isLoading: isLoadingAppliedJobs,
    isFetching: isFetchingAppliedJobs,
    isError: isAppliedJobsError,
    error: appliedJobsError,
  } = useAppliedTuitionJobsQuery(
    isLoggedIn && applicantId ? applicantId : skipToken,
  );
  const isCheckingAppliedJobs = isLoadingAppliedJobs || isFetchingAppliedJobs;

  const isAlreadyApplied = useMemo(
    () =>
      submittedTuitionJobId === tuitionJobId ||
      appliedApplications.some(
        (application) =>
          application.applicant === applicantId &&
          getAppliedJobId(application) === tuitionJobId,
      ),
    [applicantId, appliedApplications, submittedTuitionJobId, tuitionJobId],
  );
  const appliedJobsErrorMessage = isAppliedJobsError
    ? getApiErrorMessage(appliedJobsError, defaultAppliedJobsErrorMessage)
    : "";
  const isApplyDisabled =
    isApplying ||
    isCheckingAppliedJobs ||
    isAlreadyApplied ||
    Boolean(appliedJobsErrorMessage);
  const applyButtonLabel = getApplyButtonLabel({
    isAlreadyApplied,
    isApplying,
    isCheckingAppliedJobs,
    isLoggedIn,
    hasAppliedJobsError: Boolean(appliedJobsErrorMessage),
  });

  const handleApply = useCallback(async () => {
    if (!isLoggedIn) {
      navigate("/login", {
        state: {
          from: `${location.pathname}${location.search}${location.hash}`,
        },
      });
      return;
    }

    if (!tuitionJobId) {
      message.error(
        "Unable to apply because this tuition job could not be identified.",
      );
      return;
    }

    if (!applicantId) {
      message.error(
        "Unable to apply because your tutor account could not be identified.",
      );
      return;
    }

    if (isCheckingAppliedJobs) {
      message.info(
        "Checking your previous applications. Please try again shortly.",
      );
      return;
    }

    if (appliedJobsErrorMessage) {
      message.error(appliedJobsErrorMessage);
      return;
    }

    if (isAlreadyApplied) {
      message.info("You have already applied for this tuition job.");
      return;
    }

    try {
      await applyTuitionJob({
        job: tuitionJobId,
        applicant: applicantId,
      }).unwrap();
      setSubmittedTuitionJobId(tuitionJobId);
      message.success("Application submitted successfully.");
    } catch (error) {
      message.error(getApiErrorMessage(error, "Unable to submit application."));
    }
  }, [
    applicantId,
    appliedJobsErrorMessage,
    applyTuitionJob,
    isCheckingAppliedJobs,
    isAlreadyApplied,
    isLoggedIn,
    location.hash,
    location.pathname,
    location.search,
    navigate,
    tuitionJobId,
  ]);

  return {
    handleApply,
    applyButtonLabel,
    isApplying,
    isCheckingAppliedJobs,
    isApplyDisabled,
    isLoggedIn,
    isAlreadyApplied,
    appliedJobsErrorMessage,
  };
}

function getAppliedJobId(application: AppliedApplication) {
  if (typeof application.job === "string") {
    return application.job;
  }

  return application.job._id ?? application.job.id ?? "";
}

function getApplyButtonLabel({
  isAlreadyApplied,
  isApplying,
  isCheckingAppliedJobs,
  isLoggedIn,
  hasAppliedJobsError,
}: {
  isAlreadyApplied: boolean;
  isApplying: boolean;
  isCheckingAppliedJobs: boolean;
  isLoggedIn: boolean;
  hasAppliedJobsError: boolean;
}) {
  if (isAlreadyApplied) {
    return "Already applied";
  }

  if (isApplying) {
    return "Applying...";
  }

  if (isCheckingAppliedJobs) {
    return "Checking application...";
  }

  if (hasAppliedJobsError) {
    return "Unable to verify application";
  }

  return isLoggedIn ? "Apply now" : "Login to apply";
}
