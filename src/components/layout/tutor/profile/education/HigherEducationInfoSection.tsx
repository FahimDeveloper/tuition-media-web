import {Form, Input, Select} from 'antd';

import ProfileEditButton from '../shared/ProfileEditButton';
import ProfileEditableFormModal from '../shared/ProfileEditableFormModal';
import {ProfileFormGrid} from '../shared/ProfileFormLayout';
import ProfileInfoList from '../shared/ProfileInfoList';
import type {ProfileInfoField} from '../shared/ProfileInfoList';
import ProfileSectionCard, {
  ProfileInfoGrid,
} from '../shared/ProfileSectionCard';
import useEditableProfileForm from '../shared/useEditableProfileForm';
import {requiredRule} from '../profileUtils';
import {EducationCredentialFields} from './EducationFormFields';
import {
  GRADUATION_INFO_ITEMS,
  POST_GRADUATION_INFO_ITEMS,
  STUDY_TYPE_OPTIONS,
  UNIVERSITY_TYPE_OPTIONS,
  formatEducationValue,
  prepareEducationPayload,
  type GraduationValues,
  type PostGraduationValues,
} from './educationTypes';

type HigherEducationValues = GraduationValues | PostGraduationValues;

type HigherEducationSectionProps<TValues extends HigherEducationValues> = {
  title: string;
  modalTitle: string;
  modalDescription: string;
  values: TValues;
  infoItems: ProfileInfoField<TValues>[];
  includeCurrentYear?: boolean;
  onSave: (values: TValues) => void;
};

type GraduationInfoSectionProps = {
  values: GraduationValues;
  onSave: (values: GraduationValues) => void;
};

type PostGraduationInfoSectionProps = {
  values: PostGraduationValues;
  onSave: (values: PostGraduationValues) => void;
};

function HigherEducationSection<TValues extends HigherEducationValues>({
  title,
  modalTitle,
  modalDescription,
  values,
  infoItems,
  includeCurrentYear = false,
  onSave,
}: HigherEducationSectionProps<TValues>) {
  const editableForm = useEditableProfileForm<TValues>({
    values,
    onSave,
    // This is the one place to swap in an RTK Query mutation later.
    fromFormValues: (formValues) => prepareEducationPayload(formValues, 'cgpa'),
  });

  return (
    <>
      <ProfileSectionCard
        title={title}
        action={<ProfileEditButton onClick={editableForm.openModal} />}
      >
        <ProfileInfoGrid>
          <ProfileInfoList
            items={infoItems}
            values={values}
            formatValue={formatEducationValue}
          />
        </ProfileInfoGrid>
      </ProfileSectionCard>

      <ProfileEditableFormModal
        isOpen={editableForm.isOpen}
        onClose={editableForm.closeModal}
        title={modalTitle}
        description={modalDescription}
        form={editableForm.form}
        initialValues={editableForm.formValues}
        onSubmit={editableForm.handleSubmit}
      >
        <ProfileFormGrid>
          <Form.Item
            label="University Name"
            name="universityName"
            className="col-span-2 lg:col-span-1"
            validateTrigger="onBlur"
            rules={requiredRule('Please enter your university name')}
          >
            <Input size="large" placeholder="Enter your university name" />
          </Form.Item>

          <Form.Item
            label="Department"
            name="department"
            className="col-span-2 lg:col-span-1"
            validateTrigger="onBlur"
            rules={requiredRule('Please enter your department')}
          >
            <Input size="large" placeholder="Enter your department" />
          </Form.Item>

          <Form.Item
            label="University Type"
            name="universityType"
            className="col-span-2 lg:col-span-1"
            rules={requiredRule('Please select your university type')}
          >
            <Select
              size="large"
              placeholder="Select university type"
              options={UNIVERSITY_TYPE_OPTIONS}
            />
          </Form.Item>

          <Form.Item
            label="Study Type"
            name="studyType"
            className="col-span-2 lg:col-span-1"
            rules={requiredRule('Please select your study type')}
          >
            <Select
              size="large"
              placeholder="Select study type"
              options={STUDY_TYPE_OPTIONS}
            />
          </Form.Item>

          <EducationCredentialFields
            scoreFieldName="cgpa"
            scoreLabel="CGPA"
            includeCurrentYear={includeCurrentYear}
          />
        </ProfileFormGrid>
      </ProfileEditableFormModal>
    </>
  );
}

export function GraduationInfoSection({
  values,
  onSave,
}: GraduationInfoSectionProps) {
  return (
    <HigherEducationSection
      title="Graduation"
      modalTitle="Edit Graduation Information"
      modalDescription="Update your graduation information."
      values={values}
      infoItems={GRADUATION_INFO_ITEMS}
      includeCurrentYear
      onSave={onSave}
    />
  );
}

export function PostGraduationInfoSection({
  values,
  onSave,
}: PostGraduationInfoSectionProps) {
  return (
    <HigherEducationSection
      title="Post Graduation"
      modalTitle="Edit Post Graduation Information"
      modalDescription="Update your post graduation information."
      values={values}
      infoItems={POST_GRADUATION_INFO_ITEMS}
      onSave={onSave}
    />
  );
}
