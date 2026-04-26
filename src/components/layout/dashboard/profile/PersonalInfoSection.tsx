import {useEffect, useState} from 'react';
import {Form} from 'antd';
import {Modal} from '@/components/ui/modal';
import {useModal} from '@/hooks/useModal';

import PersonalInfoForm from './shared/PersonalInfoForm';
import ProfileEditButton from './shared/ProfileEditButton';
import ProfileInfoItem from './shared/ProfileInfoItem';
import ProfileModalContent from './shared/ProfileModalContent';
import ProfileSectionCard, {ProfileInfoGrid} from './shared/ProfileSectionCard';
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
  const {isOpen, openModal, closeModal} = useModal();
  const [form] = Form.useForm<PersonalInfoFormValues>();

  // Replace this temporary local state with Redux/API state later.
  const [profileValues, setProfileValues] = useState<PersonalInfoValues>(
    INITIAL_PERSONAL_INFO_VALUES,
  );
  const [isPermanentSame, setIsPermanentSame] = useState(false);
  const presentAddress = Form.useWatch('presentAddress', form);

  useEffect(() => {
    if (!isOpen) return;

    form.setFieldsValue(toPersonalInfoFormValues(profileValues));
  }, [form, isOpen, profileValues]);

  useEffect(() => {
    if (!isPermanentSame) return;

    form.setFieldValue('permanentAddress', presentAddress || '');
  }, [form, isPermanentSame, presentAddress]);

  const handleClose = () => {
    setIsPermanentSame(false);
    closeModal();
  };

  const handleEdit = () => {
    setIsPermanentSame(false);
    openModal();
  };

  const handlePermanentAddressSync = (checked: boolean) => {
    setIsPermanentSame(checked);

    if (checked) {
      form.setFieldValue(
        'permanentAddress',
        form.getFieldValue('presentAddress') || '',
      );
    }
  };

  const handleSave = (values: PersonalInfoFormValues) => {
    // Replace this local save with API mutation/store update later.
    setProfileValues(fromPersonalInfoFormValues(values));
    setIsPermanentSame(false);
    closeModal();
  };

  return (
    <>
      <ProfileSectionCard
        title="Personal Information"
        action={<ProfileEditButton onClick={handleEdit} />}
      >
        <ProfileInfoGrid>
          {PERSONAL_INFO_ITEMS.map(({key, label}) => (
            <ProfileInfoItem
              key={key}
              label={label}
              value={formatPersonalInfoValue(key, profileValues[key])}
            />
          ))}
        </ProfileInfoGrid>
      </ProfileSectionCard>

      <Modal isOpen={isOpen} onClose={handleClose} className="max-w-175 m-4">
        <ProfileModalContent>
          <PersonalInfoForm
            form={form}
            values={profileValues}
            isPermanentSame={isPermanentSame}
            onPermanentSameChange={handlePermanentAddressSync}
            onCancel={handleClose}
            onSubmit={handleSave}
          />
        </ProfileModalContent>
      </Modal>
    </>
  );
}
