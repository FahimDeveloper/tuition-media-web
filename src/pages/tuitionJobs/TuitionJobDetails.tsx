import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  Typography,
  Descriptions,
  Tag,
  Button,
  Row,
  Col,
  Space,
  Spin,
  Result,
  Divider,
  Alert,
} from "antd";
import {
  ArrowLeftOutlined,
  // CalendarOutlined,
  // CheckCircleOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  BookOutlined,
  // UserOutlined,
  // InfoCircleOutlined,
  // GlobalOutlined,
  DollarOutlined,
} from "@ant-design/icons";

import { useGetTuitionJobQuery } from "@/redux/features/tuitionJobs/tuitionJobsApi";
import PageShell from "./components/PageShell";
import {
  DetailsPageSkeleton,
  EmptyPanel,
  ErrorPanel,
} from "@/components/ui/feedback";

const { Title, Text, Paragraph } = Typography;

const TuitionDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useGetTuitionJobQuery(id as string);

  const tuition = data?.results;

  const handleBack = () => navigate(-1);

  if (isLoading)
    return (
      <PageShell>
        <DetailsPageSkeleton />
      </PageShell>
    );

  if (isError) {
    return (
      <PageShell>
        <ErrorPanel />
      </PageShell>
    );
  }

  if (!tuition) {
    return (
      <PageShell>
        <EmptyPanel />
      </PageShell>
    );
  }

  // Helper to format salary based on TTuitionJob definition
  const renderSalary = () => {
    return `${tuition.salary.min || 0} - ${tuition.salary.max || 0} BDT / ${tuition.salary.rate_type}`;
  };

  return (
    <PageShell>
      <Button
        type="link"
        onClick={handleBack}
        icon={<ArrowLeftOutlined />}
        className="mb-6"
      >
        Back to tuitions job
      </Button>

      <Row gutter={[24, 24]}>
        {/* Main Content Column */}
        <Col xs={24} lg={16}>
          <Space orientation="vertical" size="large" className="w-full">
            {/* Header Card */}
            <Card bordered={false} className="shadow-sm">
              <Title level={2} className="mt-2 mb-1">
                {tuition.title}
              </Title>
              <Text type="secondary" className="me-4">
                ID: {tuition.serial_number || "N/A"}
              </Text>
              <Text type="secondary">
                Status:{" "}
                <Tag color="blue" icon={<ClockCircleOutlined />}>
                  {tuition.status}
                </Tag>
              </Text>
            </Card>

            {/* Description Section */}
            {tuition.job_description && (
              <Card title="Job Description" bordered={false}>
                <Paragraph>{tuition.job_description}</Paragraph>
              </Card>
            )}

            {/* Education & Overview */}
            <Card
              title={
                <>
                  <BookOutlined /> Student Education & Overview
                </>
              }
              variant="borderless"
            >
              <Descriptions
                labelStyle={{ width: 180 }}
                column={{ xs: 1, md: 1, lg: 2, xl: 2, xxl: 2, xxxl: 2 }}
                bordered
                size="small"
                className="mb-4!"
              >
                <Descriptions.Item label="Education Category">
                  {tuition.student_education.category}
                </Descriptions.Item>
                <Descriptions.Item label="Education Course">
                  {tuition.student_education.course}
                </Descriptions.Item>
                <Descriptions.Item label="Education Subjects" span={2}>
                  {tuition.student_education.subjects.map((s) => (
                    <Tag color="blue" key={s}>
                      {s}
                    </Tag>
                  ))}
                </Descriptions.Item>
              </Descriptions>

              <Descriptions
                labelStyle={{ width: 180 }}
                column={{ xs: 1, md: 1, lg: 2, xl: 2, xxl: 2, xxxl: 2 }}
                bordered
                size="small"
              >
                <Descriptions.Item label="Student Gender">
                  {tuition.student_gender}
                </Descriptions.Item>
                <Descriptions.Item label="Number Of Student">
                  {tuition.number_of_students}
                </Descriptions.Item>
                <Descriptions.Item label="Tutoring Type">
                  {tuition.tutoring_type}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {/* Location & Schedule */}
            <Card
              title={
                <>
                  <EnvironmentOutlined /> Location & Schedule
                </>
              }
              variant="borderless"
            >
              <Descriptions
                labelStyle={{ width: 160 }}
                column={{ xs: 1, md: 1, lg: 2, xl: 2, xxl: 2, xxxl: 2 }}
                bordered
                size="small"
              >
                <Descriptions.Item label="City">
                  {tuition.location.city}
                </Descriptions.Item>
                <Descriptions.Item label="Area">
                  {tuition.location.area}
                </Descriptions.Item>
                <Descriptions.Item label="Full Address" span={2}>
                  {tuition.location.full_address}
                </Descriptions.Item>
                <Descriptions.Item label="Days/Week">
                  {tuition.days_per_week}
                </Descriptions.Item>
                <Descriptions.Item label="Preferred Time">
                  {tuition.preferred_time}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {/* Teacher preference */}
            <Card
              title={
                <>
                  <EnvironmentOutlined /> Teacher Preference
                </>
              }
              variant="borderless"
            >
              <Descriptions
                labelStyle={{ width: 160 }}
                column={{ xs: 1, md: 1, lg: 2, xl: 2, xxl: 2, xxxl: 2 }}
                bordered
                size="small"
              >
                <Descriptions.Item label="Tutor Gender">
                  {tuition.tutor_gender}
                </Descriptions.Item>
                <Descriptions.Item label="Tutor Qualifications">
                  {tuition.tutor_qualification.join(", ")}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {/* Special Requirements */}
            {tuition.special_requirements && (
              <Alert
                message="Special Requirements"
                description={tuition.special_requirements}
                type="info"
                showIcon
              />
            )}
          </Space>
        </Col>

        {/* Sidebar Column */}
        <Col xs={24} lg={8}>
          <Card
            title="Summary"
            variant="borderless"
            className="sticky! top-20 shadow-sm"
          >
            <Space orientation="vertical" className="w-full" size="middle">
              <div>
                <Text type="secondary">
                  <DollarOutlined /> Salary
                  {tuition.salary.negotiable && (
                    <Tag color="green">Negotiable</Tag>
                  )}
                </Text>

                <div className="mt-2 text-lg font-bold">{renderSalary()}</div>
              </div>

              <Divider />

              <Descriptions column={1} size="small">
                <Descriptions.Item label="Students">
                  {tuition.number_of_students}
                </Descriptions.Item>
                <Descriptions.Item label="Tutoring Type">
                  {tuition.tutoring_type}
                </Descriptions.Item>
                <Descriptions.Item label="Created">
                  {new Date(tuition.createdAt).toLocaleDateString()}
                </Descriptions.Item>
              </Descriptions>

              <Button type="primary" size="large" block>
                Apply Now
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </PageShell>
  );
};

export default TuitionDetails;
