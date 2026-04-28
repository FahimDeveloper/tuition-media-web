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
  DIPLOMA_INFO_ITEMS,
  INSTITUTE_TYPE_OPTIONS,
  STUDY_TYPE_OPTIONS,
  formatEducationValue,
  type DiplomaValues,
  yearRules,
} from './educationTypes';

type DiplomaInfoSectionProps = {
  values: DiplomaValues;
  disabled: boolean;
  isDiplomaStudent: boolean;
  onDiplomaToggle: (checked: boolean) => void;
  onSave: (values: DiplomaValues) => void;
};

export default function DiplomaInfoSection({
  values,
  disabled,
  isDiplomaStudent,
  onDiplomaToggle,
  onSave,
}: DiplomaInfoSectionProps) {
  const editableForm = useEditableProfileForm<DiplomaValues>({
    values,
    onSave,
  });

  return (
    <>
      <ProfileSectionCard
        title="Diploma"
        action={
          <div className="flex flex-col gap-3 lg:items-end">
            <Checkbox
              checked={isDiplomaStudent}
              disabled={disabled}
              onChange={(event) => onDiplomaToggle(event.target.checked)}
            >
              I am a diploma student
            </Checkbox>

            <ProfileEditButton
              onClick={editableForm.openModal}
              disabled={disabled}
            />
          </div>
        }
      >
        <ProfileInfoGrid>
          <ProfileInfoList
            items={DIPLOMA_INFO_ITEMS}
            values={values}
            formatValue={formatEducationValue}
          />
        </ProfileInfoGrid>
      </ProfileSectionCard>

      <ProfileEditableFormModal
        isOpen={editableForm.isOpen}
        onClose={editableForm.closeModal}
        title="Edit Diploma Information"
        description="Update your diploma information."
        form={editableForm.form}
        initialValues={editableForm.formValues}
        onSubmit={editableForm.handleSubmit}
      >
        <ProfileFormGrid>
          <Form.Item
            label="Institution Name"
            name="institutionName"
            className="col-span-2 lg:col-span-1"
            validateTrigger="onBlur"
            rules={requiredRule('Please enter your institution name')}
          >
            <Input size="large" placeholder="Enter your institution name" />
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
            label="Institute Type"
            name="instituteType"
            className="col-span-2 lg:col-span-1"
            rules={requiredRule('Please select your institute type')}
          >
            <Select
              size="large"
              placeholder="Select institute type"
              options={INSTITUTE_TYPE_OPTIONS}
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
