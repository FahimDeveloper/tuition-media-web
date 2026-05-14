import { Avatar, Progress, Typography, Upload, message } from "antd";
import type { UploadProps } from "antd";
import { UserOutlined, CameraOutlined } from "@ant-design/icons";
import type { ProfileMetaValues } from "./profileModel";

const { Title, Text, Paragraph } = Typography;

type TeacherMetaCardProps = {
  values: ProfileMetaValues;
  isFetching?: boolean;
  onAvatarChange?: (avatarUrl: string) => void;
};

export default function TeacherMetaCard({
  values,
  isFetching = false,
  onAvatarChange,
}: TeacherMetaCardProps) {
  const uploadProps: UploadProps = {
    showUploadList: false,
    accept: "image/*",
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");

      if (!isImage) {
        message.error("Please upload an image file");
        return Upload.LIST_IGNORE;
      }

      const reader = new FileReader();

      reader.onload = () => {
        onAvatarChange?.(reader.result as string);
      };

      reader.readAsDataURL(file);

      // Prevent auto upload to server
      return false;
    },
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-col gap-5 sm:flex-row">
        <Upload {...uploadProps}>
          <div className="group relative w-fit cursor-pointer">
            <Avatar
              size={80}
              src={values.avatarUrl}
              icon={<UserOutlined />}
              className="shrink-0 border border-gray-200 dark:border-gray-800"
            />

            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <CameraOutlined className="text-xl text-white" />
            </div>
          </div>
        </Upload>

        <div className="min-w-0 flex-1">
          <Title
            level={4}
            className="mb-1! truncate text-lg! font-semibold! text-gray-800! dark:text-white/90!"
          >
            {values.displayName}
          </Title>

          <Text className="block truncate text-sm! text-gray-500! dark:text-gray-400!">
            {values.institution}
          </Text>

          <Paragraph
            ellipsis={{ rows: 3, expandable: true, symbol: "more" }}
            className="!mt-2 !mb-0 !text-sm !leading-6 !text-gray-500 dark:!text-gray-400"
          >
            {values.bio}
          </Paragraph>
        </div>

        <div className="w-full sm:w-56">
          <div className="mb-1 flex items-center justify-between">
            <Text className="!text-xs !text-gray-500 dark:!text-gray-400">
              Profile
            </Text>
            <Text className="!text-xs !font-medium !text-gray-700 dark:!text-gray-300">
              {isFetching ? "Refreshing" : `${values.completionPercentage}%`}
            </Text>
          </div>

          <Progress
            percent={values.completionPercentage}
            showInfo={false}
            strokeLinecap="round"
            strokeColor="#465FFF"
            railColor="rgba(156, 163, 175, 0.25)"
          />
        </div>
      </div>
    </div>
  );
}
