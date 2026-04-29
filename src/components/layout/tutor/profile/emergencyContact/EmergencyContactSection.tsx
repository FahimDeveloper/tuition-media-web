import {useState} from 'react';
import {Form, Input} from 'antd';

import ProfileEditButton from '../shared/ProfileEditButton';
import ProfileEditableFormModal from '../shared/ProfileEditableFormModal';
import {ProfileFormGrid, ProfileFormSection} from '../shared/ProfileFormLayout';
import ProfileInfoList from '../shared/ProfileInfoList';
import ProfileSectionCard, {
  ProfileInfoGrid,
} from '../shared/ProfileSectionCard';
import useEditableProfileForm from '../shared/useEditableProfileForm';
import {requiredRule} from '../profileUtils';
import {
  EMERGENCY_CONTACT_ITEMS,
  INITIAL_EMERGENCY_CONTACT_VALUES,
  formatEmergencyContactValue,
  type EmergencyContactValues,
} from './EmergencyContactTypes';

export default function EmergencyContactSection() {
  const [emergencyContactValues, setEmergencyContactValues] =
    useState<EmergencyContactValues>(INITIAL_EMERGENCY_CONTACT_VALUES);

  const editableForm = useEditableProfileForm<EmergencyContactValues>({
    values: emergencyContactValues,
    onSave: setEmergencyContactValues, // call rtk query here.
  });

  return (
    <>
      <ProfileSectionCard
        title="Emergency Contact"
        action={<ProfileEditButton onClick={editableForm.openModal} />}
      >
        <ProfileInfoGrid>
          <ProfileInfoList
            items={EMERGENCY_CONTACT_ITEMS}
            values={emergencyContactValues}
            formatValue={formatEmergencyContactValue}
          />
        </ProfileInfoGrid>
      </ProfileSectionCard>

      <ProfileEditableFormModal
        isOpen={editableForm.isOpen}
        onClose={editableForm.closeModal}
        title="Edit Emergency Contact"
        description="Update your father, mother, and emergency contact information."
        form={editableForm.form}
        initialValues={editableForm.formValues}
        formClassName="[&_.ant-form-item]:mb-2"
        onSubmit={editableForm.handleSubmit}
      >
        <ProfileFormSection title="Emergency Contact">
          <ProfileFormGrid className="gap-x-6 gap-y-7">
            <Form.Item
              label="Father Name"
              name="fatherName"
              validateTrigger="onBlur"
              rules={requiredRule('Please enter father name')}
            >
              <Input size="large" placeholder="Enter father name" />
            </Form.Item>

            <Form.Item
              label="Father Phone Number"
              name="fatherPhoneNumber"
              validateTrigger="onBlur"
              rules={requiredRule('Please enter father phone number')}
            >
              <Input size="large" placeholder="Enter father phone number" />
            </Form.Item>

            <Form.Item
              label="Mother Name"
              name="motherName"
              validateTrigger="onBlur"
              rules={requiredRule('Please enter mother name')}
            >
              <Input size="large" placeholder="Enter mother name" />
            </Form.Item>

            <Form.Item
              label="Mother Phone Number"
              name="motherPhoneNumber"
              validateTrigger="onBlur"
              rules={requiredRule('Please enter mother phone number')}
            >
              <Input size="large" placeholder="Enter mother phone number" />
            </Form.Item>

            <Form.Item
              label="Emergency Contact Name"
              name="emergencyContactName"
              validateTrigger="onBlur"
              rules={requiredRule('Please enter emergency contact name')}
            >
              <Input size="large" placeholder="Enter emergency contact name" />
            </Form.Item>

            <Form.Item
              label="Emergency Contact Number"
              name="emergencyContactNumber"
              validateTrigger="onBlur"
              rules={requiredRule('Please enter emergency contact number')}
            >
              <Input
                size="large"
                placeholder="Enter emergency contact number"
              />
            </Form.Item>
          </ProfileFormGrid>
        </ProfileFormSection>
      </ProfileEditableFormModal>
    </>
  );
}
