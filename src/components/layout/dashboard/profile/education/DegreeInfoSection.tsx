import {useEffect} from 'react';
import {Checkbox, Form, Input, Select} from 'antd';
import {Modal} from '@/components/ui/modal';
import {useModal} from '@/hooks/useModal';

import ProfileEditButton from '../shared/ProfileEditButton';
import {
  ProfileFormGrid,
  ProfileFormScrollArea,
} from '../shared/ProfileFormLayout';
import ProfileInfoItem from '../shared/ProfileInfoItem';
import ProfileModalContent, {
  ProfileModalActions,
  ProfileModalHeader,
} from '../shared/ProfileModalContent';
import ProfileSectionCard, {
  ProfileInfoGrid,
} from '../shared/ProfileSectionCard';
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
  const {isOpen, openModal, closeModal} = useModal();
  const [form] = Form.useForm<GraduationValues>();

  useEffect(() => {
    if (!isOpen) return;

    form.setFieldsValue(values);
  }, [form, isOpen, values]);

  const handleSave = (formValues: GraduationValues) => {
    onSave(formValues);
    closeModal();
  };

  return (
    <>
      <ProfileSectionCard
        title={title}
        action={<ProfileEditButton onClick={openModal} disabled={disabled} />}
      >
        <ProfileInfoGrid>
          {GRADUATION_INFO_ITEMS.map(({key, label}) => (
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
            title={modalTitle}
            description={modalDescription}
          />

          <Form<GraduationValues>
            form={form}
            layout="vertical"
            initialValues={values}
            className="flex grow flex-col overflow-y-auto"
            onFinish={handleSave}
          >
            <ProfileFormScrollArea>
              <ProfileFormGrid>
                <Form.Item
                  label="University Name"
                  name="universityName"
                  className="col-span-2 lg:col-span-1"
                  validateTrigger="onBlur"
                  rules={requiredRule('Please enter your university name')}
                >
                  <Input
                    size="large"
                    placeholder="Enter your university name"
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
