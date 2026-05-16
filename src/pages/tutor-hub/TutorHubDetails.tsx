import { useCallback, useMemo, useState, type ReactNode } from "react";
import { Button, Form, Input, Typography } from "antd";
import { skipToken } from "@reduxjs/toolkit/query";
import { useNavigate, useParams } from "react-router-dom";
import type { IconType } from "react-icons";
import {
  FiArrowLeft,
  FiAward,
  FiBookOpen,
  FiCheckCircle,
  FiClock,
  FiHash,
  FiMapPin,
  FiRefreshCw,
  FiSend,
  FiShield,
  FiTag,
  FiUser,
  FiUserCheck,
} from "react-icons/fi";

import { Modal } from "@/components/ui/modal";
import {
  DetailsPageSkeleton,
  EmptyPanel,
  ErrorPanel,
} from "@/components/ui/feedback";
import { useModal } from "@/hooks/useModal";
import { TakaIcon } from "@/icons/TakaIcon";
import { useSinglePublicTeacherQuery } from "@/redux/features/teachers/teachersProfileApi";
import type { PublicTeacher, TeacherEducation } from "@/types";
import {
  formatPublicTeacherAvailability,
  formatPublicTeacherGender,
  formatPublicTeacherList,
  formatPublicTeacherSalary,
  formatPublicTeacherStatus,
  formatPublicTeacherTutoringType,
  formatPublicTeacherValue,
  getPublicTeacherInitials,
} from "@/utils/public-teacher.utils";
import { requiredRule } from "@/validations/form.validation";

const { Text } = Typography;
const { TextArea } = Input;

const TUTOR_DETAIL_LOAD_ERROR =
  "Please try again later. This tutor profile could not be loaded.";

const APPLICATION_INPUT_CLASS =
  "border-border! bg-surface-elevated! text-text-strong! shadow-theme-xs! placeholder:text-text-soft! hover:border-brand-300! focus:border-brand-300! focus:shadow-focus-ring! min-h-12! rounded-xl!";

const APPLICATION_TEXTAREA_CLASS =
  "border-border! bg-surface-elevated! text-text-strong! shadow-theme-xs! placeholder:text-text-soft! hover:border-brand-300! focus:border-brand-300! focus:shadow-focus-ring! rounded-xl!";

const SECONDARY_BUTTON_CLASS =
  "border-border! bg-surface-elevated! text-text-strong! hover:border-brand-300! hover:text-brand-700! min-h-12! rounded-xl! px-6! font-semibold!";

const PRIMARY_BUTTON_CLASS =
  "bg-brand-600! text-text-on-brand! hover:bg-brand-700! min-h-12! rounded-xl! px-6! font-semibold!";

type DetailItem = {
  label: string;
  value: string;
  icon: IconType;
};

type TutorApplicationFormValues = {
  full_name: string;
  phone_number: string;
  address: string;
  message: string;
};

type EducationRecord = NonNullable<TeacherEducation[keyof TeacherEducation]>;
type TutorDetailsView = ReturnType<typeof toTutorDetailsView>;
type EducationItem = ReturnType<typeof createEducationItem>;
type TutorApplicationFormInstance = ReturnType<
  typeof Form.useForm<TutorApplicationFormValues>
>[0];

const TutorHubDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const applyModal = useModal();

  const {
    data: teacher,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useSinglePublicTeacherQuery(id ?? skipToken);

  const tutor = useMemo(
    () => (teacher ? toTutorDetailsView(teacher) : undefined),
    [teacher],
  );

  const handleRefetch = useCallback(() => {
    void refetch();
  }, [refetch]);

  if (isLoading || (isFetching && !teacher)) {
    return (
      <TutorDetailsState>
        <DetailsPageSkeleton />
      </TutorDetailsState>
    );
  }

  if (isError) {
    return (
      <TutorDetailsState>
        <ErrorPanel
          title="Unable to load tutor"
          description={TUTOR_DETAIL_LOAD_ERROR}
          actionLabel="Refetch"
          onAction={handleRefetch}
          actionIcon={FiRefreshCw}
        />
      </TutorDetailsState>
    );
  }

  if (!tutor) {
    return (
      <TutorDetailsState>
        <EmptyPanel />
      </TutorDetailsState>
    );
  }

  return (
    <section className="bg-page px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <BackButton onClick={() => navigate(-1)} />

        <article className="border-brand-200/70 bg-surface-elevated shadow-theme-md dark:border-border overflow-hidden rounded-3xl border">
          <TutorHeader tutor={tutor} />

          <div className="grid gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-10">
            <TutorMainContent tutor={tutor} />

            <aside className="lg:sticky lg:top-6 lg:self-start">
              <ProfileSummaryCard
                summary={tutor.summary}
                onApply={applyModal.openModal}
              />
            </aside>
          </div>
        </article>
      </div>

      <TutorApplicationModal
        tutorId={tutor.id}
        tutorName={tutor.name}
        isOpen={applyModal.isOpen}
        onClose={applyModal.closeModal}
      />
    </section>
  );
};

const BackButton = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="border-brand-100/80 bg-surface-elevated text-text-strong shadow-theme-sm hover:border-brand-300 hover:text-brand-700 focus:ring-brand-400 focus:ring-offset-page dark:border-border dark:hover:text-brand-300 mb-6 inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition focus:ring-2 focus:ring-offset-2 focus:outline-none"
  >
    <FiArrowLeft size={16} aria-hidden="true" />
    Back
  </button>
);

const TutorHeader = ({ tutor }: { tutor: TutorDetailsView }) => (
  <header className="from-brand-50/80 via-surface-elevated to-brand-100/70 dark:from-brand-500/10 dark:via-surface-elevated dark:to-brand-500/5 relative overflow-hidden bg-gradient-to-br px-5 py-8 sm:px-8 lg:px-10">
    <div
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(102,153,207,0.22),transparent_40%),radial-gradient(circle_at_top_right,rgba(63,114,175,0.14),transparent_38%)]"
      aria-hidden="true"
    />

    <div className="relative z-10 grid gap-6 xl:grid-cols-[auto_minmax(0,1fr)_minmax(260px,340px)] xl:items-center">
      <div className="flex items-start gap-5 sm:gap-6 xl:contents">
        <Avatar name={tutor.name} />

        <div className="min-w-0 flex-1 xl:hidden">
          <div className="flex flex-wrap items-center gap-2">
            <StatusPill icon={FiClock} label={tutor.status} />
            <StatusPill icon={FiHash} label={`ID ${tutor.id}`} />
          </div>

          <h1 className="text-text-strong mt-4 text-2xl leading-tight font-bold sm:text-3xl">
            {tutor.name}
          </h1>
        </div>
      </div>

      <div className="hidden min-w-0 xl:block">
        <div className="flex flex-wrap items-center gap-2">
          <StatusPill icon={FiClock} label={tutor.status} />
          <StatusPill icon={FiHash} label={`ID ${tutor.id}`} />
        </div>

        <h1 className="text-text-strong mt-5 max-w-4xl text-4xl leading-tight font-bold">
          {tutor.name}
        </h1>

        <p className="text-text-muted mt-4 max-w-4xl text-base leading-7">
          {tutor.about}
        </p>
      </div>

      <p className="text-text-muted text-sm leading-7 sm:text-base xl:hidden">
        {tutor.about}
      </p>

      {tutor.profileDetails.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2 lg:flex-col lg:items-end">
          {tutor.profileDetails.map((item) => {
            const Icon = item.icon;

            return (
              <span
                key={`${tutor.id}-profile-badge-${item.label}`}
                className="border-brand-100/80 bg-surface-elevated/90 text-text-strong shadow-theme-xs dark:border-border dark:bg-brand-500/10 inline-flex max-w-full items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold backdrop-blur sm:text-sm xl:w-fit"
              >
                <Icon
                  className="text-brand-600 dark:text-brand-300 shrink-0"
                  size={15}
                  aria-hidden="true"
                />
                <span className="text-text-muted font-medium">
                  {item.label}:
                </span>
                <span className="truncate">{item.value}</span>
              </span>
            );
          })}
        </div>
      ) : null}
    </div>
  </header>
);

const Avatar = ({ name }: { name: string }) => (
  <div className="from-brand-600 to-brand-400 text-text-on-brand shadow-theme-md flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br text-2xl font-black sm:h-24 sm:w-24 sm:text-3xl">
    {getPublicTeacherInitials(name)}
  </div>
);

const TutorMainContent = ({ tutor }: { tutor: TutorDetailsView }) => (
  <div className="space-y-8">
    <EducationSection education={tutor.education} />

    <DetailsSection
      icon={FiMapPin}
      title="Preferred Teaching location"
      items={tutor.locationDetails}
      itemId={tutor.id}
    />

    <DetailsSection
      icon={FiBookOpen}
      title="Tuition preference"
      items={tutor.tuitionDetails}
      itemId={tutor.id}
    />

    <DetailsSection
      icon={FiCheckCircle}
      title="Tutor overview"
      items={tutor.overviewDetails}
      itemId={tutor.id}
    />
  </div>
);

const DetailsSection = ({
  icon,
  title,
  items,
  itemId,
}: {
  icon: IconType;
  title: string;
  items: DetailItem[];
  itemId: string;
}) => (
  <section className="border-brand-100/70 bg-surface-elevated dark:border-border rounded-3xl border p-5">
    <SectionTitle icon={icon} title={title} />

    {items.length > 0 ? (
      <DetailGrid items={items} itemId={itemId} />
    ) : (
      <p className="text-text-muted mt-4 text-sm">No information listed.</p>
    )}
  </section>
);

const EducationSection = ({ education }: { education: EducationItem[] }) => (
  <section className="border-brand-100/70 from-brand-50/70 to-surface-elevated dark:border-border dark:from-brand-500/8 dark:to-surface-elevated rounded-3xl border bg-gradient-to-br p-5">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <SectionTitle icon={FiAward} title="Education Information" />

      <span className="bg-surface-elevated text-brand-700 shadow-theme-xs dark:bg-brand-500/10 dark:text-brand-300 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-bold">
        {education.length > 0
          ? `${education.length} record${education.length > 1 ? "s" : ""}`
          : "No records"}
      </span>
    </div>

    {education.length > 0 ? (
      <div className="mt-5 grid gap-4">
        {education.map((item) => (
          <EducationCard key={item.level} item={item} />
        ))}
      </div>
    ) : (
      <p className="text-text-muted mt-4 text-sm">
        No education information listed.
      </p>
    )}
  </section>
);

const ProfileSummaryCard = ({
  summary,
  onApply,
}: {
  summary: TutorDetailsView["summary"];
  onApply: () => void;
}) => (
  <section className="border-brand-100/80 bg-surface-elevated shadow-theme-sm dark:border-border rounded-3xl border p-5">
    <SectionTitle icon={FiCheckCircle} title="Profile summary" />

    <dl className="mt-5 space-y-4">
      {summary.map((item) => (
        <SummaryRow key={item.label} item={item} />
      ))}
    </dl>

    <div className="border-brand-100/70 bg-brand-50/50 dark:border-border dark:bg-brand-500/6 mt-5 rounded-2xl border p-4">
      <div className="text-brand-700 dark:text-brand-300 flex items-center gap-2 text-xs font-semibold">
        <FiShield size={15} aria-hidden="true" />
        Contact policy
      </div>
      <p className="text-text-muted mt-2 text-sm leading-6">
        Users cannot contact tutors directly. Send your request to our team for
        the next step.
      </p>
    </div>

    <button
      type="button"
      onClick={onApply}
      className="bg-brand-600 text-text-on-brand hover:bg-brand-700 focus:ring-brand-400 focus:ring-offset-surface-elevated mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition focus:ring-2 focus:ring-offset-2 focus:outline-none"
    >
      <FiSend size={16} aria-hidden="true" />
      Apply for this tutor
    </button>
  </section>
);

const TutorApplicationModal = ({
  tutorId,
  tutorName,
  isOpen,
  onClose,
}: {
  tutorId: string;
  tutorName: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { form, isSubmitting, handleSubmit } = useTutorApplicationForm({
    tutorId,
    onSuccess: onClose,
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="mx-4 max-w-2xl"
      showCloseButton
    >
      <div className="px-5 py-6 sm:px-7 sm:py-8">
        <div className="pr-10">
          <p className="text-brand-700 dark:text-brand-300 text-xs font-semibold tracking-[0.14em] uppercase">
            Tutor application
          </p>
          <h2 className="text-text-strong mt-2 text-2xl font-bold">
            Apply for this tutor
          </h2>
          <p className="text-text-muted mt-2 text-sm leading-6">
            Send your requirement for {tutorName}. Our team will review it and
            contact you for the next step.
          </p>
        </div>

        <TutorApplicationForm
          form={form}
          isSubmitting={isSubmitting}
          onCancel={onClose}
          onSubmit={handleSubmit}
        />
      </div>
    </Modal>
  );
};

const TutorApplicationForm = ({
  form,
  isSubmitting,
  onCancel,
  onSubmit,
}: {
  form: TutorApplicationFormInstance;
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: (values: TutorApplicationFormValues) => Promise<void>;
}) => (
  <Form<TutorApplicationFormValues>
    form={form}
    layout="vertical"
    requiredMark={false}
    onFinish={onSubmit}
    className="[&_.ant-form-item-extra]:text-text-soft! [&_.ant-form-item-label>label]:text-text-strong! mt-6"
  >
    <div className="grid gap-x-4 sm:grid-cols-2">
      <Form.Item
        label={<Text className="text-text-strong!">Full name</Text>}
        name="full_name"
        rules={requiredRule("Please enter your full name.")}
      >
        <Input
          size="large"
          placeholder="Enter your full name"
          autoComplete="name"
          className={APPLICATION_INPUT_CLASS}
        />
      </Form.Item>

      <Form.Item
        label={<Text className="text-text-strong!">Phone number</Text>}
        name="phone_number"
        rules={requiredRule("Please enter your phone number.")}
      >
        <Input
          size="large"
          placeholder="Enter your phone number"
          inputMode="tel"
          autoComplete="tel"
          className={APPLICATION_INPUT_CLASS}
        />
      </Form.Item>
    </div>

    <Form.Item
      label={<Text className="text-text-strong!">Address</Text>}
      name="address"
      rules={requiredRule("Please enter your address.")}
    >
      <Input
        size="large"
        placeholder="Enter your address"
        autoComplete="street-address"
        className={APPLICATION_INPUT_CLASS}
      />
    </Form.Item>

    <Form.Item
      label={
        <Text className="text-text-strong!">
          Tell us about your requirement
        </Text>
      }
      name="message"
      rules={requiredRule("Please tell us about your requirement.")}
    >
      <TextArea
        rows={4}
        placeholder="Tell us about your requirement"
        className={APPLICATION_TEXTAREA_CLASS}
      />
    </Form.Item>

    <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      <Button
        size="large"
        onClick={onCancel}
        disabled={isSubmitting}
        className={SECONDARY_BUTTON_CLASS}
      >
        Cancel
      </Button>

      <Button
        type="primary"
        size="large"
        htmlType="submit"
        loading={isSubmitting}
        className={PRIMARY_BUTTON_CLASS}
      >
        Submit application
      </Button>
    </div>
  </Form>
);

const TutorDetailsState = ({ children }: { children: ReactNode }) => (
  <section className="bg-page px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
    <div className="border-brand-200/70 bg-surface-elevated shadow-theme-md dark:border-border rounded-3xl border p-8">
      {children}
    </div>
  </section>
);

const SectionTitle = ({
  icon: Icon,
  title,
}: {
  icon: IconType;
  title: string;
}) => (
  <div className="flex items-center gap-2">
    <Icon
      className="text-brand-600 dark:text-brand-300 shrink-0"
      size={18}
      aria-hidden="true"
    />
    <h2 className="text-text-strong text-lg font-bold">{title}</h2>
  </div>
);

const DetailGrid = ({
  items,
  itemId,
}: {
  items: DetailItem[];
  itemId: string;
}) => (
  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
    {items.map((item) => {
      const Icon = item.icon;

      return (
        <div
          key={`${itemId}-${item.label}`}
          className="border-brand-100/70 from-brand-50/70 to-surface-elevated dark:border-border dark:from-brand-500/8 dark:to-surface-elevated rounded-2xl border bg-gradient-to-br p-4"
        >
          <div className="text-brand-700 dark:text-brand-300 flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] uppercase">
            <Icon size={15} aria-hidden="true" />
            <span>{item.label}</span>
          </div>

          <p className="text-text-strong mt-2 text-base font-semibold break-words">
            {item.value}
          </p>
        </div>
      );
    })}
  </div>
);

const EducationCard = ({ item }: { item: EducationItem }) => (
  <article className="border-brand-100/70 bg-surface-elevated shadow-theme-xs dark:border-border hover:shadow-theme-sm rounded-2xl border p-4 transition hover:-translate-y-0.5">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
      <div className="bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
        <FiAward size={20} aria-hidden="true" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-brand-700 dark:text-brand-300 text-[11px] font-semibold tracking-[0.14em] uppercase">
              {item.level}
            </p>
            <h3 className="text-text-strong mt-1 text-base font-bold break-words">
              {item.name}
            </h3>
          </div>

          {item.status ? (
            <span className="bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300 inline-flex w-fit shrink-0 items-center rounded-xl px-3 py-1.5 text-xs font-bold">
              {item.status}
            </span>
          ) : null}
        </div>

        {item.details.length > 0 ? (
          <dl className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {item.details.map((detail) => (
              <div
                key={`${item.level}-${detail.label}`}
                className="border-brand-100/70 bg-surface-subtle/70 dark:border-border dark:bg-brand-500/4 rounded-xl border px-3 py-2.5"
              >
                <dt className="text-text-muted text-xs font-semibold tracking-wide uppercase">
                  {detail.label}
                </dt>
                <dd className="text-text-strong mt-1 text-sm font-semibold break-words">
                  {detail.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="text-text-muted mt-3 text-sm">
            No additional education details listed.
          </p>
        )}
      </div>
    </div>
  </article>
);

const StatusPill = ({
  icon: Icon,
  label,
}: {
  icon: IconType;
  label: string;
}) => (
  <span className="bg-surface-elevated text-brand-700 shadow-theme-sm dark:bg-brand-500/10 dark:text-brand-300 inline-flex max-w-full items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
    <Icon className="shrink-0" size={14} aria-hidden="true" />
    <span className="truncate">{label}</span>
  </span>
);

const SummaryRow = ({
  item,
}: {
  item: TutorDetailsView["summary"][number];
}) => (
  <div className="border-brand-100/70 dark:border-border flex items-start justify-between gap-4 border-b pb-3 last:border-b-0 last:pb-0">
    <dt className="text-text-muted text-sm">{item.label}</dt>
    <dd className="text-text-strong text-right text-sm font-semibold">
      {item.value}
    </dd>
  </div>
);

const useTutorApplicationForm = ({
  tutorId,
  onSuccess,
}: {
  tutorId: string;
  onSuccess: () => void;
}) => {
  const [form] = Form.useForm<TutorApplicationFormValues>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitTutorApplication = useCallback(
    async (payload: TutorApplicationFormValues & { tutor_id: string }) => {
      // Replace this placeholder with an RTK Query mutation when the endpoint is ready.
      // await createTutorApplication(payload).unwrap();
      void payload;
    },
    [],
  );

  const handleSubmit = useCallback(
    async (values: TutorApplicationFormValues) => {
      setIsSubmitting(true);

      try {
        await submitTutorApplication({ tutor_id: tutorId, ...values });
        form.resetFields();
        onSuccess();
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, onSuccess, submitTutorApplication, tutorId],
  );

  return {
    form,
    isSubmitting,
    handleSubmit,
  };
};

const toTutorDetailsView = (teacher: PublicTeacher) => {
  const tutoring = teacher.preferred_tutoring;
  const location = teacher.preferred_teaching_locations;
  const salary = formatPublicTeacherSalary(tutoring?.salary_range);
  const availability = formatPublicTeacherAvailability(
    teacher.tutoring_availability?.days,
  );
  const experience = `${formatPublicTeacherValue(
    teacher.years_of_experience,
    "0",
  )} years experience`;
  const subjects = formatPublicTeacherList(tutoring?.subjects);
  const tutoringType = formatPublicTeacherList(
    tutoring?.tutoring_types?.map(formatPublicTeacherTutoringType),
  );

  return {
    id: teacher._id,
    name: formatPublicTeacherValue(teacher.full_name, "Unnamed tutor"),
    status: teacher.is_active ? "Active" : "Inactive",
    about: teacher.about_me || "No tutor bio has been added yet.",
    summary: [
      { label: "Gender", value: formatPublicTeacherGender(teacher.gender) },
      { label: "Experience", value: experience },
      { label: "Availability", value: availability },
      { label: "Subjects", value: subjects },
      { label: "Salary", value: salary },
    ],
    overviewDetails: cleanDetails([
      { label: "Salary", value: salary, icon: TakaIcon },
      { label: "Availability", value: availability, icon: FiClock },
      { label: "Experience", value: experience, icon: FiUserCheck },
      { label: "Tutoring type", value: tutoringType, icon: FiMapPin },
      {
        label: "Gender",
        value: formatPublicTeacherGender(teacher.gender),
        icon: FiUser,
      },
    ]),
    tuitionDetails: cleanDetails([
      {
        label: "Categories",
        value: formatPublicTeacherList(tutoring?.categories),
        icon: FiTag,
      },
      {
        label: "Course",
        value: formatPublicTeacherList(tutoring?.courses),
        icon: FiBookOpen,
      },
      {
        label: "Subjects",
        value: subjects,
        icon: FiAward,
      },
    ]),
    locationDetails: cleanDetails([
      {
        label: "Country",
        value: formatPublicTeacherValue(location?.country),
        icon: FiMapPin,
      },
      {
        label: "City",
        value: formatPublicTeacherValue(location?.city),
        icon: FiMapPin,
      },
      {
        label: "Preferred area",
        value: formatPublicTeacherList(location?.area),
        icon: FiMapPin,
      },
    ]),
    profileDetails: cleanDetails([
      {
        label: "Verification",
        value: teacher.is_verified ? "Verified" : "New Tutor",
        icon: FiCheckCircle,
      },
      {
        label: "Profile status",
        value: teacher.is_active ? "Active" : "Inactive",
        icon: FiUserCheck,
      },
    ]),
    education: buildEducationItems(teacher.education),
  };
};

const buildEducationItems = (education?: TeacherEducation) => {
  if (!education) return [];

  return [
    createEducationItem("School", education.school, [
      ["Group", education.school?.group],
      ["Curriculum", education.school?.curriculum],
      ["Board", education.school?.board],
      ["GPA", education.school?.gpa],
      ["Passing year", education.school?.year_of_passing],
    ]),
    createEducationItem("College", education.college, [
      ["Group", education.college?.group],
      ["Curriculum", education.college?.curriculum],
      ["Board", education.college?.board],
      ["GPA", education.college?.gpa],
      ["Passing year", education.college?.year_of_passing],
    ]),
    createEducationItem("Diploma", education.diploma, [
      ["Type", education.diploma?.type],
      ["Department", education.diploma?.department],
      ["Study level", education.diploma?.study_level],
      ["CGPA", education.diploma?.cgpa],
      ["Session", education.diploma?.session],
    ]),
    createEducationItem("Graduation", education.graduation, [
      ["Department", education.graduation?.department],
      ["Type", education.graduation?.type],
      ["Study level", education.graduation?.study_level],
      ["GPA", education.graduation?.gpa],
      ["Session", education.graduation?.session],
    ]),
    createEducationItem("Post graduation", education.post_graduation, [
      ["Department", education.post_graduation?.department],
      ["Type", education.post_graduation?.type],
      ["Study level", education.post_graduation?.study_level],
      ["GPA", education.post_graduation?.gpa],
      ["Session", education.post_graduation?.session],
    ]),
  ].filter((item) => item.name !== "N/A" || item.details.length > 0);
};

const createEducationItem = (
  level: string,
  education: EducationRecord | undefined,
  details: Array<[string, string | number | undefined]>,
) => {
  const status =
    education && "status" in education
      ? formatPublicTeacherStatus(education.status)
      : undefined;

  return {
    level,
    name: formatPublicTeacherValue(education?.name),
    ...(status ? { status } : {}),
    details: details
      .map(([label, value]) => ({
        label,
        value: formatPublicTeacherValue(value),
      }))
      .filter((item) => item.value !== "N/A"),
  };
};

const cleanDetails = (items: DetailItem[]) =>
  items.filter((item) => item.value !== "N/A");

export default TutorHubDetails;
