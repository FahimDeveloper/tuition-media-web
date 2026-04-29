import {useEffect} from 'react';
import {Button, Checkbox, Form, Input, Select, Upload} from 'antd';
import type {UploadChangeParam} from 'antd/es/upload';
import {UploadOutlined} from '@ant-design/icons';

import {ProfileFormGrid} from '../shared/ProfileFormLayout';
import {arrayRequiredRule, requiredRule} from '../profileUtils';
import {
  BOARD_OPTIONS,
  CURRENT_YEAR_OPTIONS,
  CURRICULUM_OPTIONS,
  GROUP_OPTIONS,
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

type AcademicInstitutionFieldsProps = {
  nameField: 'schoolName' | 'collegeName';
  nameLabel: string;
  namePlaceholder: string;
  certificateRequired?: boolean;
};

const getUploadFileList = (event: UploadChangeParam) => event.fileList;

export function EducationCredentialFields({
  scoreFieldName,
  scoreLabel,
  includeCurrentYear = false,
  certificateRequired = false,
}: EducationCredentialFieldsProps) {
  const form = Form.useFormInstance();
  const isRunningStudent = Form.useWatch('isRunningStudent', form) ?? false;
  const scoreRules = scoreFieldName === 'gpa' ? gpaRules : cgpaRules;

  useEffect(() => {
    // These fields are disabled for running students, so clear them before save.
    // This keeps the eventual RTK Query payload free from stale form values.
    if (isRunningStudent) {
      form.setFields([
        {name: scoreFieldName, value: '', errors: []},
        {name: 'passingYear', value: '', errors: []},
        {name: 'certificateImage', value: [], errors: []},
      ]);
      return;
    }

    // Current Year is meaningful only for running Diploma/Graduation students.
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

export function AcademicInstitutionFields({
  nameField,
  nameLabel,
  namePlaceholder,
  certificateRequired,
}: AcademicInstitutionFieldsProps) {
  return (
    <ProfileFormGrid>
      <Form.Item
        label={nameLabel}
        name={nameField}
        className="col-span-2 lg:col-span-1"
        validateTrigger="onBlur"
        rules={requiredRule(`Please enter your ${nameLabel.toLowerCase()}`)}
      >
        <Input size="large" placeholder={namePlaceholder} />
      </Form.Item>

      <Form.Item
        label="Group"
        name="group"
        className="col-span-2 lg:col-span-1"
        rules={requiredRule('Please select your group')}
      >
        <Select size="large" placeholder="Select group" options={GROUP_OPTIONS} />
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
        <Select size="large" placeholder="Select board" options={BOARD_OPTIONS} />
      </Form.Item>

      <EducationCredentialFields
        scoreFieldName="gpa"
        scoreLabel="GPA"
        certificateRequired={certificateRequired}
      />
    </ProfileFormGrid>
  );
}
