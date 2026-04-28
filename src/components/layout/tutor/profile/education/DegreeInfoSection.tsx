import {Checkbox, Form, Input, Select} from 'antd';

import ProfileEditButton from '../shared/ProfileEditButton';
import ProfileEditableFormModal from '../shared/ProfileEditableFormModal';
import {ProfileFormGrid} from '../shared/ProfileFormLayout';
import ProfileInfoList from '../shared/ProfileInfoList';
import ProfileSectionCard, {
  ProfileInfoGrid,
} from '../shared/ProfileSectionCard';
import useEditableProfileForm from '../shared/useEditableProfileForm';
import {requiredRule} from '../profileUtils';
import {
  GRADUATION_INFO_ITEMS,
  STUDY_TYPE_OPTIONS,
  UNIVERSITY_TYPE_OPTIONS,
  formatEducationValue,
  type GraduationValues,
  yearRules,
} from './educationTypes';

type DegreeInfoSectionProps = {
  title: string;
  modalTitle: string;
  modalDescription: string;
  values: GraduationValues;
  disabled: boolean;
  onSave: (values: GraduationValues) => void;
};

export default function DegreeInfoSection({
  title,
  modalTitle,
  modalDescription,
  values,
  disabled,
  onSave,
}: DegreeInfoSectionProps) {
  const editableForm = useEditableProfileForm<GraduationValues>({
    values,
    onSave,
  });

  return (
    <>
      <ProfileSectionCard
        title={title}
        action={
          <ProfileEditButton
            onClick={editableForm.openModal}
            disabled={disabled}
          />
        }
      >
        <ProfileInfoGrid>
          <ProfileInfoList
            items={GRADUATION_INFO_ITEMS}
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

          <Form.Item
            label="Year"
            name="year"
            className="col-span-2 lg:col-span-1"
            validateTrigger="onBlur"
            rules={[...requiredRule('Please enter your year'), ...yearRules]}
          >
            <Input size="large" placeholder="Enter year" />
          </Form.Item>

          <Form.Item
            name="isRunningStudent"
            valuePropName="checked"
            className="col-span-2"
          >
            <Checkbox>I&apos;m a running student</Checkbox>
          </Form.Item>
        </ProfileFormGrid>
      </ProfileEditableFormModal>
    </>
  );
}
