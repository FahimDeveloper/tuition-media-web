import { useEffect } from "react";
import { Form, Input, InputNumber, Select } from "antd";

import { ProfileFormGrid } from "../shared/ProfileFormLayout";
import { requiredRule } from "../profileUtils";
import {
  BOARD_OPTIONS,
  CURRICULUM_OPTIONS,
  GROUP_OPTIONS,
  STATUS_OPTIONS,
  cgpaRules,
  gpaRules,
  yearRules,
  type ScoreFieldName,
} from "./educationTypes";

type EducationCredentialFieldsProps = {
  scoreFieldName: ScoreFieldName;
  scoreLabel: "GPA" | "CGPA";
  includeStatus?: boolean;
  includePassingYear?: boolean;
  includeSession?: boolean;
};

const SESSION_RULES = [
  {
    pattern: /^\d{4}(?:-\d{4})?$/,
    message: "Enter a valid session, for example 2022 or 2022-2023",
  },
];

export function EducationCredentialFields({
  scoreFieldName,
  scoreLabel,
  includeStatus = false,
  includePassingYear = false,
  includeSession = false,
}: EducationCredentialFieldsProps) {
  const form = Form.useFormInstance();
  const status = Form.useWatch("status", form);
  const scoreRules = scoreFieldName === "gpa" ? gpaRules : cgpaRules;
  const isStudying = status === "studying";

  useEffect(() => {
    if (!isStudying) return;

    form.setFields([
      { name: scoreFieldName, value: "", errors: [] },
      { name: "year_of_passing", value: undefined, errors: [] },
    ]);
  }, [form, isStudying, scoreFieldName]);

  return (
    <>
      {includeStatus ? (
        <Form.Item
          label="Status"
          name="status"
          className="col-span-2 lg:col-span-1"
          rules={requiredRule("Please select your education status")}
        >
          <Select
            size="large"
            placeholder="Select status"
            options={STATUS_OPTIONS}
          />
        </Form.Item>
      ) : null}

      <Form.Item
        label={scoreLabel}
        name={scoreFieldName}
        className="col-span-2 lg:col-span-1"
        validateTrigger="onBlur"
        rules={
          isStudying
            ? []
            : [
                ...requiredRule(`Please enter your ${scoreLabel}`),
                ...scoreRules,
              ]
        }
      >
        <Input
          size="large"
          disabled={isStudying}
          placeholder={`Enter your ${scoreLabel}`}
        />
      </Form.Item>

      {includePassingYear ? (
        <Form.Item
          label="Year of Passing"
          name="year_of_passing"
          className="col-span-2 lg:col-span-1"
          rules={
            isStudying
              ? []
              : [
                  ...requiredRule("Please enter your year of passing"),
                  ...yearRules,
                ]
          }
        >
          <InputNumber
            size="large"
            min={1900}
            max={2099}
            disabled={isStudying}
            className="w-full!"
            placeholder="Enter year of passing"
          />
        </Form.Item>
      ) : null}

      {includeSession ? (
        <Form.Item
          label="Session"
          name="session"
          className="col-span-2 lg:col-span-1"
          validateTrigger="onBlur"
          rules={SESSION_RULES}
        >
          <Input size="large" placeholder="Example: 2022-2023" />
        </Form.Item>
      ) : null}
    </>
  );
}

export function AcademicInstitutionFields({
  nameLabel,
  namePlaceholder,
  includeStatus,
}: {
  nameLabel: string;
  namePlaceholder: string;
  includeStatus?: boolean;
}) {
  return (
    <ProfileFormGrid>
      <Form.Item
        label={nameLabel}
        name="name"
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
        rules={requiredRule("Please select your group")}
      >
        <Select size="large" placeholder="Select group" options={GROUP_OPTIONS} />
      </Form.Item>

      <Form.Item
        label="Curriculum"
        name="curriculum"
        className="col-span-2 lg:col-span-1"
        rules={requiredRule("Please select your curriculum")}
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
        rules={requiredRule("Please select your board")}
      >
        <Select size="large" placeholder="Select board" options={BOARD_OPTIONS} />
      </Form.Item>

      <EducationCredentialFields
        scoreFieldName="gpa"
        scoreLabel="GPA"
        includeStatus={includeStatus}
        includePassingYear
      />
    </ProfileFormGrid>
  );
}
