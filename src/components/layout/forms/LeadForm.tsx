import {useCallback} from 'react';
import {Button, Form, Input, Modal, Typography} from 'antd';
import {FiArrowRight} from 'react-icons/fi';
import {useCreateLeadMutation} from '@/redux/features/lead/leadApi';

const {Text} = Typography;
const {TextArea} = Input;

const BANGLADESHI_MOBILE_PATTERN = /^(?:\+8801\d{9}|01\d{9})$/;

type LeadFormValues = {
  name: string;
  contact: string;
  details?: string;
};

type CreateLeadResponse = {
  message?: string;
};

type ApiError = {
  data?: {
    message?: string;
  };
};

const normalizePhoneNumber = (phoneNumber = '') =>
  phoneNumber.replace(/[() -]/g, '').trim();

const isBangladeshiMobileNumber = (phoneNumber = '') =>
  BANGLADESHI_MOBILE_PATTERN.test(normalizePhoneNumber(phoneNumber));

const getApiErrorMessage = (error: unknown) =>
  (error as ApiError)?.data?.message || 'Something went wrong';

const validateBangladeshiMobileNumber = (_: unknown, value?: string) => {
  if (!value || isBangladeshiMobileNumber(value)) {
    return Promise.resolve();
  }

  return Promise.reject(new Error('Enter a valid Bangladeshi mobile number.'));
};

export default function LeadForm() {
  const [leadForm] = Form.useForm<LeadFormValues>();
  const [createLead, {isLoading: isCreatingLead}] = useCreateLeadMutation();

  const handleLeadSubmit = useCallback(
    async (formValues: LeadFormValues) => {
      try {
        const response = (await createLead({
          ...formValues,
          contact: normalizePhoneNumber(formValues.contact),
        }).unwrap()) as CreateLeadResponse;

        Modal.success({
          title: 'Success',
          content: response?.message || 'Success',
          centered: true,
          okText: 'OK',
        });

        leadForm.resetFields();
      } catch (error) {
        Modal.error({
          title: 'Oops!..',
          content: getApiErrorMessage(error),
          centered: true,
          okText: 'Close',
        });
      }
    },
    [createLead, leadForm],
  );

  return (
    <Form
      form={leadForm}
      layout="vertical"
      requiredMark={false}
      onFinish={handleLeadSubmit}
      className="[&_.ant-form-item-extra]:text-text-soft! [&_.ant-form-item-label>label]:text-text-strong!"
    >
      <Form.Item
        label={<Text className="text-text-strong!">Name</Text>}
        name="name"
        rules={[{required: true, message: 'Please enter your name.'}]}
      >
        <Input
          size="large"
          placeholder="Enter your name"
          autoComplete="name"
          className="min-h-14! rounded-xl! border-border! bg-surface-elevated! text-text-strong! shadow-theme-xs! placeholder:text-text-soft! hover:border-brand-300! focus:border-brand-300! focus:shadow-focus-ring!"
        />
      </Form.Item>

      <Form.Item
        label={
          <Text strong className="text-text-strong!">
            Phone number
          </Text>
        }
        name="contact"
        rules={[
          {required: true, message: 'Please enter your phone number.'},
          {validator: validateBangladeshiMobileNumber},
        ]}
      >
        <Input
          size="large"
          placeholder="01 or +8801"
          inputMode="tel"
          autoComplete="tel"
          className="min-h-14! rounded-xl! border-border! bg-surface-elevated! text-text-strong! shadow-theme-xs! placeholder:text-text-soft! hover:border-brand-300! focus:border-brand-300! focus:shadow-focus-ring!"
        />
      </Form.Item>

      <Form.Item
        label={
          <Text strong className="text-text-strong!">
            Tell us about your requirement
          </Text>
        }
        name="details"
      >
        <TextArea
          rows={3}
          placeholder="Write your message here..."
          className="rounded-xl! border-border! bg-surface-elevated! text-text-strong! shadow-theme-xs! placeholder:text-text-soft! hover:border-brand-300! focus:border-brand-300! focus:shadow-focus-ring!"
        />
      </Form.Item>

      <Button
        block
        type="primary"
        size="large"
        htmlType="submit"
        loading={isCreatingLead}
        className="mt-1! min-h-14! rounded-xl! bg-brand-600! text-base! font-semibold! text-text-on-brand! shadow-theme-md! hover:bg-brand-700! hover:shadow-theme-lg!"
      >
        Book Demo Class
        <FiArrowRight size={20} className="ml-2" />
      </Button>
    </Form>
  );
}
