import {Button, Checkbox, DatePicker, Form, Input, Select, Upload} from 'antd';
import type {UploadChangeParam} from 'antd/es/upload';
import dayjs from 'dayjs';
import {UploadOutlined} from '@ant-design/icons';

import {ProfileFormGrid, ProfileFormSection} from '../shared/ProfileFormLayout';
import {requiredRule} from '../profileUtils';
import {
  BLOOD_GROUP_OPTIONS,
  GENDER_OPTIONS,
  ID_TYPE_OPTIONS,
  RELIGION_OPTIONS,
  SOCIAL_LINK_FIELDS,
  fullNameRules,
  idNumberRules,
  optionalUrlRules,
  phoneRules,
} from './personalInfoTypes';

type PersonalInfoFormProps = {
  isPermanentAddressSame: boolean;
  onPermanentSameChange: (checked: boolean) => void;
};

const getUploadFileList = (event: UploadChangeParam) => event.fileList;

export default function PersonalInfoForm({
  isPermanentAddressSame,
  onPermanentSameChange,
}: PersonalInfoFormProps) {
  return (
    <>
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

          <div className="col-span-2">
            <Form.Item label="Identification" required>
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-[35%_1fr]">
                <Form.Item
                  name="idType"
                  className="mb-0"
                  rules={requiredRule('Select ID type')}
                >
                  <Select
                    size="large"
                    placeholder="Type"
                    options={ID_TYPE_OPTIONS}
                  />
                </Form.Item>

                <Form.Item
                  name="idNumber"
                  className="mb-0"
                  rules={[...idNumberRules, ...requiredRule('Enter ID number')]}
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
            getValueFromEvent={getUploadFileList}
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
            <Input size="large" placeholder="Enter your primary phone number" />
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
              disabled={isPermanentAddressSame}
              placeholder="Enter your permanent address"
            />
          </Form.Item>

          <div className="flex items-center gap-2">
            <Checkbox
              checked={isPermanentAddressSame}
              onChange={(event) => onPermanentSameChange(event.target.checked)}
            >
              Same as present address
            </Checkbox>
          </div>

          <Form.Item
            label="Bio"
            name="bio"
            className="col-span-2"
            rules={[{max: 300, message: 'Bio cannot exceed 300 characters'}]}
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
    </>
  );
}
