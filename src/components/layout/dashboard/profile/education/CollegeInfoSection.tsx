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
  BOARD_OPTIONS,
  COLLEGE_INFO_ITEMS,
  CURRICULUM_OPTIONS,
  GROUP_OPTIONS,
  formatEducationValue,
  gpaRules,
  type CollegeValues,
  yearRules,
} from './educationTypes';

type CollegeFormValues = Omit<CollegeValues, 'isDiplomaStudent'>;

type CollegeInfoSectionProps = {
  values: CollegeValues;
  disabled: boolean;
  isDiplomaStudent: boolean;
  onDiplomaToggle: (checked: boolean) => void;
  onSave: (values: CollegeValues) => void;
};

export default function CollegeInfoSection({
  values,
  disabled,
  isDiplomaStudent,
  onDiplomaToggle,
  onSave,
}: CollegeInfoSectionProps) {
  const {isOpen, openModal, closeModal} = useModal();
  const [form] = Form.useForm<CollegeFormValues>();

  useEffect(() => {
    if (!isOpen) return;

    form.setFieldsValue(values);
  }, [form, isOpen, values]);

  const handleSave = (formValues: CollegeFormValues) => {
    onSave({
      ...formValues,
      isDiplomaStudent,
    });
    closeModal();
  };

  return (
    <>
      <ProfileSectionCard
        title="College"
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
          {COLLEGE_INFO_ITEMS.map(({key, label}) => (
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
            title="Edit College Information"
            description="Update your college information."
          />

          <Form<CollegeFormValues>
            form={form}
            layout="vertical"
            initialValues={values}
            className="flex grow flex-col overflow-y-auto"
            onFinish={handleSave}
          >
            <ProfileFormScrollArea>
              <ProfileFormGrid>
                <Form.Item
                  label="College Name"
                  name="collegeName"
                  className="col-span-2 lg:col-span-1"
                  validateTrigger="onBlur"
                  rules={requiredRule('Please enter your college name')}
                >
                  <Input size="large" placeholder="Enter your college name" />
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
