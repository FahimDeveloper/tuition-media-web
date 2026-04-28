import {useEffect, useState} from 'react';
import {Form} from 'antd';

import ProfileEditButton from '../shared/ProfileEditButton';
import ProfileEditableFormModal from '../shared/ProfileEditableFormModal';
import ProfileInfoList from '../shared/ProfileInfoList';
import ProfileSectionCard, {
  ProfileInfoGrid,
} from '../shared/ProfileSectionCard';
import useEditableProfileForm from '../shared/useEditableProfileForm';
import PersonalInfoForm from './PersonalInfoForm';
import {
  INITIAL_PERSONAL_INFO_VALUES,
  PERSONAL_INFO_ITEMS,
  formatPersonalInfoValue,
  fromPersonalInfoFormValues,
  toPersonalInfoFormValues,
  type PersonalInfoFormValues,
  type PersonalInfoValues,
} from './personalInfoTypes';

export default function PersonalInfoSection() {
  const [profileValues, setProfileValues] = useState<PersonalInfoValues>(
    INITIAL_PERSONAL_INFO_VALUES,
  );
  const [isPermanentAddressSame, setIsPermanentAddressSame] = useState(false);

  const resetPermanentAddress = () => setIsPermanentAddressSame(false);

  const editableForm = useEditableProfileForm<
    PersonalInfoValues,
    PersonalInfoFormValues
  >({
    values: profileValues,
    onSave: setProfileValues,
    toFormValues: toPersonalInfoFormValues,
    fromFormValues: fromPersonalInfoFormValues,
    onOpen: resetPermanentAddress,
    onClose: resetPermanentAddress,
    onAfterSave: resetPermanentAddress,
  });

  const presentAddress = Form.useWatch('presentAddress', editableForm.form);

  useEffect(() => {
    if (!isPermanentAddressSame) return;

    editableForm.form.setFieldValue('permanentAddress', presentAddress || '');
  }, [editableForm.form, isPermanentAddressSame, presentAddress]);

  const handlePermanentAddressSync = (checked: boolean) => {
    setIsPermanentAddressSame(checked);

    if (checked) {
      editableForm.form.setFieldValue(
        'permanentAddress',
        editableForm.form.getFieldValue('presentAddress') || '',
      );
    }
  };

  return (
    <>
      <ProfileSectionCard
        title="Personal Information"
        action={<ProfileEditButton onClick={editableForm.openModal} />}
      >
        <ProfileInfoGrid>
          <ProfileInfoList
            items={PERSONAL_INFO_ITEMS}
            values={profileValues}
            formatValue={formatPersonalInfoValue}
          />
        </ProfileInfoGrid>
      </ProfileSectionCard>

      <ProfileEditableFormModal
        isOpen={editableForm.isOpen}
        onClose={editableForm.closeModal}
        title="Edit Personal Information"
        description="Update your personal details and optional social profile links."
        form={editableForm.form}
        initialValues={editableForm.formValues}
        onSubmit={editableForm.handleSubmit}
      >
        <PersonalInfoForm
          isPermanentAddressSame={isPermanentAddressSame}
          onPermanentSameChange={handlePermanentAddressSync}
        />
      </ProfileEditableFormModal>
    </>
  );
}
