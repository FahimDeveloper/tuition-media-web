import { Card, Tag, Typography, Flex, Button, Space, Divider } from "antd";
import {
  // FiBookOpen,
  FiClock,
  FiMapPin,
  // FiHash,
  // FiUserCheck,
} from "react-icons/fi";
import { TakaIcon } from "@/icons/TakaIcon";
// import { Link } from "react-router-dom";
import type { TTuitionJob } from "@/types/jobs.types";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const TuitionCard = ({ tuition }: { tuition: TTuitionJob }) => {
  const formatSalary = (salary: TTuitionJob["salary"]) => {
    if (salary.min && salary.max) return `${salary.min} - ${salary.max} BDT`;
    return "Negotiable";
  };

  return (
    <Card
      className="h-full overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-lg"
      bodyStyle={{ padding: "20px" }}
    >
      {/* Header */}
      <div className="mb-4">
        <Title level={4} className="line-clamp-2">
          {tuition.title}
        </Title>

        <Flex gap="small" wrap>
          <Tag color="blue">{tuition.status}</Tag>
          <Tag color="gray">ID: {tuition.serial_number}</Tag>
        </Flex>
      </div>

      {/* Location */}
      <Flex
        align="flex-start"
        gap="small"
        className="mb-5! rounded-lg bg-gray-50 p-3!"
      >
        <FiMapPin className="mt-1 text-blue-600" size={16} />
        <Text type="secondary" className="line-clamp-2">
          {tuition.location.full_address}
        </Text>
      </Flex>

      {/* Meta Data - Using Descriptions for structured layout */}
      <div className="mb-5">
        <Text
          strong
          type="secondary"
          className="mb-3 block text-[10px] tracking-wider uppercase"
        >
          Overview
        </Text>

        <div className="grid grid-cols-2 gap-y-4">
          <div className="space-y-2">
            <Text type="secondary" className="block text-xs">
              Category
            </Text>
            <Text strong>{tuition.student_education.category}</Text>
          </div>

          <div className="space-y-2">
            <Text type="secondary" className="block text-xs">
              Course
            </Text>
            <Text strong>{tuition.student_education.course}</Text>
          </div>

          <div className="space-y-2">
            <Text type="secondary" className="block text-xs">
              Salary
            </Text>
            <Flex align="center" gap={4}>
              <TakaIcon /> <Text strong>{formatSalary(tuition.salary)}</Text>
            </Flex>
          </div>
          <div className="space-y-2">
            <Text type="secondary" className="block text-xs">
              Tutor Gender
            </Text>
            <Text strong>{tuition.tutor_gender}</Text>
          </div>
        </div>
      </div>

      {/* Subjects */}
      <div className="mb-5">
        <Text
          strong
          type="secondary"
          className="mb-2 block text-[10px] tracking-wider uppercase"
        >
          Subjects
        </Text>
        <Flex wrap gap="small">
          {tuition.student_education.subjects.map((subject) => (
            <Tag key={subject} color="processing">
              {subject}
            </Tag>
          ))}
        </Flex>
      </div>

      {/* Footer */}
      <Divider className="my-0 mb-4" />
      <Flex justify="space-between" align="center">
        <Space>
          <FiClock className="text-gray-400" />
          <Text type="secondary" className="text-sm">
            {tuition.preferred_time}
          </Text>
        </Space>
        <Link to={`/tuitions/${tuition._id}`}>
          <Button type="primary">See details</Button>
        </Link>
      </Flex>
    </Card>
  );
};

export default TuitionCard;
