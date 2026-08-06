import {
  Button,
  Card,
  Col,
  Descriptions,
  Row,
  Tag,
  Typography,
  Space,
  Avatar,
  Divider,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiUser,
  FiMapPin,
  FiClock,
  FiCheckCircle,
  FiCalendar,
} from "react-icons/fi";
import { useGetSingleTeacherProfileQuery } from "@/redux/features/teachers/teachersApi";
import type { TPublicTeacher } from "@/types/teacher.types";
import PageShell from "./components/PageShell";
import {
  DetailsPageSkeleton,
  EmptyPanel,
  ErrorPanel,
} from "@/components/ui/feedback";

const { Title, Text } = Typography;

const TutorHubDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useGetSingleTeacherProfileQuery(
    id as string,
  );
  const teacher = data?.results;

  if (isLoading)
    return (
      <PageShell>
        <DetailsPageSkeleton />
      </PageShell>
    );
  if (isError)
    return (
      <PageShell>
        <ErrorPanel />
      </PageShell>
    );
  if (!teacher)
    return (
      <PageShell>
        <EmptyPanel />
      </PageShell>
    );

  return (
    <PageShell>
      <Button
        type="link"
        icon={<FiArrowLeft />}
        onClick={() => navigate(-1)}
        className="mb-6 px-0"
      >
        Back to tutor hub
      </Button>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Space orientation="vertical" size="middle" className="w-full">
            <TutorProfileHeader teacher={teacher} />

            <Card title="About Me" className="shadow-sm">
              <Text>{teacher.about_me || "No biography provided."}</Text>
            </Card>

            <PersonalDetailsCard teacher={teacher} />

            <Card title="Education Information" className="shadow-sm">
              <EducationList education={teacher.education} />
            </Card>

            <Card title="Tutoring Preferences" className="shadow-sm">
              <Descriptions
                column={1}
                labelStyle={{ width: 160 }}
                bordered
                size="small"
              >
                <Descriptions.Item label="Subjects" span={2}>
                  {teacher.preferred_tutoring.subjects.join(", ")}
                </Descriptions.Item>
                <Descriptions.Item label="Classes">
                  {teacher.preferred_tutoring.courses.join(", ")}
                </Descriptions.Item>
                <Descriptions.Item label="Tutoring Types">
                  {teacher.preferred_tutoring.tutoring_types.join(", ")}
                </Descriptions.Item>
                <Descriptions.Item label="Salary Range">
                  {teacher.preferred_tutoring.salary_range?.min} -{" "}
                  {teacher.preferred_tutoring.salary_range?.max} BDT
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Space>
        </Col>

        <Col xs={24} lg={8}>
          <ProfileSidebar teacher={teacher} />
        </Col>
      </Row>
    </PageShell>
  );
};

// --- Sub-Components ---

const TutorProfileHeader = ({ teacher }: { teacher: TPublicTeacher }) => (
  <Card className="shadow-sm">
    <div className="flex items-center gap-6">
      <Avatar
        size={80}
        icon={<FiUser />}
        src={teacher.profile_picture}
        className="bg-blue-100"
      />
      <div>
        <Title level={2} className="mb-1">
          {teacher.full_name}
        </Title>
        <Space wrap>
          {teacher.is_verified && (
            <Tag color="success" icon={<FiCheckCircle />}>
              Verified
            </Tag>
          )}
          <Tag color="cyan">
            <FiClock className="mr-1 inline-block" />{" "}
            {teacher.years_of_experience} Years Exp.
          </Tag>
          <Tag color="geekblue">
            <FiMapPin className="mr-1 inline-block" />{" "}
            {teacher?.preferred_teaching_locations?.city || "Various"}
          </Tag>
        </Space>
      </div>
    </div>
  </Card>
);

const PersonalDetailsCard = ({ teacher }: { teacher: TPublicTeacher }) => (
  <Card title="Personal Information" className="shadow-sm">
    <Descriptions column={{ xs: 1, sm: 2 }} bordered size="small">
      <Descriptions.Item label="Gender">
        {teacher.gender || "N/A"}
      </Descriptions.Item>
      <Descriptions.Item label="Blood Group">
        {teacher.blood_group || "N/A"}
      </Descriptions.Item>
      <Descriptions.Item label="Religion">
        {teacher.religion || "N/A"}
      </Descriptions.Item>
      <Descriptions.Item label="Marital Status">
        {teacher.marital_status || "N/A"}
      </Descriptions.Item>
      <Descriptions.Item label="DOB">
        <FiCalendar className="mr-1 inline" />{" "}
        {new Date(teacher.date_of_birth as string).toLocaleDateString()}
      </Descriptions.Item>
    </Descriptions>
  </Card>
);

const EducationList = ({
  education,
}: {
  education: TPublicTeacher["education"];
}) => {
  console.log({ education });

  if (!education) {
    return <Text type="secondary">No education information provided.</Text>;
  }

  const sections = [
    { key: "post_graduation", title: "Masters (Post Graduation)" },
    { key: "graduation", title: "University (Graduation)" },
    { key: "college", title: "College (HSC)" },
    { key: "school", title: "School (SSC)" },
  ];

  const hasData = sections.some((sec) =>
    education[sec.key as keyof typeof education]?.name?.trim(),
  );

  if (!hasData)
    return <Text type="secondary">No education information provided.</Text>;

  return (
    <Space orientation="vertical" size="large" className="w-full">
      {sections.map((section) => {
        const data = education[section.key as keyof typeof education];
        if (!data?.name?.trim()) return null;

        return (
          <div key={section.key}>
            <Divider
              titlePlacement="left"
              plain
              className="text-sm font-semibold"
            >
              {section.title}
            </Divider>
            <Descriptions
              bordered
              size="small"
              column={1}
              labelStyle={{ width: "160px" }}
            >
              {Object.entries(data).map(([key, val]) => (
                <Descriptions.Item label={key.replace("_", " ")} key={key}>
                  {val || "N/A"}
                </Descriptions.Item>
              ))}
            </Descriptions>
          </div>
        );
      })}
    </Space>
  );
};

const ProfileSidebar = ({ teacher }: { teacher: TPublicTeacher }) => (
  <div className="sticky top-20 flex flex-col gap-4">
    <Card title="Quick Summary" className="shadow-sm">
      <Space direction="vertical" className="w-full" size="small">
        <div className="flex justify-between">
          <Text type="secondary">Salary:</Text>
          <Text strong>
            {teacher.preferred_tutoring.salary_range?.min} -{" "}
            {teacher.preferred_tutoring.salary_range?.max} BDT
          </Text>
        </div>
        <div className="flex justify-between">
          <Text type="secondary">City:</Text>
          <Text>
            {teacher.preferred_teaching_locations?.city || "Not specified"}
          </Text>
        </div>
        <div className="flex justify-between">
          <Text type="secondary">Availability:</Text>
          <Text>
            {teacher?.tutoring_availability?.days?.length
              ? `${teacher?.tutoring_availability?.days?.length} Days / Week`
              : "Not specified"}
          </Text>
        </div>
      </Space>

      <Divider />

      <Button type="primary" size="large" block onClick={() => {}}>
        Apply for this Tutor
      </Button>
    </Card>

    {/* Optional: Add Availability Card here if you want it sticky too */}
  </div>
);

export default TutorHubDetails;
