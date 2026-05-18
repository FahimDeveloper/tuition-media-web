import { Button, Form, Input } from "antd";

import {
  ProfileFormGrid,
  ProfileFormSection,
} from "../shared/ProfileFormLayout";
import { optionalUrlRules } from "../personal/personalInfoTypes";

export default function CertificationForm() {
  return (
    <ProfileFormSection title="Certifications">
      <Form.List name="certifications">
        {(fields, { add, remove }) => (
          <div className="space-y-4">
            {fields.map((field) => (
              <ProfileFormGrid key={field.key} className="gap-x-6 gap-y-4">
                <Form.Item
                  {...field}
                  label="Certification Type"
                  name={[field.name, "type"]}
                  className="col-span-2 lg:col-span-1"
                >
                  <Input size="large" placeholder="Example: IELTS, BCS" />
                </Form.Item>

                <Form.Item
                  {...field}
                  label="Certificate URL"
                  name={[field.name, "certificate_url"]}
                  className="col-span-2 lg:col-span-1"
                  rules={optionalUrlRules}
                >
                  <Input size="large" type="url" placeholder="https://..." />
                </Form.Item>

                <Button type="link" danger onClick={() => remove(field.name)}>
                  Remove certification
                </Button>
              </ProfileFormGrid>
            ))}

            <Button type="dashed" onClick={() => add()} block>
              Add certification
            </Button>
          </div>
        )}
      </Form.List>
    </ProfileFormSection>
  );
}
