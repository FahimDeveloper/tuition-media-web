import { useState } from "react";
import { Avatar, Progress, Typography, Upload, message } from "antd";
import type { UploadProps } from "antd";
import {
  CameraOutlined,
  LoadingOutlined,
  UserOutlined,
} from "@ant-design/icons";

import type { ProfileMetaValues } from "./profileModel";
import imageUpload from "@/utils/imageUpload";

const { Title, Text, Paragraph } = Typography;

const ALLOWED_AVATAR_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_AVATAR_SIZE_MB = 2;
const MAX_AVATAR_SIZE_BYTES = MAX_AVATAR_SIZE_MB * 1024 * 1024;
const SAFE_IMAGE_URL_PATTERN = /^(https?:\/\/|\/(?!\/))/i;

type TeacherMetaCardProps = {
  values: ProfileMetaValues;
  isFetching?: boolean;
  onAvatarChange?: (avatarUrl: string) => void;
};

const validateAvatarFile = (file: File): string | null => {
  if (!ALLOWED_AVATAR_TYPES.has(file.type)) {
    return "Please upload a JPG, PNG, or WebP image.";
  }

  if (file.size > MAX_AVATAR_SIZE_BYTES) {
    return `Image must be smaller than ${MAX_AVATAR_SIZE_MB}MB.`;
  }

  return null;
};

const isSafeImageUrl = (url: unknown): url is string =>
  typeof url === "string" && SAFE_IMAGE_URL_PATTERN.test(url);

export default function TeacherMetaCard({
  values,
  isFetching = false,
  onAvatarChange,
}: TeacherMetaCardProps) {
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);

  const uploadProps: UploadProps = {
    showUploadList: false,
    maxCount: 1,
    accept: "image/png,image/jpeg,image/webp",
    disabled: isAvatarUploading,

    beforeUpload: async (file) => {
      const errorMessage = validateAvatarFile(file);

      if (errorMessage) {
        message.error(errorMessage);
        return Upload.LIST_IGNORE;
      }

      const key = "avatar-upload";

      try {
        setIsAvatarUploading(true);
        message.loading({
          content: "Uploading image...",
          key,
        });

        const uploadedImageUrl = await imageUpload(file);

        if (!isSafeImageUrl(uploadedImageUrl)) {
          throw new Error("Unsafe image URL returned from upload service.");
        }

        onAvatarChange?.(uploadedImageUrl);

        message.success({
          content: "Profile image uploaded.",
          key,
        });
      } catch {
        message.error({
          content: "Image upload failed. Please try again.",

          key,
        });
      } finally {
        setIsAvatarUploading(false);
      }

      // Prevent Ant Design from auto-uploading.
      return false;
    },
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/3">
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
              {isAvatarUploading ? (
                <LoadingOutlined className="text-xl text-white" />
              ) : (
                <CameraOutlined className="text-xl text-white" />
              )}
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
