import { useCallback, useEffect, useMemo, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { Alert, Button, Empty, Skeleton, message } from "antd";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import { useAppSelector } from "@/hooks/useAppHooks";
import {
  useTeacherProfileQuery,
  useUpdateTeacherProfileMutation,
} from "@/redux/features/teachers/teachersProfileApi";

import UserMetaCard from "@/pages/tutor/profile/UserMetaCard";
import PersonalInfoSection from "@/pages/tutor/profile/sections/PersonalInfo";
import TuitionPreferenceSection from "@/pages/tutor/profile/sections/TuitionPreference";
import EmergencyContactSection from "@/pages/tutor/profile/sections/EmergencyContact";
import EducationInfoSection from "@/pages/tutor/profile/sections/Education";
import {
  applyTeacherProfileUpdate,
  buildEducationProfilePatch,
  buildEmergencyContactProfilePatch,
  buildPersonalInfoProfilePatch,
  buildTuitionPreferenceProfilePatch,
  createBlankEducationSectionValues,
  getEducationValuesForDiplomaMode,
  getProfileErrorMessage,
  mapTeacherToProfileViewModel,
  type EducationSectionKey,
  type EducationValues,
  type ProfileSectionKey,
  type TeacherProfile,
  type TeacherProfilePatchPayload,
} from "@/pages/tutor/profile/profileModel";

type SectionErrors = Partial<Record<ProfileSectionKey, string>>;

type ProfilePatchBuilder<TValues> = (
  values: TValues,
) => TeacherProfilePatchPayload;

const EDUCATION_SECTION_KEYS: readonly EducationSectionKey[] = [
  "school",
  "college",
  "diploma",
  "graduation",
  "post_graduation",
];

const isEducationSectionKey = (
  key: ProfileSectionKey | null,
): key is EducationSectionKey =>
  Boolean(key && EDUCATION_SECTION_KEYS.includes(key as EducationSectionKey));

export default function TutorProfile() {
  const { user } = useAppSelector((state) => state.auth);
  const teacherId = user?._id;
  const [messageApi, contextHolder] = message.useMessage();

  const {
    data: fetchedProfile,
    error: profileError,
    isError: isProfileError,
    isFetching: isProfileFetching,
    isLoading: isProfileLoading,
    isSuccess: isProfileSuccess,
    refetch: refetchTeacherProfile,
  } = useTeacherProfileQuery(teacherId ?? skipToken);

  const [updateTeacherProfile] = useUpdateTeacherProfileMutation();

  const [editedProfile, setEditedProfile] = useState<TeacherProfile | null>(
    null,
  );
  const [savingSectionKey, setSavingSectionKey] =
    useState<ProfileSectionKey | null>(null);
  const [sectionErrors, setSectionErrors] = useState<SectionErrors>({});

  useEffect(() => {
    setEditedProfile(fetchedProfile ?? null);
  }, [fetchedProfile]);

  const activeProfile = editedProfile ?? fetchedProfile;
  const profileValues = useMemo(
    () => mapTeacherToProfileViewModel(activeProfile),
    [activeProfile],
  );

  const profileLoadErrorMessage = useMemo(
    () =>
      isProfileError
        ? getProfileErrorMessage(
            profileError,
            "Unable to load profile information. Please try again.",
          )
        : "",
    [isProfileError, profileError],
  );

  const isProfileEmpty =
    isProfileSuccess &&
    (!activeProfile || Object.keys(activeProfile).length === 0);

  const clearSaveError = useCallback((sectionKey: ProfileSectionKey) => {
    setSectionErrors((previous) => {
      if (!previous[sectionKey]) return previous;

      const nextErrors = { ...previous };
      delete nextErrors[sectionKey];
      return nextErrors;
    });
  }, []);

  const patchTeacherProfile = useCallback(
    async (
      patch: TeacherProfilePatchPayload,
    ): Promise<TeacherProfile | undefined> => {
      if (!teacherId) {
        throw new Error("No authenticated teacher found.");
      }

      return updateTeacherProfile({ teacherId, patch }).unwrap();
    },
    [teacherId, updateTeacherProfile],
  );

  const saveProfileSection = useCallback(
    async (
      sectionKey: ProfileSectionKey,
      patch: TeacherProfilePatchPayload,
      successMessage = "Profile updated successfully.",
    ) => {
      setSavingSectionKey(sectionKey);
      clearSaveError(sectionKey);

      try {
        const serverProfile = await patchTeacherProfile(patch);

        setEditedProfile((currentProfile) =>
          applyTeacherProfileUpdate(
            currentProfile ?? activeProfile,
            patch,
            serverProfile,
          ),
        );
        messageApi.success(successMessage);
      } catch (error) {
        setSectionErrors((previous) => ({
          ...previous,
          [sectionKey]: getProfileErrorMessage(error),
        }));
        throw error;
      } finally {
        setSavingSectionKey(null);
      }
    },
    [activeProfile, clearSaveError, messageApi, patchTeacherProfile],
  );

  const createSectionSaveHandler = useCallback(
    <TValues,>(
      sectionKey: ProfileSectionKey,
      buildPatch: ProfilePatchBuilder<TValues>,
    ) =>
      (values: TValues) =>
        saveProfileSection(sectionKey, buildPatch(values)),
    [saveProfileSection],
  );

  const handlePersonalInfoSave = useMemo(
    () =>
      createSectionSaveHandler("personalInfo", buildPersonalInfoProfilePatch),
    [createSectionSaveHandler],
  );

  const handleEmergencyContactSave = useMemo(
    () =>
      createSectionSaveHandler(
        "emergencyContact",
        buildEmergencyContactProfilePatch,
      ),
    [createSectionSaveHandler],
  );

  const handleTuitionPreferenceSave = useMemo(
    () =>
      createSectionSaveHandler(
        "tuitionPreference",
        buildTuitionPreferenceProfilePatch,
      ),
    [createSectionSaveHandler],
  );

  const handleEducationSave = useCallback(
    <TKey extends EducationSectionKey>(
      sectionKey: TKey,
      values: EducationValues[TKey],
    ) =>
      saveProfileSection(
        sectionKey,
        buildEducationProfilePatch(
          activeProfile?.education,
          sectionKey,
          values,
        ),
      ),
    [activeProfile?.education, saveProfileSection],
  );

  const handleEducationDelete = useCallback(
    <TKey extends EducationSectionKey>(sectionKey: TKey) =>
      saveProfileSection(
        sectionKey,
        buildEducationProfilePatch(
          activeProfile?.education,
          sectionKey,
          createBlankEducationSectionValues(sectionKey),
        ),
        "Profile section cleared successfully.",
      ),
    [activeProfile?.education, saveProfileSection],
  );

  const handleDiplomaToggle = useCallback(
    (checked: boolean) => {
      const education = getEducationValuesForDiplomaMode(
        profileValues.education,
        checked,
      );

      setEditedProfile((currentProfile) =>
        applyTeacherProfileUpdate(currentProfile ?? activeProfile, {
          education,
        }),
      );
    },
    [activeProfile, profileValues.education],
  );

  const handleAvatarChange = useCallback(
    (avatarUrl: string) => {
      setEditedProfile((currentProfile) =>
        applyTeacherProfileUpdate(currentProfile ?? activeProfile, {
          profile_picture: avatarUrl,
        }),
      );
    },
    [activeProfile],
  );

  const educationSaveErrors: Partial<Record<EducationSectionKey, string>> = {
    school: sectionErrors.school,
    college: sectionErrors.college,
    diploma: sectionErrors.diploma,
    graduation: sectionErrors.graduation,
    post_graduation: sectionErrors.post_graduation,
  };
  const educationSavingSection = isEducationSectionKey(savingSectionKey)
    ? savingSectionKey
    : null;

  return (
    <>
      {contextHolder}
      <PageMeta
        title="Tutor Profile | TutoriumBD"
        description="Manage tutor profile information for TutoriumBD."
      />
      <div className="border-border bg-surface-elevated rounded-2xl border p-5 lg:p-6">
        <PageBreadcrumb pageTitle="Profile" />

        {!teacherId ? (
          <Alert
            type="warning"
            showIcon
            message="No authenticated teacher found"
            description="Please log in again to manage your tutor profile."
            className="rounded-lg!"
          />
        ) : isProfileLoading ? (
          <div className="space-y-6">
            <Skeleton active paragraph={{ rows: 4 }} />
            <Skeleton active paragraph={{ rows: 6 }} />
          </div>
        ) : profileLoadErrorMessage ? (
          <Alert
            type="error"
            showIcon
            message="Unable to load profile"
            description={profileLoadErrorMessage}
            action={
              <Button size="small" onClick={refetchTeacherProfile}>
                Retry
              </Button>
            }
            className="rounded-lg!"
          />
        ) : isProfileEmpty ? (
          <Empty
            description="No profile information found."
            className="rounded-lg border border-gray-200 py-12 dark:border-gray-800"
          />
        ) : (
          <div className="space-y-6">
            {isProfileFetching ? (
              <Alert
                type="info"
                showIcon
                message="Refreshing profile information..."
                className="rounded-lg!"
              />
            ) : null}

            <UserMetaCard
              values={profileValues.meta}
              isFetching={isProfileFetching}
              onAvatarChange={handleAvatarChange}
            />

            <PersonalInfoSection
              values={profileValues.personalInfo}
              onSave={handlePersonalInfoSave}
              isSaving={savingSectionKey === "personalInfo"}
              saveError={sectionErrors.personalInfo}
              onClearSaveError={() => clearSaveError("personalInfo")}
            />

            <TuitionPreferenceSection
              values={profileValues.tuitionPreference}
              onSave={handleTuitionPreferenceSave}
              isSaving={savingSectionKey === "tuitionPreference"}
              saveError={sectionErrors.tuitionPreference}
              onClearSaveError={() => clearSaveError("tuitionPreference")}
            />

            <EmergencyContactSection
              values={profileValues.emergencyContact}
              onSave={handleEmergencyContactSave}
              isSaving={savingSectionKey === "emergencyContact"}
              saveError={sectionErrors.emergencyContact}
              onClearSaveError={() => clearSaveError("emergencyContact")}
            />

            <EducationInfoSection
              values={profileValues.education}
              onSave={handleEducationSave}
              onDelete={handleEducationDelete}
              onDiplomaToggle={handleDiplomaToggle}
              savingSection={educationSavingSection}
              saveErrors={educationSaveErrors}
              onClearSaveError={clearSaveError}
            />
          </div>
        )}
      </div>
    </>
  );
}
