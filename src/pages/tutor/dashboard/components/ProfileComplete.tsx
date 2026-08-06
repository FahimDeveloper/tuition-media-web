import { Card, Typography, Progress, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;

type ProfileCompleteProps = {
  progress?: number;
  name?: string;
  loading?: boolean;
};

export default function ProfileComplete({
  progress = 100,
  name = "your",
  loading = false,
}: ProfileCompleteProps) {
  const safeProgress = Math.min(Math.max(progress, 0), 100);
  const isComplete = safeProgress === 100;

  const description =
    name === "your"
      ? "Complete your profile to unlock a more personalized experience."
      : `${name}, complete your profile to unlock a more personalized experience.`;

  return (
    <Card
      variant="outlined"
      className="rounded-3xl border border-slate-200 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      loading={loading}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-3">
          {/* <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <UserOutlined />
          </div> */}

          <div className="min-w-0 flex-1">
            <Title level={4} className="mb-1! text-slate-900! dark:text-white!">
              Profile Completion
            </Title>
            <Paragraph className="mb-0! text-sm! leading-6! text-slate-500! dark:text-slate-400!">
              {description}
            </Paragraph>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <Progress
            type="dashboard"
            percent={safeProgress}
            gapDegree={90}
            strokeWidth={10}
            size={220}
            format={(percent) => (
              <div className="flex flex-col items-center">
                <Text className="text-3xl! font-bold! text-slate-900! dark:text-white!">
                  {percent}%
                </Text>
                <Text className="text-xs! text-slate-400!">
                  {isComplete ? "Completed" : "Completed so far"}
                </Text>
              </div>
            )}
          />

          <Text className="mt-3 text-sm! text-slate-500! dark:text-slate-400!">
            {isComplete
              ? "Your profile is complete."
              : `${100 - safeProgress}% left to complete your profile.`}
          </Text>
        </div>

        <Link to="/tutor/profile">
          <Button
            type="primary"
            size="large"
            loading={loading}
            icon={<ArrowRightOutlined />}
            iconPlacement="end"
            className="h-11! w-full rounded-2xl! px-5! font-semibold!"
          >
            {isComplete ? "View Profile" : "Complete Profile"}
          </Button>
        </Link>
      </div>
    </Card>
  );
}
