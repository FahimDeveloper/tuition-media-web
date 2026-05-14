import { useEffect } from "react";
import { Checkbox, Form, Input, InputNumber, Select } from "antd";
import type { Rule } from "antd/es/form";

import ProfileEditableSection, {
  ProfileFormGrid,
  type ProfileInfoField,
} from "../shared/ProfileEditableSection";
import { getDisplayValue } from "@/utils/display.utils";
import { requiredRule } from "@/validations/form.validation";
import type {
  CollegeValues,
  DiplomaValues,
  EducationSectionKey,
  EducationStatus,
  EducationValues,
  GraduationValues,
  PostGraduationValues,
  SchoolValues,
} from "../profileModel";

type ScoreFieldName = "gpa" | "cgpa";

type CollegeFormValues = Omit<CollegeValues, "is_diploma_student">;
type HigherEducationValues = GraduationValues | PostGraduationValues;

const yearRules: Rule[] = [
  {
    type: "number",
    min: 1900,
    max: 2099,
    message: "Enter a valid year",
  },
];

const gpaRules: Rule[] = [
  {
    pattern: /^(?:[0-4](?:\.\d{1,2})?|5(?:\.0{1,2})?)$/,
    message: "Enter a valid GPA between 0 and 5",
  },
];

const cgpaRules: Rule[] = [
  {
    pattern: /^(?:[0-3](?:\.\d{1,2})?|4(?:\.0{1,2})?)$/,
    message: "Enter a valid CGPA between 0 and 4",
  },
];

const STATUS_OPTIONS: { label: string; value: EducationStatus }[] = [
  { label: "Graduated", value: "graduated" },
  { label: "Studying", value: "studying" },
];

const GROUP_OPTIONS = [
  { label: "Science", value: "Science" },
  { label: "Business Studies", value: "Business Studies" },
  { label: "Humanities", value: "Humanities" },
  { label: "Other", value: "Other" },
];

const CURRICULUM_OPTIONS = [
  { label: "Bangla Medium", value: "Bangla Medium" },
  { label: "English Version", value: "English Version" },
  { label: "English Medium", value: "English Medium" },
  { label: "Other", value: "Other" },
];

const BOARD_OPTIONS = [
  { label: "Dhaka", value: "Dhaka" },
  { label: "Chattogram", value: "Chattogram" },
  { label: "Rajshahi", value: "Rajshahi" },
  { label: "Khulna", value: "Khulna" },
  { label: "Barishal", value: "Barishal" },
  { label: "Sylhet", value: "Sylhet" },
  { label: "Rangpur", value: "Rangpur" },
  { label: "Mymensingh", value: "Mymensingh" },
  { label: "Cumilla", value: "Cumilla" },
  { label: "Jessore", value: "Jessore" },
  { label: "Dinajpur", value: "Dinajpur" },
  { label: "Madrasah", value: "Madrasah" },
  { label: "Technical", value: "Technical" },
  { label: "Other", value: "Other" },
];

const INSTITUTE_TYPE_OPTIONS = [
  { label: "Government", value: "Government" },
  { label: "Private", value: "Private" },
  { label: "Other", value: "Other" },
];

const UNIVERSITY_TYPE_OPTIONS = [
  { label: "Public", value: "Public" },
  { label: "Private", value: "Private" },
  { label: "National University", value: "National University" },
  { label: "Other", value: "Other" },
];

const STUDY_LEVEL_OPTIONS = [
  { label: "Medical", value: "Medical" },
  { label: "Engineering", value: "Engineering" },
  { label: "BBA", value: "BBA" },
  { label: "BSC", value: "BSC" },
  { label: "BA", value: "BA" },
  { label: "Degree", value: "Degree" },
  { label: "Fazil", value: "Fazil" },
  { label: "BSS", value: "BSS" },
  { label: "LLB", value: "LLB" },
];

const SCHOOL_INFO_ITEMS: ProfileInfoField<SchoolValues>[] = [
  { key: "name", label: "School Name" },
  { key: "group", label: "Group" },
  { key: "curriculum", label: "Curriculum" },
  { key: "board", label: "Board" },
  { key: "gpa", label: "GPA" },
  { key: "year_of_passing", label: "Year of Passing" },
];

const COLLEGE_INFO_ITEMS: ProfileInfoField<CollegeValues>[] = [
  { key: "name", label: "College Name" },
  { key: "group", label: "Group" },
  { key: "curriculum", label: "Curriculum" },
  { key: "board", label: "Board" },
  { key: "gpa", label: "GPA" },
  { key: "year_of_passing", label: "Year of Passing" },
  { key: "status", label: "Status" },
  { key: "is_diploma_student", label: "Diploma Student" },
];

const DIPLOMA_INFO_ITEMS: ProfileInfoField<DiplomaValues>[] = [
  { key: "is_diploma", label: "Diploma Student" },
  { key: "name", label: "Institution Name" },
  { key: "department", label: "Department" },
  { key: "type", label: "Institute Type" },
  { key: "study_level", label: "Study Level" },
  { key: "cgpa", label: "CGPA" },
  { key: "session", label: "Session" },
  { key: "status", label: "Status" },
];

const GRADUATION_INFO_ITEMS: ProfileInfoField<GraduationValues>[] = [
  { key: "name", label: "University Name" },
  { key: "department", label: "Department" },
  { key: "type", label: "University Type" },
  { key: "study_level", label: "Study Level" },
  { key: "gpa", label: "GPA" },
  { key: "session", label: "Session" },
  { key: "status", label: "Status" },
];

const POST_GRADUATION_INFO_ITEMS: ProfileInfoField<PostGraduationValues>[] = [
  { key: "name", label: "University Name" },
  { key: "department", label: "Department" },
  { key: "type", label: "University Type" },
  { key: "study_level", label: "Study Level" },
  { key: "gpa", label: "GPA" },
  { key: "session", label: "Session" },
  { key: "status", label: "Status" },
];

const SESSION_RULES = [
  {
    pattern: /^\d{4}(?:-\d{4})?$/,
    message: "Enter a valid session, for example 2022 or 2022-2023",
  },
];

const prepareEducationPayload = <TValues extends object>(
  values: TValues,
): TValues => {
  // The API owns the final field names. This helper only removes stale values
  // from fields that are not meaningful while a teacher is still studying.
  if (!("status" in values) || values.status !== "studying") return values;

  return {
    ...values,
    gpa: "",
    cgpa: "",
    year_of_passing: undefined,
  } as TValues;
};

const formatEducationValue = <TValues extends object>(
  _key: string,
  value: unknown,
  _values: TValues,
) => {
  return getDisplayValue(value);
};

function EducationCredentialFields({
  scoreFieldName,
  scoreLabel,
  includeStatus = false,
  includePassingYear = false,
  includeSession = false,
}: {
  scoreFieldName: ScoreFieldName;
  scoreLabel: "GPA" | "CGPA";
  includeStatus?: boolean;
  includePassingYear?: boolean;
  includeSession?: boolean;
}) {
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

function AcademicInstitutionFields({
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

function SchoolInfoSection({
  values,
  onSave,
  isSaving = false,
  saveError,
  onClearSaveError,
}: {
  values: SchoolValues;
  onSave: (values: SchoolValues) => Promise<void> | void;
  isSaving?: boolean;
  saveError?: string;
  onClearSaveError?: () => void;
}) {
  return (
    <ProfileEditableSection
      title="School"
      modalTitle="Edit School Information"
      modalDescription="Update your school information."
      values={values}
      items={SCHOOL_INFO_ITEMS}
      formatValue={formatEducationValue}
      onSave={onSave}
      isSaving={isSaving}
      saveError={saveError}
      onClearSaveError={onClearSaveError}
      fromFormValues={prepareEducationPayload}
    >
      <AcademicInstitutionFields
        nameLabel="School Name"
        namePlaceholder="Enter your school name"
      />
    </ProfileEditableSection>
  );
}

function CollegeInfoSection({
  values,
  isDiplomaStudent,
  onDiplomaToggle,
  onSave,
  isSaving = false,
  saveError,
  onClearSaveError,
}: {
  values: CollegeValues;
  isDiplomaStudent: boolean;
  onDiplomaToggle: (checked: boolean) => void;
  onSave: (values: CollegeValues) => Promise<void> | void;
  isSaving?: boolean;
  saveError?: string;
  onClearSaveError?: () => void;
}) {
  return (
    <ProfileEditableSection<CollegeValues, CollegeFormValues>
      title="College"
      modalTitle="Edit College Information"
      modalDescription="Update your college information."
      values={values}
      items={COLLEGE_INFO_ITEMS}
      formatValue={formatEducationValue}
      onSave={onSave}
      isSaving={isSaving}
      saveError={saveError}
      onClearSaveError={onClearSaveError}
      toFormValues={(collegeValues) => ({
        name: collegeValues.name,
        group: collegeValues.group,
        curriculum: collegeValues.curriculum,
        board: collegeValues.board,
        gpa: collegeValues.gpa,
        year_of_passing: collegeValues.year_of_passing,
        status: collegeValues.status,
      })}
      fromFormValues={(formValues) => ({
        ...prepareEducationPayload(formValues),
        is_diploma_student: isDiplomaStudent,
      })}
      renderAction={({ defaultAction }) => (
        <div className="flex flex-col gap-3 lg:items-end">
          <Checkbox
            checked={isDiplomaStudent}
            disabled={isSaving}
            onChange={(event) => onDiplomaToggle(event.target.checked)}
          >
            I am a diploma student
          </Checkbox>

          {defaultAction}
        </div>
      )}
    >
      <AcademicInstitutionFields
        nameLabel="College Name"
        namePlaceholder="Enter your college name"
        includeStatus
      />
    </ProfileEditableSection>
  );
}

function DiplomaInfoSection({
  values,
  isDiplomaStudent,
  onDiplomaToggle,
  onSave,
  isSaving = false,
  saveError,
  onClearSaveError,
}: {
  values: DiplomaValues;
  isDiplomaStudent: boolean;
  onDiplomaToggle: (checked: boolean) => void;
  onSave: (values: DiplomaValues) => Promise<void> | void;
  isSaving?: boolean;
  saveError?: string;
  onClearSaveError?: () => void;
}) {
  return (
    <ProfileEditableSection
      title="Diploma"
      modalTitle="Edit Diploma Information"
      modalDescription="Update your diploma information."
      values={values}
      items={DIPLOMA_INFO_ITEMS}
      formatValue={formatEducationValue}
      onSave={onSave}
      isSaving={isSaving}
      saveError={saveError}
      onClearSaveError={onClearSaveError}
      fromFormValues={prepareEducationPayload}
      renderAction={({ defaultAction }) => (
        <div className="flex flex-col gap-3 lg:items-end">
          <Checkbox
            checked={isDiplomaStudent}
            disabled={isSaving}
            onChange={(event) => onDiplomaToggle(event.target.checked)}
          >
            I am a diploma student
          </Checkbox>

          {defaultAction}
        </div>
      )}
    >
      <ProfileFormGrid>
        <Form.Item
          label="Institution Name"
          name="name"
          className="col-span-2 lg:col-span-1"
          validateTrigger="onBlur"
          rules={requiredRule("Please enter your institution name")}
        >
          <Input size="large" placeholder="Enter your institution name" />
        </Form.Item>

        <Form.Item
          label="Department"
          name="department"
          className="col-span-2 lg:col-span-1"
          validateTrigger="onBlur"
          rules={requiredRule("Please enter your department")}
        >
          <Input size="large" placeholder="Enter your department" />
        </Form.Item>

        <Form.Item
          label="Institute Type"
          name="type"
          className="col-span-2 lg:col-span-1"
          rules={requiredRule("Please select your institute type")}
        >
          <Select
            size="large"
            placeholder="Select institute type"
            options={INSTITUTE_TYPE_OPTIONS}
          />
        </Form.Item>

        <Form.Item
          label="Study Type"
          name="study_level"
          className="col-span-2 lg:col-span-1"
          rules={requiredRule("Please select your study type")}
        >
          <Select
            size="large"
            placeholder="Select study type"
            options={STUDY_LEVEL_OPTIONS}
          />
        </Form.Item>

        <EducationCredentialFields
          scoreFieldName="cgpa"
          scoreLabel="CGPA"
          includeStatus
          includeSession
        />
      </ProfileFormGrid>
    </ProfileEditableSection>
  );
}

function HigherEducationSection<TValues extends HigherEducationValues>({
  title,
  modalTitle,
  modalDescription,
  values,
  infoItems,
  onSave,
  isSaving = false,
  saveError,
  onClearSaveError,
}: {
  title: string;
  modalTitle: string;
  modalDescription: string;
  values: TValues;
  infoItems: ProfileInfoField<TValues>[];
  onSave: (values: TValues) => Promise<void> | void;
  isSaving?: boolean;
  saveError?: string;
  onClearSaveError?: () => void;
}) {
  return (
    <ProfileEditableSection
      title={title}
      modalTitle={modalTitle}
      modalDescription={modalDescription}
      values={values}
      items={infoItems}
      formatValue={formatEducationValue}
      onSave={onSave}
      isSaving={isSaving}
      saveError={saveError}
      onClearSaveError={onClearSaveError}
      fromFormValues={prepareEducationPayload}
    >
      <ProfileFormGrid>
        <Form.Item
          label="University Name"
          name="name"
          className="col-span-2 lg:col-span-1"
          validateTrigger="onBlur"
          rules={requiredRule("Please enter your university name")}
        >
          <Input size="large" placeholder="Enter your university name" />
        </Form.Item>

        <Form.Item
          label="Department"
          name="department"
          className="col-span-2 lg:col-span-1"
          validateTrigger="onBlur"
          rules={requiredRule("Please enter your department")}
        >
          <Input size="large" placeholder="Enter your department" />
        </Form.Item>

        <Form.Item
          label="University Type"
          name="type"
          className="col-span-2 lg:col-span-1"
          rules={requiredRule("Please select your university type")}
        >
          <Select
            size="large"
            placeholder="Select university type"
            options={UNIVERSITY_TYPE_OPTIONS}
          />
        </Form.Item>

        <Form.Item
          label="Study Type"
          name="study_level"
          className="col-span-2 lg:col-span-1"
          rules={requiredRule("Please select your study type")}
        >
          <Select
            size="large"
            placeholder="Select study type"
            options={STUDY_LEVEL_OPTIONS}
          />
        </Form.Item>

        <EducationCredentialFields
          scoreFieldName="gpa"
          scoreLabel="GPA"
          includeStatus
          includeSession
        />
      </ProfileFormGrid>
    </ProfileEditableSection>
  );
}

function GraduationInfoSection({
  values,
  onSave,
  isSaving = false,
  saveError,
  onClearSaveError,
}: {
  values: GraduationValues;
  onSave: (values: GraduationValues) => Promise<void> | void;
  isSaving?: boolean;
  saveError?: string;
  onClearSaveError?: () => void;
}) {
  return (
    <HigherEducationSection
      title="Graduation"
      modalTitle="Edit Graduation Information"
      modalDescription="Update your graduation information."
      values={values}
      infoItems={GRADUATION_INFO_ITEMS}
      onSave={onSave}
      isSaving={isSaving}
      saveError={saveError}
      onClearSaveError={onClearSaveError}
    />
  );
}

function PostGraduationInfoSection({
  values,
  onSave,
  isSaving = false,
  saveError,
  onClearSaveError,
}: {
  values: PostGraduationValues;
  onSave: (values: PostGraduationValues) => Promise<void> | void;
  isSaving?: boolean;
  saveError?: string;
  onClearSaveError?: () => void;
}) {
  return (
    <HigherEducationSection
      title="Post Graduation"
      modalTitle="Edit Post Graduation Information"
      modalDescription="Update your post graduation information."
      values={values}
      infoItems={POST_GRADUATION_INFO_ITEMS}
      onSave={onSave}
      isSaving={isSaving}
      saveError={saveError}
      onClearSaveError={onClearSaveError}
    />
  );
}

type EducationInfoSectionProps = {
  values: EducationValues;
  onSave: <TKey extends EducationSectionKey>(
    sectionKey: TKey,
    values: EducationValues[TKey],
  ) => Promise<void> | void;
  onDiplomaToggle: (checked: boolean) => void;
  savingSection?: EducationSectionKey | null;
  saveErrors?: Partial<Record<EducationSectionKey, string>>;
  onClearSaveError?: (sectionKey: EducationSectionKey) => void;
};

export default function EducationInfoSection({
  values,
  onSave,
  onDiplomaToggle,
  savingSection = null,
  saveErrors = {},
  onClearSaveError,
}: EducationInfoSectionProps) {
  const isDiplomaStudent = Boolean(values.college.is_diploma_student);
  const clearSaveError = (sectionKey: EducationSectionKey) => {
    onClearSaveError?.(sectionKey);
  };

  return (
    <div className="space-y-6">
      <SchoolInfoSection
        values={values.school}
        onSave={(school) => onSave("school", school)}
        isSaving={savingSection === "school"}
        saveError={saveErrors.school}
        onClearSaveError={() => clearSaveError("school")}
      />

      {isDiplomaStudent ? (
        <DiplomaInfoSection
          values={values.diploma}
          isDiplomaStudent={isDiplomaStudent}
          onDiplomaToggle={onDiplomaToggle}
          onSave={(diploma) => onSave("diploma", diploma)}
          isSaving={savingSection === "diploma"}
          saveError={saveErrors.diploma}
          onClearSaveError={() => clearSaveError("diploma")}
        />
      ) : (
        <CollegeInfoSection
          values={values.college}
          isDiplomaStudent={isDiplomaStudent}
          onDiplomaToggle={onDiplomaToggle}
          onSave={(college) => onSave("college", college)}
          isSaving={savingSection === "college"}
          saveError={saveErrors.college}
          onClearSaveError={() => clearSaveError("college")}
        />
      )}

      <GraduationInfoSection
        values={values.graduation}
        onSave={(graduation) => onSave("graduation", graduation)}
        isSaving={savingSection === "graduation"}
        saveError={saveErrors.graduation}
        onClearSaveError={() => clearSaveError("graduation")}
      />

      <PostGraduationInfoSection
        values={values.post_graduation}
        onSave={(postGraduationValues) =>
          onSave("post_graduation", postGraduationValues)
        }
        isSaving={savingSection === "post_graduation"}
        saveError={saveErrors.post_graduation}
        onClearSaveError={() => clearSaveError("post_graduation")}
      />
    </div>
  );
}
