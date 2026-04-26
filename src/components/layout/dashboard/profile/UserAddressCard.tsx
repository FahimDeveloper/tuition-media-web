import {useEffect, useState} from 'react';
import {Button, Form, Input, InputNumber, Select} from 'antd';
import {Modal} from '@/components/ui/modal';
import {useModal} from '@/hooks/useModal';

const {TextArea} = Input;

type TeachingMethod = 'Home Tuition' | 'Online Tuition' | 'Group Tuition';

type SalaryRange = {
  min?: number;
  max?: number;
};

type TuitionPreferenceValues = {
  tuitionCountry: string;
  tuitionCity: string;
  preferredTuitionLocations: string[];
  preferredTutoringCategories: string[];
  favoriteSubjects: string[];
  preferredCoursesOrClasses: string[];
  tutoringExperience: string;
  availableDays: string[];
  preferredTeachingMethods: TeachingMethod[];
  expectedSalaryRange: SalaryRange;
};

type FieldConfig<
  T extends keyof TuitionPreferenceValues = keyof TuitionPreferenceValues,
> = {
  key: T;
  label: string;
};

const requiredRule = (message: string) => [{required: true, message}];

const arrayRequiredRule = (message: string) => [
  {
    required: true,
    type: 'array' as const,
    min: 1,
    message,
  },
];

const TEACHING_METHOD_OPTIONS: {
  label: TeachingMethod;
  value: TeachingMethod;
}[] = [
  {label: 'Home Tuition', value: 'Home Tuition'},
  {label: 'Online Tuition', value: 'Online Tuition'},
  {label: 'Group Tuition', value: 'Group Tuition'},
];

const AVAILABLE_DAY_OPTIONS = [
  {label: 'Saturday', value: 'Saturday'},
  {label: 'Sunday', value: 'Sunday'},
  {label: 'Monday', value: 'Monday'},
  {label: 'Tuesday', value: 'Tuesday'},
  {label: 'Wednesday', value: 'Wednesday'},
  {label: 'Thursday', value: 'Thursday'},
  {label: 'Friday', value: 'Friday'},
];

const INITIAL_VALUES: TuitionPreferenceValues = {
  tuitionCountry: 'Bangladesh',
  tuitionCity: '',
  preferredTuitionLocations: [],
  preferredTutoringCategories: [],
  favoriteSubjects: [],
  preferredCoursesOrClasses: [],
  tutoringExperience: '',
  availableDays: [],
  preferredTeachingMethods: [],
  expectedSalaryRange: {
    min: undefined,
    max: undefined,
  },
};

// This list controls which fields appear in the read-only card.
const TUITION_PREFERENCE_ITEMS: FieldConfig[] = [
  {key: 'tuitionCountry', label: 'Tuition Country'},
  {key: 'tuitionCity', label: 'Tuition City'},
  {key: 'preferredTuitionLocations', label: 'Preferred Tuition Locations'},
  {key: 'preferredTutoringCategories', label: 'Preferred Tutoring Categories'},
  {key: 'favoriteSubjects', label: 'Favorite Subjects for Tutoring'},
  {key: 'preferredCoursesOrClasses', label: 'Preferred Courses / Classes'},
  {key: 'tutoringExperience', label: 'Tutoring Experience'},
  {key: 'availableDays', label: 'Available Days'},
  {key: 'preferredTeachingMethods', label: 'Preferred Teaching Methods'},
  {key: 'expectedSalaryRange', label: 'Expected Salary Range'},
];

const getDisplayValue = (value?: string) => {
  const trimmedValue = value?.trim();
  return trimmedValue || 'Not provided';
};

const getArrayDisplayValue = (value?: string[]) => {
  return value?.length ? value.join(', ') : 'Not provided';
};

const getSalaryDisplayValue = (salaryRange?: SalaryRange) => {
  if (!salaryRange?.min && !salaryRange?.max) return 'Not provided';

  const min = salaryRange.min ? `৳${salaryRange.min}` : 'Any';
  const max = salaryRange.max ? `৳${salaryRange.max}` : 'Any';

  return `${min} - ${max}`;
};

const getDisplayByKey = (
  key: keyof TuitionPreferenceValues,
  values: TuitionPreferenceValues,
) => {
  const value = values[key];

  if (Array.isArray(value)) {
    return getArrayDisplayValue(value);
  }

  if (key === 'expectedSalaryRange') {
    return getSalaryDisplayValue(values.expectedSalaryRange);
  }

  return getDisplayValue(value as string);
};

export default function TuitionPreferenceCard() {
  const {isOpen, openModal, closeModal} = useModal();
  const [form] = Form.useForm<TuitionPreferenceValues>();

  // Replace this temporary local state with Redux/API state later.
  const [tuitionPreferenceValues, setTuitionPreferenceValues] =
    useState<TuitionPreferenceValues>(INITIAL_VALUES);

  // Reset form values every time the modal opens.
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
    <div className="rounded-2xl border border-gray-200 p-5 dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Tuition Preference
          </h4>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-7 2xl:gap-x-32">
            {TUITION_PREFERENCE_ITEMS.map(({key, label}) => (
              <div key={key}>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  {label}
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {getDisplayByKey(key, tuitionPreferenceValues)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={openModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          Edit
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-175 m-4">
        <div className="no-scrollbar relative flex h-fit max-h-[90vh] w-full max-w-175 flex-col overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8 lg:pb-6">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Tuition Preference
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your preferred tuition location, subjects, teaching method,
              availability, and salary expectation.
            </p>
          </div>

          <Form<TuitionPreferenceValues>
            form={form}
            layout="vertical"
            initialValues={tuitionPreferenceValues}
            className="flex grow flex-col overflow-y-auto"
            onFinish={handleSave}
          >
            <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
              <div>
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Tuition Preference
                </h5>

                <div className="grid grid-cols-1 gap-x-6 lg:grid-cols-2">
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
                      addonBefore="৳"
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
                      addonBefore="৳"
                    />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
              <Button onClick={closeModal}>Close</Button>
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
}
