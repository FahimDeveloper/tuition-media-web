import {Avatar, Progress, Typography} from 'antd';
import {UserOutlined, CheckCircleFilled} from '@ant-design/icons';

const {Title, Text, Paragraph} = Typography;

export default function TeacherMetaCard() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <div className="flex flex-col gap-5 sm:flex-row">
        <Avatar
          size={80}
          src="/images/user/teacher.jpg"
          icon={<UserOutlined />}
          className="shrink-0 border border-gray-200 dark:border-gray-800"
        />

        <div className="min-w-0 flex-1">
          <Title
            level={4}
            className="!mb-1 truncate !text-lg !font-semibold !text-gray-800 dark:!text-white/90"
          >
            Dr. Musharof Chowdhury
          </Title>

          <Text className="block truncate !text-sm !text-gray-500 dark:!text-gray-400">
            Arizona State University
          </Text>

          <Paragraph
            ellipsis={{rows: 3, expandable: true, symbol: 'more'}}
            className="!mb-0 !mt-2 !text-sm !leading-6 !text-gray-500 dark:!text-gray-400"
          >
            Passionate educator focused on programming, problem solving, and
            software engineering.
          </Paragraph>
        </div>

        <div className="w-full sm:w-56">
          <div className="mb-1 flex items-center justify-between">
            <Text className="!text-xs !text-gray-500 dark:!text-gray-400">
              Profile
            </Text>
            <Text className="!text-xs !font-medium !text-gray-700 dark:!text-gray-300">
              78%
            </Text>
          </div>

          <Progress
            percent={78}
            showInfo={false}
            strokeLinecap="round"
            strokeColor="#465FFF"
            trailColor="rgba(156, 163, 175, 0.25)"
          />

          <ul className="mt-3 space-y-2">
            {['Teaching experience', 'Certifications', 'Bio details'].map(
              (item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300"
                >
                  <CheckCircleFilled className="mt-0.5 text-[12px] text-blue-600" />
                  <span className="truncate">{item}</span>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
