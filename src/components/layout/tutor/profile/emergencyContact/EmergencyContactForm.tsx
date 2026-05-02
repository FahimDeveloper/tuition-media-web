import { Form, Input } from "antd";

import {
  ProfileFormGrid,
  ProfileFormSection,
} from "../shared/ProfileFormLayout";
import { requiredRule } from "../profileUtils";

export default function EmergencyContactForm() {
  return (
    <ProfileFormSection title="Emergency Contact">
      <ProfileFormGrid className="gap-x-6 gap-y-7">
        <Form.Item
          label="Father Name"
          name="fatherName"
          validateTrigger="onBlur"
          rules={requiredRule("Please enter father name")}
        >
          <Input size="large" placeholder="Enter father name" />
        </Form.Item>

        <Form.Item
          label="Father Phone Number"
          name="fatherPhoneNumber"
          validateTrigger="onBlur"
          rules={requiredRule("Please enter father phone number")}
        >
          <Input size="large" placeholder="Enter father phone number" />
        </Form.Item>

        <Form.Item
          label="Mother Name"
          name="motherName"
          validateTrigger="onBlur"
          rules={requiredRule("Please enter mother name")}
        >
          <Input size="large" placeholder="Enter mother name" />
        </Form.Item>

        <Form.Item
          label="Mother Phone Number"
          name="motherPhoneNumber"
          validateTrigger="onBlur"
          rules={requiredRule("Please enter mother phone number")}
        >
          <Input size="large" placeholder="Enter mother phone number" />
        </Form.Item>

        <Form.Item
          label="Emergency Contact Name"
          name="emergencyContactName"
          validateTrigger="onBlur"
          rules={requiredRule("Please enter emergency contact name")}
        >
          <Input size="large" placeholder="Enter emergency contact name" />
        </Form.Item>

        <Form.Item
          label="Emergency Contact Number"
          name="emergencyContactNumber"
          validateTrigger="onBlur"
          rules={requiredRule("Please enter emergency contact number")}
        >
          <Input size="large" placeholder="Enter emergency contact number" />
        </Form.Item>
      </ProfileFormGrid>
    </ProfileFormSection>
  );
}
