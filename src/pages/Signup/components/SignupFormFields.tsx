import {Form, Input, Select, Row, Col, type FormInstance} from 'antd';
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  LockOutlined,
} from '@ant-design/icons';
import {TEXT, STYLES, GENDER_OPTIONS} from '../signup.constants';
// Note: Ensure this data file exists in your project structure
import {
  SIGNUP_CITY_OPTIONS,
  getLocationOptionsForCity,
} from '@/components/ui/form/signupLocationData';

interface Props {
  form: FormInstance;
  isLoading: boolean;
  capsLock: boolean;
  onKey: (e: React.KeyboardEvent) => void;
}

export const SignupFormFields = ({form, isLoading, capsLock, onKey}: Props) => {
  const watchedCity = Form.useWatch('city', form);

  return (
    <Row gutter={[20, 20]}>
      <Col xs={24} md={12}>
        <Form.Item
          name="first_name"
          label={TEXT.firstNameLabel}
          rules={[{required: true, message: TEXT.fullNameRequired}]}
        >
          <Input
            prefix={<UserOutlined className="text-brand-500" />}
            placeholder={TEXT.firstNamePlaceholder}
            className={STYLES.input}
            disabled={isLoading}
          />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          name="last_name"
          label={TEXT.lastNameLabel}
          rules={[{required: true, message: TEXT.fullNameRequired}]}
        >
          <Input
            prefix={<UserOutlined className="text-brand-500" />}
            placeholder={TEXT.lastNamePlaceholder}
            className={STYLES.input}
            disabled={isLoading}
          />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          name="phone"
          label={TEXT.phoneLabel}
          extra={TEXT.phoneHint}
          rules={[
            {required: true},
            {pattern: /^(?:\+8801\d{9}|01\d{9})$/, message: TEXT.phoneInvalid},
          ]}
        >
          <Input
            prefix={<PhoneOutlined className="text-brand-500" />}
            placeholder={TEXT.phonePlaceholder}
            className={STYLES.input}
            disabled={isLoading}
          />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          name="email"
          label={TEXT.emailLabel}
          rules={[{required: true}, {type: 'email'}]}
        >
          <Input
            prefix={<MailOutlined className="text-brand-500" />}
            placeholder={TEXT.emailPlaceholder}
            className={STYLES.input}
            disabled={isLoading}
          />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          name="gender"
          label={TEXT.genderLabel}
          rules={[{required: true}]}
        >
          <Select
            options={GENDER_OPTIONS}
            placeholder={TEXT.genderPlaceholder}
            className={STYLES.select}
            disabled={isLoading}
          />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          name="city"
          label={TEXT.cityLabel}
          rules={[{required: true}]}
        >
          <Select
            options={SIGNUP_CITY_OPTIONS}
            placeholder={TEXT.cityPlaceholder}
            className={STYLES.select}
            disabled={isLoading}
            onChange={() => form.setFieldValue('location', undefined)}
          />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          name="location"
          label={TEXT.locationLabel}
          rules={[{required: true}]}
        >
          <Select
            options={getLocationOptionsForCity(watchedCity)}
            placeholder={
              watchedCity
                ? TEXT.locationPlaceholder
                : TEXT.locationDisabledPlaceholder
            }
            className={STYLES.select}
            disabled={isLoading || !watchedCity}
          />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          name="password"
          label={TEXT.passwordLabel}
          extra={capsLock ? TEXT.capsLockWarning : TEXT.passwordHint}
          rules={[{required: true}, {min: 8}]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-brand-500" />}
            onKeyUp={onKey}
            className={STYLES.input}
            disabled={isLoading}
          />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          name="confirmPassword"
          label={TEXT.confirmPasswordLabel}
          dependencies={['password']}
          rules={[
            {required: true},
            ({getFieldValue}) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value)
                  return Promise.resolve();
                return Promise.reject(new Error(TEXT.confirmPasswordMismatch));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-brand-500" />}
            className={STYLES.input}
            disabled={isLoading}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};
