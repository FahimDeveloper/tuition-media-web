import { Form, Input, Select } from "antd";

import ProfileEditableSection from "../shared/ProfileEditableSection";
import { ProfileFormGrid } from "../shared/ProfileFormLayout";
import type { ProfileInfoField } from "../shared/ProfileInfoList";
import { requiredRule } from "@/validations/form.validation";
import { EducationCredentialFields } from "./EducationFormFields";
import {
  GRADUATION_INFO_ITEMS,
  POST_GRADUATION_INFO_ITEMS,
  STUDY_LEVEL_OPTIONS,
  UNIVERSITY_TYPE_OPTIONS,
  formatEducationValue,
  prepareEducationPayload,
  type GraduationValues,
  type PostGraduationValues,
} from "./educationTypes";

type HigherEducationValues = GraduationValues | PostGraduationValues;

type HigherEducationSectionProps<TValues extends HigherEducationValues> = {
  title: string;
  modalTitle: string;
  modalDescription: string;
  values: TValues;
  infoItems: ProfileInfoField<TValues>[];
  onSave: (values: TValues) => Promise<void> | void;
  isSaving?: boolean;
  saveError?: string;
  onClearSaveError?: () => void;
};

type GraduationInfoSectionProps = {
  values: GraduationValues;
  onSave: (values: GraduationValues) => Promise<void> | void;
  isSaving?: boolean;
  saveError?: string;
  onClearSaveError?: () => void;
};

type PostGraduationInfoSectionProps = {
  values: PostGraduationValues;
  onSave: (values: PostGraduationValues) => Promise<void> | void;
  isSaving?: boolean;
  saveError?: string;
  onClearSaveError?: () => void;
};

function HigherEducationSection<TValues extends HigherEducationValues>({
  title,
  modalTitle,
  modalDescription,
  values,
  infoItems,
  onSave,
  isSaving = false,
  saveError,
  onClearSaveError,
}: HigherEducationSectionProps<TValues>) {
  return (
    <ProfileEditableSection
      title={title}
      modalTitle={modalTitle}
      modalDescription={modalDescription}
      values={values}
      items={infoItems}
      formatValue={formatEducationValue}
      onSave={onSave}
      isSaving={isSaving}
      saveError={saveError}
      onClearSaveError={onClearSaveError}
      fromFormValues={prepareEducationPayload}
    >
      <ProfileFormGrid>
        <Form.Item
          label="University Name"
          name="name"
          className="col-span-2 lg:col-span-1"
          validateTrigger="onBlur"
          rules={requiredRule("Please enter your university name")}
        >
          <Input size="large" placeholder="Enter your university name" />
        </Form.Item>

        <Form.Item
          label="Department"
          name="department"
          className="col-span-2 lg:col-span-1"
          validateTrigger="onBlur"
          rules={requiredRule("Please enter your department")}
        >
          <Input size="large" placeholder="Enter your department" />
        </Form.Item>

        <Form.Item
          label="University Type"
          name="type"
          className="col-span-2 lg:col-span-1"
          rules={requiredRule("Please select your university type")}
        >
          <Select
            size="large"
            placeholder="Select university type"
            options={UNIVERSITY_TYPE_OPTIONS}
          />
        </Form.Item>

        <Form.Item
          label="Study Type"
          name="study_level"
          className="col-span-2 lg:col-span-1"
          rules={requiredRule("Please select your study type")}
        >
          <Select
            size="large"
            placeholder="Select study type"
            options={STUDY_LEVEL_OPTIONS}
          />
        </Form.Item>

        <EducationCredentialFields
          scoreFieldName="gpa"
          scoreLabel="GPA"
          includeStatus
          includeSession
        />
      </ProfileFormGrid>
    </ProfileEditableSection>
  );
}

export function GraduationInfoSection({
  values,
  onSave,
  isSaving = false,
  saveError,
  onClearSaveError,
}: GraduationInfoSectionProps) {
  return (
    <HigherEducationSection
      title="Graduation"
      modalTitle="Edit Graduation Information"
      modalDescription="Update your graduation information."
      values={values}
      infoItems={GRADUATION_INFO_ITEMS}
      onSave={onSave}
      isSaving={isSaving}
      saveError={saveError}
      onClearSaveError={onClearSaveError}
    />
  );
}

export function PostGraduationInfoSection({
  values,
  onSave,
  isSaving = false,
  saveError,
  onClearSaveError,
}: PostGraduationInfoSectionProps) {
  return (
    <HigherEducationSection
      title="Post Graduation"
      modalTitle="Edit Post Graduation Information"
      modalDescription="Update your post graduation information."
      values={values}
      infoItems={POST_GRADUATION_INFO_ITEMS}
      onSave={onSave}
      isSaving={isSaving}
      saveError={saveError}
      onClearSaveError={onClearSaveError}
    />
  );
}
