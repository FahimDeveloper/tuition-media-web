import {useEffect} from 'react';
import {Button, Checkbox, Form, Input, Select, Upload} from 'antd';
import type {UploadChangeParam} from 'antd/es/upload';
import {UploadOutlined} from '@ant-design/icons';

import {arrayRequiredRule, requiredRule} from '../profileUtils';
import {
  CURRENT_YEAR_OPTIONS,
  cgpaRules,
  gpaRules,
  yearRules,
  type ScoreFieldName,
} from './educationTypes';

type EducationCredentialFieldsProps = {
  scoreFieldName: ScoreFieldName;
  scoreLabel: 'GPA' | 'CGPA';
  includeCurrentYear?: boolean;
  certificateRequired?: boolean;
};

const getUploadFileList = (event: UploadChangeParam) => event.fileList;

export default function EducationCredentialFields({
  scoreFieldName,
  scoreLabel,
  includeCurrentYear = false,
  certificateRequired = false,
}: EducationCredentialFieldsProps) {
  const form = Form.useFormInstance();
  const isRunningStudent = Form.useWatch('isRunningStudent', form) ?? false;
  const scoreRules = scoreFieldName === 'gpa' ? gpaRules : cgpaRules;

  useEffect(() => {
    // Keep disabled fields out of the future API payload and clear stale errors.
    if (isRunningStudent) {
      form.setFields([
        {name: scoreFieldName, value: '', errors: []},
        {name: 'passingYear', value: '', errors: []},
        {name: 'certificateImage', value: [], errors: []},
      ]);
      return;
    }

    if (includeCurrentYear) {
      form.setFields([{name: 'currentYear', value: undefined, errors: []}]);
    }
  }, [form, includeCurrentYear, isRunningStudent, scoreFieldName]);

  return (
    <>
      <Form.Item
        label={scoreLabel}
        name={scoreFieldName}
        className="col-span-2 lg:col-span-1"
        validateTrigger="onBlur"
        rules={
          isRunningStudent
            ? []
            : [
                ...requiredRule(`Please enter your ${scoreLabel}`),
                ...scoreRules,
              ]
        }
      >
        <Input
          size="large"
          disabled={isRunningStudent}
          placeholder={`Enter your ${scoreLabel}`}
        />
      </Form.Item>

      <Form.Item
        label="Passing Year"
        name="passingYear"
        className="col-span-2 lg:col-span-1"
        validateTrigger="onBlur"
        rules={
          isRunningStudent
            ? []
            : [
                ...requiredRule('Please enter your passing year'),
                ...yearRules,
              ]
        }
      >
        <Input
          size="large"
          disabled={isRunningStudent}
          placeholder="Enter passing year"
        />
      </Form.Item>

      {includeCurrentYear ? (
        <Form.Item
          label="Current Year"
          name="currentYear"
          className="col-span-2 lg:col-span-1"
          rules={
            isRunningStudent
              ? requiredRule('Please select your current year')
              : []
          }
        >
          <Select
            size="large"
            disabled={!isRunningStudent}
            placeholder="Select current year"
            options={CURRENT_YEAR_OPTIONS}
          />
        </Form.Item>
      ) : null}

      <Form.Item
        label="Certificate Image"
        name="certificateImage"
        className="col-span-2 lg:col-span-1"
        valuePropName="fileList"
        getValueFromEvent={getUploadFileList}
        rules={
          certificateRequired && !isRunningStudent
            ? arrayRequiredRule('Please upload certificate image')
            : []
        }
      >
        <Upload
          beforeUpload={() => false}
          maxCount={1}
          accept="image/*"
          disabled={isRunningStudent}
          className="block w-full"
        >
          <Button
            icon={<UploadOutlined />}
            block
            size="large"
            disabled={isRunningStudent}
          >
            Upload Certificate Image
          </Button>
        </Upload>
      </Form.Item>

      <Form.Item
        name="isRunningStudent"
        valuePropName="checked"
        className="col-span-2"
      >
        <Checkbox>I&apos;m a running student</Checkbox>
      </Form.Item>
    </>
  );
}
