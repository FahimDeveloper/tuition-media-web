import { Link } from "react-router-dom";
import { Card, Avatar, Typography, Tag, Tooltip, Button, Space } from "antd";
import { FiCheckCircle, FiMapPin, FiDollarSign } from "react-icons/fi";
import type { TPublicTeacher } from "@/types/teacher.types";
import { getPublicTeacherInitials } from "@/utils/public-teacher.utils";

const { Text } = Typography;

type TutorCardProps = {
  teacher: TPublicTeacher;
};

const TutorCard = ({ teacher }: TutorCardProps) => {
  const truncateText = (text: string, length: number) => {
    if (!text) return "";
    return text.length > length ? `${text.substring(0, length)}...` : text;
  };

  // Extracting key info
  const subjects = teacher.preferred_tutoring?.subjects || [];
  const salary = teacher.preferred_tutoring?.salary_range;
  const location = teacher.preferred_teaching_locations?.city || "Various";

  return (
    <Card
      className="rounded-xl border-gray-100 shadow-sm"
      bodyStyle={{
        padding: "16px",
      }}
      actions={[
        <Link to={`/hub/${teacher._id}`} key="view">
          <Button type="primary" block className="w-11/12!">
            View Profile
          </Button>
        </Link>,
      ]}
    >
      {/* 1. Header: Avatar & Identity */}
      <Card.Meta
        avatar={
          <Avatar size={50} src={teacher.profile_picture}>
            {getPublicTeacherInitials(teacher.full_name)}
          </Avatar>
        }
        title={
          <div className="flex items-center gap-2">
            {teacher.full_name}
            {teacher.is_verified && (
              <Tooltip title="Verified Teacher">
                <FiCheckCircle className="text-blue-500!" size={14} />
              </Tooltip>
            )}
          </div>
        }
        description={
          <Text type="secondary" className="text-xs">
            {teacher.years_of_experience || 0} Years Experience
          </Text>
        }
      />

      {/* 2. Content: Subjects (Tag Cloud) */}
      <div className="mt-4 flex-1">
        <Space orientation="vertical" size="middle" className="w-full">
          {teacher?.education?.graduation?.type && (
            <div className="flex flex-wrap gap-1">
              <Tag color={"success"}>
                {teacher?.education?.graduation?.type} University
              </Tag>
            </div>
          )}
          <div className="flex flex-wrap gap-1">
            {subjects.slice(0, 4).map((sub) => (
              <Tag key={sub} color="primary" className="m-0 rounded-full px-2">
                {sub}
              </Tag>
            ))}
            {subjects.length > 4 && <Tag>+{subjects.length - 4}</Tag>}
          </div>
          <div className="flex flex-wrap gap-1">
            <Text> {truncateText(teacher?.about_me as string, 350)}</Text>
          </div>
        </Space>
      </div>

      {/* 3. Footer Stats: Salary & Location */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-3 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <FiDollarSign size={14} />
          {salary?.min ? `${salary.min}-${salary.max} BDT` : "Negotiable"}
        </div>
        <div className="flex items-center gap-1">
          <FiMapPin size={14} />
          {location}
        </div>
      </div>
    </Card>
  );
};

export default TutorCard;
