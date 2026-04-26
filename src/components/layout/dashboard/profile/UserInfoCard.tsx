import {useEffect, useState} from 'react';
import {Button, Checkbox, DatePicker, Form, Input, Select} from 'antd';
import dayjs, {type Dayjs} from 'dayjs';
import {Modal} from '@/components/ui/modal';
import {useModal} from '@/hooks/useModal';
import {validateFullName} from '@/utils/formValidators';

type Gender = 'Male' | 'Female' | 'Other';
type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
type Religion = 'Islam' | 'Hinduism' | 'Buddhism' | 'Christianity' | 'Other';

type UserInfoValues = {
  fullName: string;
  gender?: Gender;
  bloodGroup?: BloodGroup;
  nationality: string;
  dateOfBirth: string;
  nidNumber?: string;
  birthCertificateNumber?: string;
  religion?: Religion;
  phoneNumber: string;
  additionalPhoneNumber?: string;
  presentAddress: string;
  permanentAddress: string;
  facebook?: string;
  instagram?: string;
};

type UserInfoFormValues = Omit<UserInfoValues, 'dateOfBirth'> & {
  dateOfBirth: Dayjs | null;
};

type FieldConfig<T extends keyof UserInfoValues = keyof UserInfoValues> = {
  key: T;
  label: string;
  placeholder?: string;
};

const requiredRule = (message: string) => [{required: true, message}];

const phoneRules = [
  {
    pattern: /^(\+8801|01)[3-9]\d{8}$/,
    message: 'Enter a valid Bangladeshi phone number',
  },
];

const optionalUrlRules = [
  {
    type: 'url' as const,
    message: 'Enter a valid URL',
  },
];

const idNumberRules = [
  {
    pattern: /^\d{10}$|^\d{13}$|^\d{17}$/,
    message: 'Number must be 10, 13, or 17 digits',
  },
];

const GENDER_OPTIONS: {label: Gender; value: Gender}[] = [
  {label: 'Male', value: 'Male'},
  {label: 'Female', value: 'Female'},
  {label: 'Other', value: 'Other'},
];

const BLOOD_GROUP_OPTIONS: {label: BloodGroup; value: BloodGroup}[] = [
  {label: 'A+', value: 'A+'},
  {label: 'A-', value: 'A-'},
  {label: 'B+', value: 'B+'},
  {label: 'B-', value: 'B-'},
  {label: 'AB+', value: 'AB+'},
  {label: 'AB-', value: 'AB-'},
  {label: 'O+', value: 'O+'},
  {label: 'O-', value: 'O-'},
];

const RELIGION_OPTIONS: {label: Religion; value: Religion}[] = [
  {label: 'Islam', value: 'Islam'},
  {label: 'Hinduism', value: 'Hinduism'},
  {label: 'Buddhism', value: 'Buddhism'},
  {label: 'Christianity', value: 'Christianity'},
  {label: 'Other', value: 'Other'},
];

// Empty Select values should be undefined, not ''.
// This allows Ant Design Select placeholder text to show correctly.
const INITIAL_VALUES: UserInfoValues = {
  fullName: 'Shakibul Islam',
  gender: undefined,
  bloodGroup: undefined,
  nationality: 'Bangladesh',
  dateOfBirth: '',
  nidNumber: '',
  birthCertificateNumber: '',
  religion: undefined,
  phoneNumber: '',
  additionalPhoneNumber: '',
  presentAddress: '',
  permanentAddress: '',
  facebook: '',
  instagram: '',
};

// This list controls which fields appear in the read-only card.
const PERSONAL_INFO_ITEMS: FieldConfig[] = [
  {key: 'fullName', label: 'Full Name'},
  {key: 'gender', label: 'Gender'},
  {key: 'bloodGroup', label: 'Blood Group'},
  {key: 'nationality', label: 'Nationality'},
  {key: 'dateOfBirth', label: 'Date of Birth'},
  {key: 'nidNumber', label: 'National Identification Number'},
  {key: 'birthCertificateNumber', label: 'Birth Certificate Number'},
  {key: 'religion', label: 'Religion'},
  {key: 'phoneNumber', label: 'Phone Number'},
  {key: 'additionalPhoneNumber', label: 'Additional Phone Number'},
  {key: 'presentAddress', label: 'Present Address'},
  {key: 'permanentAddress', label: 'Permanent Address'},
];

const SOCIAL_LINK_FIELDS: FieldConfig[] = [
  {
    key: 'facebook',
    label: 'Facebook',
    placeholder: 'https://www.facebook.com/yourprofile',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    placeholder: 'https://www.instagram.com/yourprofile',
  },
];

// Used only for displaying the saved YYYY-MM-DD date in a readable format.
const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

const getDisplayValue = (value?: string) => {
  const trimmedValue = value?.trim();
  return trimmedValue || 'Not provided';
};

const formatDateForDisplay = (value?: string) => {
  const trimmedValue = value?.trim();

  if (!trimmedValue) return 'Not provided';

  const parsedDate = new Date(`${trimmedValue}T00:00:00`);

  return Number.isNaN(parsedDate.getTime())
    ? getDisplayValue(value)
    : dateFormatter.format(parsedDate);
};

// Converts stored profile values into values Ant Design Form can understand.
const toFormValues = (values: UserInfoValues): UserInfoFormValues => {
  const parsedDate = values.dateOfBirth ? dayjs(values.dateOfBirth) : null;

  return {
    ...values,
    dateOfBirth: parsedDate?.isValid() ? parsedDate : null,
  };
};

// Converts Ant Design Form values back into the profile shape.
const fromFormValues = (values: UserInfoFormValues): UserInfoValues => ({
  ...values,
  dateOfBirth: values.dateOfBirth?.format('YYYY-MM-DD') ?? '',
});

export default function UserInfoCard() {
  const {isOpen, openModal, closeModal} = useModal();
  const [form] = Form.useForm<UserInfoFormValues>();

  // Replace this temporary local state with Redux/API state later.
  const [profileValues, setProfileValues] =
    useState<UserInfoValues>(INITIAL_VALUES);

  const [isPermanentSame, setIsPermanentSame] = useState(false);
  const presentAddress = Form.useWatch('presentAddress', form);

  // Reset form values every time the modal opens.
  useEffect(() => {
    if (!isOpen) return;

    form.setFieldsValue(toFormValues(profileValues));
    setIsPermanentSame(false);
  }, [form, isOpen, profileValues]);

  // Keep permanent address synced while checkbox is enabled.
  useEffect(() => {
    if (!isPermanentSame) return;

    form.setFieldValue('permanentAddress', presentAddress || '');
  }, [form, isPermanentSame, presentAddress]);

  const handlePermanentAddressSync = (checked: boolean) => {
    setIsPermanentSame(checked);

    if (checked) {
      form.setFieldValue(
        'permanentAddress',
        form.getFieldValue('presentAddress') || '',
      );
    }
  };

  const validateNidOrBirthCertificate = () => {
    const nidNumber = form.getFieldValue('nidNumber')?.trim();
    const birthCertificateNumber = form
      .getFieldValue('birthCertificateNumber')
      ?.trim();

    if (nidNumber || birthCertificateNumber) {
      return Promise.resolve();
    }

    return Promise.reject(
      new Error('Please enter either NID or birth certificate number'),
    );
  };

  const handleSave = (values: UserInfoFormValues) => {
    // Replace this local save with API mutation/store update later.
    setProfileValues(fromFormValues(values));
    setIsPermanentSame(false);
    closeModal();
  };

  return (
    <div className="rounded-2xl border border-gray-200 p-5 dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Personal Information
          </h4>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-7 2xl:gap-x-32">
            {PERSONAL_INFO_ITEMS.map(({key, label}) => (
              <div key={key}>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  {label}
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {key === 'dateOfBirth'
                    ? formatDateForDisplay(profileValues.dateOfBirth)
                    : getDisplayValue(profileValues[key])}
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
              Edit Personal Information
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your personal details and optional social profile links.
            </p>
          </div>

          <Form<UserInfoFormValues>
            form={form}
            layout="vertical"
            initialValues={toFormValues(profileValues)}
            className="flex grow flex-col overflow-y-auto"
            onFinish={handleSave}
          >
            <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
              <div>
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Personal Information
                </h5>

                <div className="grid grid-cols-1 gap-x-6 lg:grid-cols-2">
                  <Form.Item
                    required
                    label="Full Name"
                    name="fullName"
                    className="col-span-2 lg:col-span-1"
                    validateTrigger="onBlur"
                    rules={[{validator: validateFullName}]}
                  >
                    <Input size="large" placeholder="Enter your full name" />
                  </Form.Item>

                  <Form.Item
                    label="Gender"
                    name="gender"
                    className="col-span-2 lg:col-span-1"
                    rules={requiredRule('Please select your gender')}
                  >
                    <Select
                      size="large"
                      placeholder="Select gender"
                      options={GENDER_OPTIONS}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Blood Group"
                    name="bloodGroup"
                    className="col-span-2 lg:col-span-1"
                  >
                    <Select
                      size="large"
                      allowClear
                      placeholder="Select blood group"
                      options={BLOOD_GROUP_OPTIONS}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Nationality"
                    name="nationality"
                    className="col-span-2 lg:col-span-1"
                    validateTrigger="onBlur"
                    rules={[{min: 3, message: 'Must be at least 3 characters'}]}
                  >
                    <Input size="large" placeholder="Enter your nationality" />
                  </Form.Item>

                  <Form.Item
                    label="Date of Birth"
                    name="dateOfBirth"
                    className="col-span-2 lg:col-span-1"
                    rules={requiredRule('Please select your date of birth')}
                  >
                    <DatePicker
                      size="large"
                      className="w-full"
                      format="DD MMM YYYY"
                      placeholder="Select date of birth"
                      disabledDate={(current) =>
                        current && current > dayjs().endOf('day')
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    label="Religion"
                    name="religion"
                    className="col-span-2 lg:col-span-1"
                    rules={requiredRule('Please select your religion')}
                  >
                    <Select
                      size="large"
                      placeholder="Select religion"
                      options={RELIGION_OPTIONS}
                    />
                  </Form.Item>

                  <Form.Item
                    label="National Identification Number"
                    name="nidNumber"
                    className="col-span-2 lg:col-span-1"
                    validateTrigger="onBlur"
                    dependencies={['birthCertificateNumber']}
                    rules={[
                      ...idNumberRules,
                      {validator: validateNidOrBirthCertificate},
                    ]}
                  >
                    <Input size="large" placeholder="Enter your NID number" />
                  </Form.Item>

                  <Form.Item
                    label="Birth Certificate Number"
                    name="birthCertificateNumber"
                    className="col-span-2 lg:col-span-1"
                    validateTrigger="onBlur"
                    dependencies={['nidNumber']}
                    rules={[
                      ...idNumberRules,
                      {validator: validateNidOrBirthCertificate},
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter your birth certificate number"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Phone Number"
                    name="phoneNumber"
                    className="col-span-2 lg:col-span-1"
                    validateTrigger="onBlur"
                    rules={[
                      ...requiredRule('Please enter your phone number'),
                      ...phoneRules,
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter your primary phone number"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Additional Phone Number"
                    name="additionalPhoneNumber"
                    className="col-span-2 lg:col-span-1"
                    validateTrigger="onBlur"
                    rules={phoneRules}
                  >
                    <Input
                      size="large"
                      placeholder="Enter an additional phone number"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Present Address"
                    name="presentAddress"
                    className="col-span-2 lg:col-span-1"
                    validateTrigger="onBlur"
                    rules={[
                      ...requiredRule('Please enter your present address'),
                      {
                        min: 5,
                        message: 'Address must be at least 5 characters',
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter your present address"
                    />
                  </Form.Item>

                  <div className="col-span-2 lg:col-span-1">
                    <Form.Item label=" " colon={false}>
                      <Checkbox
                        checked={isPermanentSame}
                        onChange={(event) =>
                          handlePermanentAddressSync(event.target.checked)
                        }
                      >
                        Permanent address is same as present address
                      </Checkbox>
                    </Form.Item>
                  </div>

                  <Form.Item
                    label="Permanent Address"
                    name="permanentAddress"
                    className="col-span-2 lg:col-span-1"
                    validateTrigger="onBlur"
                    rules={[
                      ...requiredRule('Please enter your permanent address'),
                      {
                        min: 5,
                        message: 'Address must be at least 5 characters',
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      disabled={isPermanentSame}
                      placeholder="Enter your permanent address"
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Social Links
                </h5>
                <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                  Optional. Add the full profile URL for any account you want to
                  share.
                </p>

                <div className="grid grid-cols-1 gap-x-6 lg:grid-cols-2">
                  {SOCIAL_LINK_FIELDS.map(({key, label, placeholder}) => (
                    <Form.Item
                      key={key}
                      label={label}
                      name={key}
                      validateTrigger="onBlur"
                      rules={optionalUrlRules}
                    >
                      <Input
                        size="large"
                        type="url"
                        placeholder={placeholder}
                      />
                    </Form.Item>
                  ))}
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
