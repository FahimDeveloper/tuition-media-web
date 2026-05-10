import { Link } from "react-router-dom";
import { Avatar, Button, Card, Space, Typography } from "antd";
import { FaRegCalendar } from "react-icons/fa6";

import { useAppSelector } from "@/hooks/useAppHooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  getUserAvatar,
  getUserDisplayName,
  getUserInitials,
} from "@/utils/userDisplay";

const { Text, Paragraph } = Typography;

const FALLBACKS = {
  name: "Account",
  bio: "Add a short bio to help guardians and students understand your teaching background.",
  memberSince: "Member since recently",
};

type ProfileSummaryStoreUser = NonNullable<
  ReturnType<typeof selectCurrentUser>
> & {
  bio?: string | null;
  avatar?: string | null;
  image?: string | null;
  profileImage?: string | null;
  profile_image?: string | null;
  createdAt?: string | null;
};

const getText = (value?: string | null) => value?.trim() || null;

const getMemberSince = (createdAt?: string | null) => {
  const value = getText(createdAt);

  if (!value) return FALLBACKS.memberSince;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return FALLBACKS.memberSince;
  }

  return `Member since ${date.getFullYear()}`;
};

const ProfileSummary = () => {
  const currentUser = useAppSelector(
    selectCurrentUser,
  ) as ProfileSummaryStoreUser | null;

  const displayName = getUserDisplayName(currentUser, FALLBACKS.name);
  const initials = getUserInitials(currentUser);
  const avatarUrl = getUserAvatar(currentUser);
  const bio = getText(currentUser?.bio) || FALLBACKS.bio;
  const memberSince = getMemberSince(currentUser?.createdAt);

  return (
    <Card className="w-full rounded-2xl border border-gray-200 shadow-sm">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <Space size={12} align="center">
            <Avatar
              size={56}
              src={avatarUrl || undefined}
              className="bg-blue-600 font-semibold"
            >
              {!avatarUrl && initials}
            </Avatar>

            <div className="min-w-0">
              <div className="flex flex-col gap-1">
                <Text strong className="!text-base !text-gray-900">
                  {displayName}
                </Text>

                <Space size={6} className="text-gray-500">
                  <FaRegCalendar className="text-xs" />
                  <Text className="!text-sm !text-gray-500">{memberSince}</Text>
                </Space>
              </div>
            </div>
          </Space>
        </div>

        <Paragraph className="!mb-0 !text-sm !leading-6 !text-gray-600">
          {bio}
        </Paragraph>

        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <Space size={6} className="text-gray-500">
            <FaRegCalendar className="text-xs" />
            <Text className="!text-sm !text-gray-500">{memberSince}</Text>
          </Space>

          <Text className="!text-gray-300">•</Text>

          <Link to="/tutor/profile">
            <Button type="primary" className="!rounded-lg">
              Visit Profile
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default ProfileSummary;
