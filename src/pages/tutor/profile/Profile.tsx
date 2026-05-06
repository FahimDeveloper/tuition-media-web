import { useCallback, useState } from "react";
import { Alert, Button, Skeleton } from "antd";
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
  createDefaultProfileViewModel,
  getEducationValuesForDiplomaMode,
  getProfileErrorMessage,
  mapTeacherToProfileViewModel,
  type EducationSectionKey,
  type ProfileSectionKey,
  type TeacherProfilePatchPayload,
  type TutorProfileViewModel,
} from "@/components/layout/tutor/profile/profileAdapters";
import type { EmergencyContactValues } from "@/components/layout/tutor/profile/emergencyContact/EmergencyContactTypes";
import type { EducationValues } from "@/components/layout/tutor/profile/education/educationTypes";
import type { PersonalInfoValues } from "@/components/layout/tutor/profile/personal/personalInfoTypes";
import type { TuitionPreferenceValues } from "@/components/layout/tutor/profile/tuition/tuitionPreferenceTypes";
import { useSingleTeacherQuery } from "@/redux/features/teachers/teachersProfileApi";
import { useAppSelector } from "@/hooks/useAppHooks";
import da from "@fullcalendar/core/locales/da.js";

type ProfileSaveErrors = Partial<Record<ProfileSectionKey, string>>;
type ProfileQueryState = {
  isLoading: boolean;
  isFetching: boolean;
  errorMessage: string;
};

const PROFILE_QUERY_STATE: ProfileQueryState = {
  isLoading: false,
  isFetching: false,
  errorMessage: "",
};

const isEducationSectionKey = (
  sectionKey: ProfileSectionKey | null,
): sectionKey is EducationSectionKey => {
  return (
    sectionKey === "school" ||
    sectionKey === "college" ||
    sectionKey === "diploma" ||
    sectionKey === "graduation" ||
    sectionKey === "post_graduation"
  );
};

export default function UserProfiles() {
  const { user } = useAppSelector((state) => state.auth);

  const { data, isLoading, isFetching } = useSingleTeacherQuery(user?._id);
  console.log(data);

  const [profileValues, setProfileValues] = useState<TutorProfileViewModel>(
    () => mapTeacherToProfileViewModel(),
  );

  const [activeSavingSection, setActiveSavingSection] =
    useState<ProfileSectionKey | null>(null);
  const [saveErrors, setSaveErrors] = useState<ProfileSaveErrors>({});

  const clearSaveError = useCallback((sectionKey: ProfileSectionKey) => {
    setSaveErrors((previous) => {
      if (!previous[sectionKey]) return previous;

      const nextErrors = { ...previous };
      delete nextErrors[sectionKey];
      return nextErrors;
    });
  }, []);

  const retryProfileQuery = useCallback(() => {
    // Replace this with refetch() after useSingleTeacherQuery is connected.
    setProfileValues(createDefaultProfileViewModel());
  }, []);

  const saveProfilePatch = useCallback(
    async (payload: TeacherProfilePatchPayload) => {
      // Replace this no-op with updateTeacher(payload).unwrap() when the RTK
      // Query mutation is wired. Payload builders already match that call shape.
      void payload;
      return;
    },
    [],
  );

  const saveProfileSection = useCallback(
    async (
      sectionKey: ProfileSectionKey,
      payload: TeacherProfilePatchPayload,
      applyLocalChange: (
        current: TutorProfileViewModel,
      ) => TutorProfileViewModel,
    ) => {
      setActiveSavingSection(sectionKey);
      clearSaveError(sectionKey);

      try {
        await saveProfilePatch(payload);
        setProfileValues((current) => applyLocalChange(current));
      } catch (error) {
        setSaveErrors((previous) => ({
          ...previous,
          [sectionKey]: getProfileErrorMessage(error),
        }));
        throw error;
      } finally {
        setActiveSavingSection(null);
      }
    },
    [clearSaveError, saveProfilePatch],
  );

  const handlePersonalInfoSave = useCallback(
    (values: PersonalInfoValues) =>
      saveProfileSection(
        "personalInfo",
        buildPersonalInfoProfilePatch(values),
        (current) => ({
          ...current,
          personalInfo: values,
          meta: {
            ...current.meta,
            displayName: values.full_name || current.meta.displayName,
            bio: values.about_me || current.meta.bio,
          },
        }),
      ),
    [saveProfileSection],
  );

  const handleEmergencyContactSave = useCallback(
    (values: EmergencyContactValues) =>
      saveProfileSection(
        "emergencyContact",
        buildEmergencyContactProfilePatch(values),
        (current) => ({
          ...current,
          emergencyContact: values,
        }),
      ),
    [saveProfileSection],
  );

  const handleTuitionPreferenceSave = useCallback(
    (values: TuitionPreferenceValues) =>
      saveProfileSection(
        "tuitionPreference",
        buildTuitionPreferenceProfilePatch(values),
        (current) => ({
          ...current,
          tuitionPreference: values,
        }),
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
        buildEducationProfilePatch(sectionKey, values),
        (current) => ({
          ...current,
          education: {
            ...current.education,
            [sectionKey]: values,
          },
        }),
      ),
    [saveProfileSection],
  );

  const handleDiplomaToggle = useCallback((checked: boolean) => {
    setProfileValues((current) => ({
      ...current,
      education: getEducationValuesForDiplomaMode(current.education, checked),
    }));
  }, []);

  const handleAvatarChange = useCallback((avatarUrl: string) => {
    setProfileValues((current) => ({
      ...current,
      meta: {
        ...current.meta,
        avatarUrl,
      },
    }));
  }, []);

  const educationSaveErrors: Partial<Record<EducationSectionKey, string>> = {
    school: saveErrors.school,
    college: saveErrors.college,
    diploma: saveErrors.diploma,
    graduation: saveErrors.graduation,
    post_graduation: saveErrors.post_graduation,
  };
  const educationSavingSection = isEducationSectionKey(activeSavingSection)
    ? activeSavingSection
    : null;

  return (
    <>
      <PageMeta
        title="Tutor Profile | TutoriumBD"
        description="Manage tutor profile information for TutoriumBD."
      />
      <div className="border-border bg-surface-elevated rounded-2xl border p-5 lg:p-6">
        <PageBreadcrumb pageTitle="Profile" />

        {PROFILE_QUERY_STATE.isLoading ? (
          <div className="space-y-6">
            <Skeleton active paragraph={{ rows: 4 }} />
            <Skeleton active paragraph={{ rows: 6 }} />
          </div>
        ) : PROFILE_QUERY_STATE.errorMessage ? (
          <Alert
            type="error"
            showIcon
            message="Unable to load profile"
            description={PROFILE_QUERY_STATE.errorMessage}
            action={
              <Button size="small" onClick={retryProfileQuery}>
                Retry
              </Button>
            }
            className="rounded-lg!"
          />
        ) : (
          <div className="space-y-6">
            {PROFILE_QUERY_STATE.isFetching ? (
              <Alert
                type="info"
                showIcon
                message="Refreshing profile information..."
                className="rounded-lg!"
              />
            ) : null}

            <UserMetaCard
              values={profileValues.meta}
              isFetching={PROFILE_QUERY_STATE.isFetching}
              onAvatarChange={handleAvatarChange}
            />

            <PersonalInfoSection
              values={profileValues.personalInfo}
              onSave={handlePersonalInfoSave}
              isSaving={activeSavingSection === "personalInfo"}
              saveError={saveErrors.personalInfo}
              onClearSaveError={() => clearSaveError("personalInfo")}
            />

            <TuitionPreferenceSection
              values={profileValues.tuitionPreference}
              onSave={handleTuitionPreferenceSave}
              isSaving={activeSavingSection === "tuitionPreference"}
              saveError={saveErrors.tuitionPreference}
              onClearSaveError={() => clearSaveError("tuitionPreference")}
            />

            <EmergencyContactSection
              values={profileValues.emergencyContact}
              onSave={handleEmergencyContactSave}
              isSaving={activeSavingSection === "emergencyContact"}
              saveError={saveErrors.emergencyContact}
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
