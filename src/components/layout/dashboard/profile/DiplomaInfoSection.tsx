import {useEffect} from 'react';
import {Checkbox, Form, Input, Select} from 'antd';
import {Modal} from '@/components/ui/modal';
import {useModal} from '@/hooks/useModal';

import ProfileEditButton from './shared/ProfileEditButton';
import {
  ProfileFormGrid,
  ProfileFormScrollArea,
} from './shared/ProfileFormLayout';
import ProfileInfoItem from './shared/ProfileInfoItem';
import ProfileModalContent, {
  ProfileModalActions,
  ProfileModalHeader,
} from './shared/ProfileModalContent';
import ProfileSectionCard, {ProfileInfoGrid} from './shared/ProfileSectionCard';
import {requiredRule} from './profileUtils';
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
  const {isOpen, openModal, closeModal} = useModal();
  const [form] = Form.useForm<DiplomaValues>();

  useEffect(() => {
    if (!isOpen) return;

    form.setFieldsValue(values);
  }, [form, isOpen, values]);

  const handleSave = (diploma: DiplomaValues) => {
    onSave(diploma);
    closeModal();
  };

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

            <ProfileEditButton onClick={openModal} disabled={disabled} />
          </div>
        }
      >
        <ProfileInfoGrid>
          {DIPLOMA_INFO_ITEMS.map(({key, label}) => (
            <ProfileInfoItem
              key={key}
              label={label}
              value={formatEducationValue(values[key])}
            />
          ))}
        </ProfileInfoGrid>
      </ProfileSectionCard>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-175 m-4">
        <ProfileModalContent>
          <ProfileModalHeader
            title="Edit Diploma Information"
            description="Update your diploma information."
          />

          <Form<DiplomaValues>
            form={form}
            layout="vertical"
            initialValues={values}
            className="flex grow flex-col overflow-y-auto"
            onFinish={handleSave}
          >
            <ProfileFormScrollArea>
              <ProfileFormGrid>
                <Form.Item
                  label="Institution Name"
                  name="institutionName"
                  className="col-span-2 lg:col-span-1"
                  validateTrigger="onBlur"
                  rules={requiredRule('Please enter your institution name')}
                >
                  <Input
                    size="large"
                    placeholder="Enter your institution name"
                  />
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
                  rules={[
                    ...requiredRule('Please enter your year'),
                    ...yearRules,
                  ]}
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
            </ProfileFormScrollArea>

            <ProfileModalActions onCancel={closeModal} />
          </Form>
        </ProfileModalContent>
      </Modal>
    </>
  );
}
