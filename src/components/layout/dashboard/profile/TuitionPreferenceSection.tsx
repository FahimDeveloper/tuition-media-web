import {useEffect, useState} from 'react';
import {Form, Input, InputNumber, Select} from 'antd';
import {Modal} from '@/components/ui/modal';
import {useModal} from '@/hooks/useModal';

import ProfileEditButton from './shared/ProfileEditButton';
import {
  ProfileFormGrid,
  ProfileFormScrollArea,
  ProfileFormSection,
} from './shared/ProfileFormLayout';
import ProfileInfoItem from './shared/ProfileInfoItem';
import ProfileModalContent, {
  ProfileModalActions,
  ProfileModalHeader,
} from './shared/ProfileModalContent';
import ProfileSectionCard, {ProfileInfoGrid} from './shared/ProfileSectionCard';
import {arrayRequiredRule, requiredRule} from './profileUtils';
import {
  AVAILABLE_DAY_OPTIONS,
  INITIAL_TUITION_PREFERENCE_VALUES,
  TEACHING_METHOD_OPTIONS,
  TUITION_PREFERENCE_ITEMS,
  formatTuitionPreferenceValue,
  type TuitionPreferenceValues,
} from './tuitionPreferenceTypes';

const {TextArea} = Input;

export default function TuitionPreferenceSection() {
  const {isOpen, openModal, closeModal} = useModal();
  const [form] = Form.useForm<TuitionPreferenceValues>();

  // Replace this temporary local state with Redux/API state later.
  const [tuitionPreferenceValues, setTuitionPreferenceValues] =
    useState<TuitionPreferenceValues>(INITIAL_TUITION_PREFERENCE_VALUES);

  useEffect(() => {
    if (!isOpen) return;

    form.setFieldsValue(tuitionPreferenceValues);
  }, [form, isOpen, tuitionPreferenceValues]);

  const validateSalaryRange = () => {
    const min = form.getFieldValue(['expectedSalaryRange', 'min']);
    const max = form.getFieldValue(['expectedSalaryRange', 'max']);

    if (!min || !max || min <= max) {
      return Promise.resolve();
    }

    return Promise.reject(
      new Error('Minimum salary cannot be greater than maximum salary'),
    );
  };

  const handleSave = (values: TuitionPreferenceValues) => {
    // Replace this local save with API mutation/store update later.
    setTuitionPreferenceValues(values);
    closeModal();
  };

  return (
    <>
      <ProfileSectionCard
        title="Tuition Preference"
        action={<ProfileEditButton onClick={openModal} />}
      >
        <ProfileInfoGrid>
          {TUITION_PREFERENCE_ITEMS.map(({key, label}) => (
            <ProfileInfoItem
              key={key}
              label={label}
              value={formatTuitionPreferenceValue(key, tuitionPreferenceValues)}
            />
          ))}
        </ProfileInfoGrid>
      </ProfileSectionCard>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-175 m-4">
        <ProfileModalContent>
          <ProfileModalHeader
            title="Edit Tuition Preference"
            description="Update your preferred tuition location, subjects, teaching method, availability, and salary expectation."
          />

          <Form<TuitionPreferenceValues>
            form={form}
            layout="vertical"
            initialValues={tuitionPreferenceValues}
            className="flex grow flex-col overflow-y-auto"
            onFinish={handleSave}
          >
            <ProfileFormScrollArea>
              <ProfileFormSection title="Tuition Preference">
                <ProfileFormGrid>
                  <Form.Item
                    label="Tuition Country"
                    name="tuitionCountry"
                    className="col-span-2 lg:col-span-1"
                    validateTrigger="onBlur"
                    rules={[
                      ...requiredRule('Please enter your tuition country'),
                      {
                        min: 3,
                        message: 'Country must be at least 3 characters',
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Enter tuition country" />
                  </Form.Item>

                  <Form.Item
                    label="Tuition City"
                    name="tuitionCity"
                    className="col-span-2 lg:col-span-1"
                    validateTrigger="onBlur"
                    rules={[
                      ...requiredRule('Please enter your tuition city'),
                      {
                        min: 2,
                        message: 'City must be at least 2 characters',
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Enter tuition city" />
                  </Form.Item>

                  <Form.Item
                    label="Preferred Tuition Locations"
                    name="preferredTuitionLocations"
                    className="col-span-2"
                    rules={arrayRequiredRule(
                      'Please add at least one preferred tuition location',
                    )}
                  >
                    <Select
                      size="large"
                      mode="tags"
                      placeholder="Example: Dhanmondi, Mirpur, Uttara"
                      tokenSeparators={[',']}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Preferred Tutoring Categories"
                    name="preferredTutoringCategories"
                    className="col-span-2"
                    rules={arrayRequiredRule(
                      'Please add at least one tutoring category',
                    )}
                  >
                    <Select
                      size="large"
                      mode="tags"
                      placeholder="Example: Bangla Medium, English Medium, Admission Test"
                      tokenSeparators={[',']}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Favorite Subjects for Tutoring"
                    name="favoriteSubjects"
                    className="col-span-2"
                    rules={arrayRequiredRule(
                      'Please add at least one favorite subject',
                    )}
                  >
                    <Select
                      size="large"
                      mode="tags"
                      placeholder="Example: Math, Physics, English"
                      tokenSeparators={[',']}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Preferred Courses / Classes"
                    name="preferredCoursesOrClasses"
                    className="col-span-2"
                    rules={arrayRequiredRule(
                      'Please add at least one preferred course or class',
                    )}
                  >
                    <Select
                      size="large"
                      mode="tags"
                      placeholder="Example: Class 6, Class 10, HSC, IELTS"
                      tokenSeparators={[',']}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Tutoring Experience"
                    name="tutoringExperience"
                    className="col-span-2"
                    validateTrigger="onBlur"
                    rules={[
                      ...requiredRule('Please enter your tutoring experience'),
                      {
                        min: 5,
                        message:
                          'Tutoring experience must be at least 5 characters',
                      },
                    ]}
                  >
                    <TextArea
                      rows={4}
                      placeholder="Example: 2 years of experience teaching Math and Physics"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Available Days in a Week"
                    name="availableDays"
                    className="col-span-2 lg:col-span-1"
                    rules={arrayRequiredRule(
                      'Please select at least one available day',
                    )}
                  >
                    <Select
                      size="large"
                      mode="multiple"
                      placeholder="Select available days"
                      options={AVAILABLE_DAY_OPTIONS}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Preferred Teaching Method"
                    name="preferredTeachingMethods"
                    className="col-span-2 lg:col-span-1"
                    rules={arrayRequiredRule(
                      'Please select at least one teaching method',
                    )}
                  >
                    <Select
                      size="large"
                      mode="multiple"
                      placeholder="Select teaching method"
                      options={TEACHING_METHOD_OPTIONS}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Expected Minimum Salary"
                    name={['expectedSalaryRange', 'min']}
                    className="col-span-2 lg:col-span-1"
                    dependencies={[['expectedSalaryRange', 'max']]}
                    rules={[
                      ...requiredRule('Please enter minimum expected salary'),
                      {validator: validateSalaryRange},
                    ]}
                  >
                    <InputNumber
                      size="large"
                      min={0}
                      className="w-full"
                      placeholder="Example: 5000"
                      addonBefore="à§³"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Expected Maximum Salary"
                    name={['expectedSalaryRange', 'max']}
                    className="col-span-2 lg:col-span-1"
                    dependencies={[['expectedSalaryRange', 'min']]}
                    rules={[
                      ...requiredRule('Please enter maximum expected salary'),
                      {validator: validateSalaryRange},
                    ]}
                  >
                    <InputNumber
                      size="large"
                      min={0}
                      className="w-full"
                      placeholder="Example: 15000"
                      addonBefore="à§³"
                    />
                  </Form.Item>
                </ProfileFormGrid>
              </ProfileFormSection>
            </ProfileFormScrollArea>

            <ProfileModalActions onCancel={closeModal} />
          </Form>
        </ProfileModalContent>
      </Modal>
    </>
  );
}
