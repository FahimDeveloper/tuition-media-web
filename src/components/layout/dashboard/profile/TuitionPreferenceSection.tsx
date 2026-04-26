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
            className="flex grow flex-col overflow-y-auto [&_.ant-form-item]:mb-2"
            onFinish={handleSave}
          >
            <ProfileFormScrollArea>
              <ProfileFormSection title="Tuition Preference">
                <ProfileFormGrid className="gap-x-6 gap-y-7">
                  <Form.Item
                    label="Tuition Country"
                    name="tuitionCountry"
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
                    validateTrigger="onBlur"
                    rules={[
                      ...requiredRule('Please enter your tuition city'),
                      {min: 2, message: 'City must be at least 2 characters'},
                    ]}
                  >
                    <Input size="large" placeholder="Enter tuition city" />
                  </Form.Item>

                  <Form.Item
                    label="Preferred Tuition Locations"
                    name="preferredTuitionLocations"
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
                    rules={arrayRequiredRule(
                      'Please add at least one tutoring category',
                    )}
                  >
                    <Select
                      size="large"
                      mode="tags"
                      placeholder="Example: Bangla Medium, English Medium"
                      tokenSeparators={[',']}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Favorite Subjects"
                    name="favoriteSubjects"
                    rules={arrayRequiredRule('Please add at least one subject')}
                  >
                    <Select
                      size="large"
                      mode="tags"
                      placeholder="Math, Physics, English"
                      tokenSeparators={[',']}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Preferred Classes"
                    name="preferredCoursesOrClasses"
                    rules={arrayRequiredRule('Please add at least one class')}
                  >
                    <Select
                      size="large"
                      mode="tags"
                      placeholder="Class 6, HSC, IELTS"
                      tokenSeparators={[',']}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Tutoring Experience (Years)"
                    name="tutoringExperience"
                    validateTrigger="onBlur"
                    rules={[
                      ...requiredRule('Please enter experience'),
                      {min: 1, message: 'Minimum 1 year required'},
                    ]}
                  >
                    <Input type="number" size="large" placeholder="e.g. 2" />
                  </Form.Item>

                  <Form.Item
                    label="Available Days"
                    name="availableDays"
                    rules={arrayRequiredRule('Please select at least one day')}
                  >
                    <Select
                      size="large"
                      mode="multiple"
                      options={AVAILABLE_DAY_OPTIONS}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Teaching Method"
                    name="preferredTeachingMethods"
                    rules={arrayRequiredRule(
                      'Please select at least one method',
                    )}
                  >
                    <Select
                      size="large"
                      mode="multiple"
                      options={TEACHING_METHOD_OPTIONS}
                    />
                  </Form.Item>

                  {/* Salary Range (Improved) */}
                  <Form.Item
                    label="Expected Salary Range"
                    className="col-span-2"
                    required
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                      <Form.Item
                        name={['expectedSalaryRange', 'min']}
                        dependencies={[['expectedSalaryRange', 'max']]}
                        rules={[
                          ...requiredRule(
                            'Please enter minimum expected salary',
                          ),
                          {validator: validateSalaryRange},
                        ]}
                        className="w-full"
                      >
                        <InputNumber
                          size="large"
                          min={0}
                          className="!w-full"
                          placeholder="Minimum salary"
                          addonBefore="৳"
                        />
                      </Form.Item>

                      <Form.Item
                        name={['expectedSalaryRange', 'max']}
                        dependencies={[['expectedSalaryRange', 'min']]}
                        rules={[
                          ...requiredRule(
                            'Please enter maximum expected salary',
                          ),
                          {validator: validateSalaryRange},
                        ]}
                        className="w-full"
                      >
                        <InputNumber
                          size="large"
                          min={0}
                          className="!w-full"
                          placeholder="Maximum salary"
                          addonBefore="৳"
                        />
                      </Form.Item>
                    </div>
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
