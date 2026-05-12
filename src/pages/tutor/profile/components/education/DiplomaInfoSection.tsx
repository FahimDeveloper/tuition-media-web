import { Checkbox, Form, Input, Select } from "antd";

import ProfileEditableSection from "../shared/ProfileEditableSection";
import { ProfileFormGrid } from "../shared/ProfileFormLayout";
import { requiredRule } from "@/utils/form-validation.utils";
import { EducationCredentialFields } from "./EducationFormFields";
import {
  DIPLOMA_INFO_ITEMS,
  INSTITUTE_TYPE_OPTIONS,
  STUDY_LEVEL_OPTIONS,
  formatEducationValue,
  prepareEducationPayload,
  type DiplomaValues,
} from "./educationTypes";

type DiplomaInfoSectionProps = {
  values: DiplomaValues;
  isDiplomaStudent: boolean;
  onDiplomaToggle: (checked: boolean) => void;
  onSave: (values: DiplomaValues) => Promise<void> | void;
  isSaving?: boolean;
  saveError?: string;
  onClearSaveError?: () => void;
};

export default function DiplomaInfoSection({
  values,
  isDiplomaStudent,
  onDiplomaToggle,
  onSave,
  isSaving = false,
  saveError,
  onClearSaveError,
}: DiplomaInfoSectionProps) {
  return (
    <ProfileEditableSection
      title="Diploma"
      modalTitle="Edit Diploma Information"
      modalDescription="Update your diploma information."
      values={values}
      items={DIPLOMA_INFO_ITEMS}
      formatValue={formatEducationValue}
      onSave={onSave}
      isSaving={isSaving}
      saveError={saveError}
      onClearSaveError={onClearSaveError}
      fromFormValues={prepareEducationPayload}
      renderAction={({ defaultAction }) => (
        <div className="flex flex-col gap-3 lg:items-end">
          <Checkbox
            checked={isDiplomaStudent}
            disabled={isSaving}
            onChange={(event) => onDiplomaToggle(event.target.checked)}
          >
            I am a diploma student
          </Checkbox>

          {defaultAction}
        </div>
      )}
    >
      <ProfileFormGrid>
        <Form.Item
          label="Institution Name"
          name="name"
          className="col-span-2 lg:col-span-1"
          validateTrigger="onBlur"
          rules={requiredRule("Please enter your institution name")}
        >
          <Input size="large" placeholder="Enter your institution name" />
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
          label="Institute Type"
          name="type"
          className="col-span-2 lg:col-span-1"
          rules={requiredRule("Please select your institute type")}
        >
          <Select
            size="large"
            placeholder="Select institute type"
            options={INSTITUTE_TYPE_OPTIONS}
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
          scoreFieldName="cgpa"
          scoreLabel="CGPA"
          includeStatus
          includeSession
        />
      </ProfileFormGrid>
    </ProfileEditableSection>
  );
}
