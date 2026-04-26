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
  BOARD_OPTIONS,
  CURRICULUM_OPTIONS,
  GROUP_OPTIONS,
  SCHOOL_INFO_ITEMS,
  formatEducationValue,
  gpaRules,
  type SchoolValues,
  yearRules,
} from './educationTypes';

type SchoolInfoSectionProps = {
  values: SchoolValues;
  onSave: (values: SchoolValues) => void;
};

export default function SchoolInfoSection({
  values,
  onSave,
}: SchoolInfoSectionProps) {
  const {isOpen, openModal, closeModal} = useModal();
  const [form] = Form.useForm<SchoolValues>();

  useEffect(() => {
    if (!isOpen) return;

    form.setFieldsValue(values);
  }, [form, isOpen, values]);

  const handleSave = (formValues: SchoolValues) => {
    onSave(formValues);
    closeModal();
  };

  return (
    <>
      <ProfileSectionCard
        title="School"
        action={<ProfileEditButton onClick={openModal} />}
      >
        <ProfileInfoGrid>
          {SCHOOL_INFO_ITEMS.map(({key, label}) => (
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
            title="Edit School Information"
            description="Update your school information."
          />

          <Form<SchoolValues>
            form={form}
            layout="vertical"
            initialValues={values}
            className="flex grow flex-col overflow-y-auto"
            onFinish={handleSave}
          >
            <ProfileFormScrollArea>
              <ProfileFormGrid>
                <Form.Item
                  label="School Name"
                  name="schoolName"
                  className="col-span-2 lg:col-span-1"
                  validateTrigger="onBlur"
                  rules={requiredRule('Please enter your school name')}
                >
                  <Input size="large" placeholder="Enter your school name" />
                </Form.Item>

                <Form.Item
                  label="Group"
                  name="group"
                  className="col-span-2 lg:col-span-1"
                  rules={requiredRule('Please select your group')}
                >
                  <Select
                    size="large"
                    placeholder="Select group"
                    options={GROUP_OPTIONS}
                  />
                </Form.Item>

                <Form.Item
                  label="Curriculum"
                  name="curriculum"
                  className="col-span-2 lg:col-span-1"
                  rules={requiredRule('Please select your curriculum')}
                >
                  <Select
                    size="large"
                    placeholder="Select curriculum"
                    options={CURRICULUM_OPTIONS}
                  />
                </Form.Item>

                <Form.Item
                  label="Board"
                  name="board"
                  className="col-span-2 lg:col-span-1"
                  rules={requiredRule('Please select your board')}
                >
                  <Select
                    size="large"
                    placeholder="Select board"
                    options={BOARD_OPTIONS}
                  />
                </Form.Item>

                <Form.Item
                  label="GPA"
                  name="gpa"
                  className="col-span-2 lg:col-span-1"
                  validateTrigger="onBlur"
                  rules={[
                    ...requiredRule('Please enter your GPA'),
                    ...gpaRules,
                  ]}
                >
                  <Input size="large" placeholder="Enter your GPA" />
                </Form.Item>

                <Form.Item
                  label="Passing Year"
                  name="passingYear"
                  className="col-span-2 lg:col-span-1"
                  validateTrigger="onBlur"
                  rules={[
                    ...requiredRule('Please enter your passing year'),
                    ...yearRules,
                  ]}
                >
                  <Input size="large" placeholder="Enter passing year" />
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
