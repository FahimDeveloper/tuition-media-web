import {Button, Checkbox, DatePicker, Form, Input, Select, Upload} from 'antd';
import type {FormInstance} from 'antd/es/form';
import dayjs from 'dayjs';
import {UploadOutlined} from '@ant-design/icons';

import {
  ProfileFormGrid,
  ProfileFormScrollArea,
  ProfileFormSection,
} from './ProfileFormLayout';
import {ProfileModalActions, ProfileModalHeader} from './ProfileModalContent';
import {requiredRule} from '../profileUtils';
import {
  BLOOD_GROUP_OPTIONS,
  GENDER_OPTIONS,
  RELIGION_OPTIONS,
  SOCIAL_LINK_FIELDS,
  fullNameRules,
  idNumberRules,
  optionalUrlRules,
  phoneRules,
  toPersonalInfoFormValues,
  type PersonalInfoFormValues,
  type PersonalInfoValues,
} from '../personalInfoTypes';

type PersonalInfoFormProps = {
  form: FormInstance<PersonalInfoFormValues>;
  values: PersonalInfoValues;
  isPermanentSame: boolean;
  onPermanentSameChange: (checked: boolean) => void;
  onCancel: () => void;
  onSubmit: (values: PersonalInfoFormValues) => void;
};

export default function PersonalInfoForm({
  form,
  values,
  isPermanentSame,
  onPermanentSameChange,
  onCancel,
  onSubmit,
}: PersonalInfoFormProps) {
  return (
    <>
      <ProfileModalHeader
        title="Edit Personal Information"
        description="Update your personal details and optional social profile links."
      />

      <Form<PersonalInfoFormValues>
        form={form}
        layout="vertical"
        initialValues={toPersonalInfoFormValues(values)}
        className="flex grow flex-col overflow-y-auto"
        onFinish={onSubmit}
      >
        <ProfileFormScrollArea>
          <ProfileFormSection title="Personal Information">
            <ProfileFormGrid className="gap-y-5">
              <Form.Item
                required
                label="Full Name"
                name="fullName"
                className="col-span-2 lg:col-span-1"
                validateTrigger="onBlur"
                rules={fullNameRules}
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

              {/* ✅ FIXED IDENTIFICATION SECTION */}
              <div className="col-span-2">
                <Form.Item label="Identification" required className="mb-2">
                  <div className="grid grid-cols-1 gap-3 lg:grid-cols-[35%_1fr]">
                    <Form.Item
                      name="idType"
                      className="mb-0"
                      rules={requiredRule('Select ID type')}
                    >
                      <Select
                        size="large"
                        placeholder="Type"
                        options={[
                          {label: 'NID', value: 'nid'},
                          {
                            label: 'Birth Certificate',
                            value: 'birth_certificate',
                          },
                        ]}
                      />
                    </Form.Item>

                    <Form.Item
                      name="idNumber"
                      className="mb-0"
                      rules={[
                        ...idNumberRules,
                        ...requiredRule('Enter ID number'),
                      ]}
                    >
                      <Input size="large" placeholder="Enter ID number" />
                    </Form.Item>
                  </div>
                </Form.Item>
              </div>

              <Form.Item
                label="ID Document"
                name="idImage"
                valuePropName="fileList"
                getValueFromEvent={(e) => e?.fileList}
                rules={[{required: true, message: 'Please upload ID document'}]}
              >
                <Upload
                  beforeUpload={() => false}
                  maxCount={1}
                  accept=".pdf,image/*"
                  className="block w-full"
                >
                  <Button icon={<UploadOutlined />} block size="large">
                    Upload ID (PDF or Image)
                  </Button>
                </Upload>
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
                  {min: 5, message: 'Address must be at least 5 characters'},
                ]}
              >
                <Input size="large" placeholder="Enter your present address" />
              </Form.Item>

              <Form.Item
                label="Permanent Address"
                name="permanentAddress"
                className="col-span-2 lg:col-span-1"
                validateTrigger="onBlur"
                rules={[
                  ...requiredRule('Please enter your permanent address'),
                  {min: 5, message: 'Address must be at least 5 characters'},
                ]}
              >
                <Input
                  size="large"
                  disabled={isPermanentSame}
                  placeholder="Enter your permanent address"
                />
              </Form.Item>

              <div className="flex items-center gap-2">
                <Checkbox
                  checked={isPermanentSame}
                  onChange={(event) =>
                    onPermanentSameChange(event.target.checked)
                  }
                >
                  Same as present address
                </Checkbox>
              </div>

              <Form.Item
                label="Bio"
                name="bio"
                className="col-span-2"
                rules={[
                  {max: 300, message: 'Bio cannot exceed 300 characters'},
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Write a short bio about yourself"
                />
              </Form.Item>
            </ProfileFormGrid>
          </ProfileFormSection>

          <div className="mt-7">
            <ProfileFormSection title="Social Links">
              <ProfileFormGrid>
                {SOCIAL_LINK_FIELDS.map(({key, label, placeholder}) => (
                  <Form.Item
                    key={key}
                    label={label}
                    name={key}
                    validateTrigger="onBlur"
                    rules={optionalUrlRules}
                  >
                    <Input size="large" type="url" placeholder={placeholder} />
                  </Form.Item>
                ))}
              </ProfileFormGrid>
            </ProfileFormSection>
          </div>
        </ProfileFormScrollArea>

        <ProfileModalActions onCancel={onCancel} />
      </Form>
    </>
  );
}
