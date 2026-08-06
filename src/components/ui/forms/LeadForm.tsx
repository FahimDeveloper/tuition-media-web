import { useEffect } from "react";
import { Button, Form, Input, Typography } from "antd";
import { FiArrowRight } from "react-icons/fi";
import Swal from "sweetalert2";

import { useCreateLeadMutation } from "@/redux/features/lead/leadApi";
import {
  bangladeshiPhoneRule,
  requiredRule,
} from "@/validations/form.validation";
import type { TLead } from "@/types/lead.types";

const { Text } = Typography;
const { TextArea } = Input;

const inputStyles =
  "border-border! bg-surface-elevated! text-text-strong! shadow-theme-xs! placeholder:text-text-soft! hover:border-brand-300! focus:border-brand-300! focus:shadow-focus-ring! min-h-14! rounded-xl!";

export default function LeadForm() {
  const [leadForm] = Form.useForm<Partial<TLead>>();

  const [createLead, { isLoading, isSuccess, isError, error, reset }] =
    useCreateLeadMutation();

  /**
   * Effect to handle Success state
   */
  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        icon: "success",
        title: "Successfully Sent!",
        text: "We have received your request and will get back to you shortly.",
        confirmButtonColor: "#4f46e5",
      });
      leadForm.resetFields();
      reset();
    }
  }, [isSuccess, leadForm, reset]);

  /**
   * Effect to handle Error state
   */
  useEffect(() => {
    if (isError) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text:
          (error as any)?.data?.message ||
          "Something went wrong. Please try again.",
      });
      reset();
    }
  }, [isError, error, reset]);

  const handleLeadSubmit = (values: Partial<TLead>) => {
    const newValues: Partial<TLead> = { lead_source: "website", ...values };
    createLead(newValues);
  };

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
          className={inputStyles}
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
          className={inputStyles}
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
          className={inputStyles}
        />
      </Form.Item>

      <Button
        block
        type="primary"
        size="large"
        htmlType="submit"
        loading={isLoading}
        className="bg-brand-600! text-text-on-brand! shadow-theme-md! hover:bg-brand-700! hover:shadow-theme-lg! mt-1! min-h-14! rounded-xl! text-base! font-semibold!"
      >
        Book Demo Class
        <FiArrowRight size={20} className="ml-2" />
      </Button>
    </Form>
  );
}
