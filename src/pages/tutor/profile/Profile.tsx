import { useCallback, useEffect, useMemo, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { Alert, Button, Empty, Skeleton, message } from "antd";
import PageBreadcrumb from "@/components/layout/shared/PageBreadcrumb";
import UserMetaCard from "@/components/layout/tutor/profile/UserMetaCard";
import PersonalInfoSection from "@/components/layout/tutor/profile/personal/PersonalInfoSection";
import TuitionPreferenceSection from "@/components/layout/tutor/profile/tuition/TuitionPreferenceSection";
import PageMeta from "@/components/common/PageMeta";
import EducationInfoSection from "@/components/layout/tutor/profile/education/EducationInfoSection";
import EmergencyContactSection from "@/components/layout/tutor/profile/emergencyContact/EmergencyContactSection";
import {
  buildEducationProfilePatch,
  buildEmergencyContactProfilePatch,
  buildPersonalInfoProfilePatch,
  buildTuitionPreferenceProfilePatch,
  applyTeacherProfileUpdate,
  getEducationValuesForDiplomaMode,
  getProfileErrorMessage,
  mapTeacherToProfileViewModel,
  type EducationSectionKey,
  type ProfileSectionKey,
  type TeacherProfilePatchPayload,
  type TeacherProfile,
} from "@/components/layout/tutor/profile/profileAdapters";
import type { EmergencyContactValues } from "@/components/layout/tutor/profile/emergencyContact/EmergencyContactTypes";
import type { EducationValues } from "@/components/layout/tutor/profile/education/educationTypes";
import type { PersonalInfoValues } from "@/components/layout/tutor/profile/personal/personalInfoTypes";
import type { TuitionPreferenceValues } from "@/components/layout/tutor/profile/tuition/tuitionPreferenceTypes";
import {
  useTeacherProfileQuery,
  useUpdateTeacherProfileMutation,
} from "@/redux/features/teachers/teachersProfileApi";
import { useAppSelector } from "@/hooks/useAppHooks";

type SectionErrors = Partial<Record<ProfileSectionKey, string>>;

const EDUCATION_SECTION_KEYS = new Set<ProfileSectionKey>([
  "school",
  "college",
  "diploma",
  "graduation",
  "post_graduation",
]);

const isEducationSectionKey = (
  key: ProfileSectionKey | null,
): key is EducationSectionKey =>
  Boolean(key && EDUCATION_SECTION_KEYS.has(key));

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
    async (sectionKey: ProfileSectionKey, patch: TeacherProfilePatchPayload) => {
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
        messageApi.success("Profile updated successfully.");
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

  const handlePersonalInfoSave = useCallback(
    (values: PersonalInfoValues) =>
      saveProfileSection(
        "personalInfo",
        buildPersonalInfoProfilePatch(values),
      ),
    [saveProfileSection],
  );

  const handleEmergencyContactSave = useCallback(
    (values: EmergencyContactValues) =>
      saveProfileSection(
        "emergencyContact",
        buildEmergencyContactProfilePatch(values),
      ),
    [saveProfileSection],
  );

  const handleTuitionPreferenceSave = useCallback(
    (values: TuitionPreferenceValues) =>
      saveProfileSection(
        "tuitionPreference",
        buildTuitionPreferenceProfilePatch(values),
      ),
    [saveProfileSection],
  );

  const handleEducationSave = useCallback(
    <TKey extends EducationSectionKey>(
      sectionKey: TKey,
      values: EducationValues[TKey],
    ) =>
      saveProfileSection(
        sectionKey,
        buildEducationProfilePatch(activeProfile?.education, sectionKey, values),
      ),
    [activeProfile?.education, saveProfileSection],
  );

  const handleDiplomaToggle = useCallback((checked: boolean) => {
    const education = getEducationValuesForDiplomaMode(
      profileValues.education,
      checked,
    );

    setEditedProfile((currentProfile) =>
      applyTeacherProfileUpdate(currentProfile ?? activeProfile, { education }),
    );
  }, [activeProfile, profileValues.education]);

  const handleAvatarChange = useCallback((avatarUrl: string) => {
    setEditedProfile((currentProfile) =>
      applyTeacherProfileUpdate(currentProfile ?? activeProfile, {
        profile_picture: avatarUrl,
      }),
    );
  }, [activeProfile]);

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
