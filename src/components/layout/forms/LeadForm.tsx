import { useCallback } from "react";
import { Button, Form, Input, Modal, Typography } from "antd";
import { FiArrowRight } from "react-icons/fi";
import { useCreateLeadMutation } from "@/redux/features/lead/leadApi";
import { getApiErrorMessage } from "@/utils/api-error.utils";
import { stripPhoneFormatting } from "@/utils/phone.utils";
import {
  bangladeshiPhoneRule,
  requiredRule,
} from "@/validations/form.validation";

const { Text } = Typography;
const { TextArea } = Input;

type LeadFormValues = {
  name: string;
  contact: string;
  details?: string;
};

type CreateLeadResponse = {
  message?: string;
};

export default function LeadForm() {
  const [leadForm] = Form.useForm<LeadFormValues>();
  const [createLead, { isLoading: isCreatingLead }] = useCreateLeadMutation();

  const handleLeadSubmit = useCallback(
    async (formValues: LeadFormValues) => {
      try {
        const response = (await createLead({
          ...formValues,
          contact: stripPhoneFormatting(formValues.contact),
        }).unwrap()) as CreateLeadResponse;

        Modal.success({
          title: "Success",
          content: response?.message || "Success",
          centered: true,
          okText: "OK",
        });

        leadForm.resetFields();
      } catch (error) {
        Modal.error({
          title: "Oops!..",
          content: getApiErrorMessage(error, "Something went wrong"),
          centered: true,
          okText: "Close",
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
        rules={requiredRule("Please enter your name.")}
      >
        <Input
          size="large"
          placeholder="Enter your name"
          autoComplete="name"
          className="border-border! bg-surface-elevated! text-text-strong! shadow-theme-xs! placeholder:text-text-soft! hover:border-brand-300! focus:border-brand-300! focus:shadow-focus-ring! min-h-14! rounded-xl!"
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
          ...requiredRule("Please enter your phone number."),
          bangladeshiPhoneRule("Enter a valid Bangladeshi mobile number."),
        ]}
      >
        <Input
          size="large"
          placeholder="01 or +8801"
          inputMode="tel"
          autoComplete="tel"
          className="border-border! bg-surface-elevated! text-text-strong! shadow-theme-xs! placeholder:text-text-soft! hover:border-brand-300! focus:border-brand-300! focus:shadow-focus-ring! min-h-14! rounded-xl!"
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
          className="border-border! bg-surface-elevated! text-text-strong! shadow-theme-xs! placeholder:text-text-soft! hover:border-brand-300! focus:border-brand-300! focus:shadow-focus-ring! rounded-xl!"
        />
      </Form.Item>

      <Button
        block
        type="primary"
        size="large"
        htmlType="submit"
        loading={isCreatingLead}
        className="bg-brand-600! text-text-on-brand! shadow-theme-md! hover:bg-brand-700! hover:shadow-theme-lg! mt-1! min-h-14! rounded-xl! text-base! font-semibold!"
      >
        Book Demo Class
        <FiArrowRight size={20} className="ml-2" />
      </Button>
    </Form>
  );
}
