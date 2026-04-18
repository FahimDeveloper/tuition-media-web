import React, {useMemo, useState} from 'react';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Drawer,
  Form,
  Grid,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import {
  FilterOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  BookOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import {FiSliders} from 'react-icons/fi';

const {Title, Text} = Typography;
const {useBreakpoint} = Grid;

type FilterFormValues = {
  postedDateFrom?: any;
  postedDateTo?: any;
  country?: string;
  city?: string;
  areaLocation?: string;
  category?: string;
  courseClass?: string;
  subject?: string;
};

const categoryOptions = [
  {label: 'School', value: 'school'},
  {label: 'College', value: 'college'},
  {label: 'University', value: 'university'},
  {label: 'Admission Test', value: 'admission-test'},
  {label: 'Language Learning', value: 'language-learning'},
  {label: 'Skill Development', value: 'skill-development'},
];

const subjectOptions = [
  {label: 'Mathematics', value: 'mathematics'},
  {label: 'English', value: 'english'},
  {label: 'Physics', value: 'physics'},
  {label: 'Chemistry', value: 'chemistry'},
  {label: 'Biology', value: 'biology'},
  {label: 'Bangla', value: 'bangla'},
  {label: 'ICT', value: 'ict'},
  {label: 'Accounting', value: 'accounting'},
  {label: 'Economics', value: 'economics'},
];

const countryOptions = [
  {label: 'Bangladesh', value: 'bangladesh'},
  {label: 'India', value: 'india'},
  {label: 'Pakistan', value: 'pakistan'},
  {label: 'Nepal', value: 'nepal'},
];

const FilterDrawer: React.FC = ({children}: {children: React.ReactNode}) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<FilterFormValues>();
  const screens = useBreakpoint();

  const drawerWidth = useMemo(() => {
    if (screens.xxl) return 520;
    if (screens.xl) return 480;
    if (screens.lg) return 440;
    if (screens.md) return 400;
    if (screens.sm) return '85vw';
    return '100vw';
  }, [screens]);

  const onClose = () => setOpen(false);

  const onFinish = (values: FilterFormValues) => {
    console.log('Applied filters:', values);
    setOpen(false);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Button
        icon={<FiSliders />}
        size="large"
        onClick={() => setOpen(true)}
        className="h-[44px] rounded-xl border border-gray-200 dark:border-white/10"
      >
        More Filters
      </Button>

      <Drawer
        open={open}
        onClose={onClose}
        placement="right"
        size={drawerWidth}
        destroyOnHidden
        title={null}
        styles={{
          body: {
            padding: 0,
            background: '#f5f7fb',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          },
        }}
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-slate-200 bg-white px-5 py-4 sm:px-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <FilterOutlined style={{fontSize: 18}} />
                </div>

                <Title level={4} style={{margin: 0}}>
                  Filter Tuition Jobs
                </Title>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-5">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
              requiredMark={false}
              size="large"
            >
              <Card
                bordered={false}
                className="mb-4 rounded-2xl shadow-sm"
                styles={{body: {padding: 20}}}
              >
                <div className="mb-4 flex items-center gap-2">
                  <CalendarOutlined className="text-slate-500" />
                  <Text strong className="text-base">
                    Posted Date
                  </Text>
                </div>

                <Row gutter={[14, 0]}>
                  <Col xs={24} sm={12}>
                    <Form.Item label="Posted Date From" name="postedDateFrom">
                      <DatePicker
                        className="w-full"
                        format="DD MMM YYYY"
                        placeholder="Select start date"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Form.Item label="Posted Date To" name="postedDateTo">
                      <DatePicker
                        className="w-full"
                        format="DD MMM YYYY"
                        placeholder="Select end date"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              <Card
                bordered={false}
                className="mb-4 rounded-2xl shadow-sm"
                styles={{body: {padding: 20}}}
              >
                <div className="mb-4 flex items-center gap-2">
                  <EnvironmentOutlined className="text-slate-500" />
                  <Text strong className="text-base">
                    Location
                  </Text>
                </div>

                <Row gutter={[14, 0]}>
                  <Col xs={24} sm={12}>
                    <Form.Item label="Country" name="country">
                      <Select
                        allowClear
                        showSearch
                        placeholder="Select country"
                        options={countryOptions}
                        optionFilterProp="label"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Form.Item label="City" name="city">
                      <Input placeholder="Enter city" />
                    </Form.Item>
                  </Col>

                  <Col xs={24}>
                    <Form.Item label="Area / Location" name="areaLocation">
                      <Input placeholder="Enter area or specific location" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              <Card
                bordered={false}
                className="rounded-2xl shadow-sm"
                styles={{body: {padding: 20}}}
              >
                <div className="mb-4 flex items-center gap-2">
                  <BookOutlined className="text-slate-500" />
                  <Text strong className="text-base">
                    Academic Details
                  </Text>
                </div>

                <Row gutter={[14, 0]}>
                  <Col xs={24} sm={12}>
                    <Form.Item label="Select Category" name="category">
                      <Select
                        allowClear
                        placeholder="Choose category"
                        options={categoryOptions}
                        optionFilterProp="label"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Form.Item label="Courses / Class" name="courseClass">
                      <Input placeholder="e.g. Class 8, HSC, IELTS" />
                    </Form.Item>
                  </Col>

                  <Col xs={24}>
                    <Form.Item label="Subject" name="subject">
                      <Select
                        allowClear
                        showSearch
                        placeholder="Select subject"
                        options={subjectOptions}
                        optionFilterProp="label"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              <Divider style={{margin: '20px 0 0'}} />
            </Form>
          </div>

          <div className="border-t border-slate-200 bg-white px-4 py-4 sm:px-5">
            <Space size="middle" wrap className="flex w-full justify-end">
              <Button icon={<ReloadOutlined />} size="large" onClick={onReset}>
                Reset
              </Button>

              <Button size="large" onClick={onClose}>
                Cancel
              </Button>

              <Button
                type="primary"
                size="large"
                icon={<FilterOutlined />}
                onClick={() => form.submit()}
              >
                Apply Filters
              </Button>
            </Space>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default FilterDrawer;
