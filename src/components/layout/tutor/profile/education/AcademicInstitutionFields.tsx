import {Form, Input, Select} from 'antd';
import type {ReactNode} from 'react';

import {ProfileFormGrid} from '../shared/ProfileFormLayout';
import {requiredRule} from '../profileUtils';
import {
  BOARD_OPTIONS,
  CURRICULUM_OPTIONS,
  GROUP_OPTIONS,
  gpaRules,
  yearRules,
} from './educationTypes';

type AcademicInstitutionFieldsProps = {
  nameField: 'schoolName' | 'collegeName';
  nameLabel: string;
  namePlaceholder: string;
  children?: ReactNode;
};

export default function AcademicInstitutionFields({
  nameField,
  nameLabel,
  namePlaceholder,
  children,
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
        rules={[...requiredRule('Please enter your GPA'), ...gpaRules]}
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

      {children}
    </ProfileFormGrid>
  );
}
