import type {ReactNode} from 'react';
import {Form} from 'antd';
import type {FormInstance} from 'antd/es/form';
import {Modal} from '@/components/ui/modal';

import ProfileModalContent, {
  ProfileModalActions,
  ProfileModalHeader,
} from './ProfileModalContent';
import {ProfileFormScrollArea} from './ProfileFormLayout';

type ProfileEditableFormModalProps<TFormValues extends object> = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  form: FormInstance<TFormValues>;
  initialValues: TFormValues;
  onSubmit: (values: TFormValues) => void;
  children: ReactNode;
  className?: string;
  formClassName?: string;
  scrollClassName?: string;
};

export default function ProfileEditableFormModal<TFormValues extends object>({
  isOpen,
  onClose,
  title,
  description,
  form,
  initialValues,
  onSubmit,
  children,
  className = 'max-w-175 m-4',
  formClassName = '',
  scrollClassName = '',
}: ProfileEditableFormModalProps<TFormValues>) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={className}>
      <ProfileModalContent>
        <ProfileModalHeader title={title} description={description} />

        <Form<TFormValues>
          form={form}
          layout="vertical"
          initialValues={initialValues}
          className={`flex grow flex-col overflow-y-auto ${formClassName}`}
          onFinish={onSubmit}
        >
          <ProfileFormScrollArea className={scrollClassName}>
            {children}
          </ProfileFormScrollArea>

          <ProfileModalActions onCancel={onClose} />
        </Form>
      </ProfileModalContent>
    </Modal>
  );
}
