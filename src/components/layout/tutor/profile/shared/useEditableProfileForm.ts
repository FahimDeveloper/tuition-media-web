import {useEffect, useMemo} from 'react';
import {Form} from 'antd';
import {useModal} from '@/hooks/useModal';

type UseEditableProfileFormOptions<TValues, TFormValues extends object> = {
  values: TValues;
  onSave: (values: TValues) => void;
  toFormValues?: (values: TValues) => TFormValues;
  fromFormValues?: (values: TFormValues) => TValues;
  onOpen?: () => void;
  onClose?: () => void;
  onAfterSave?: () => void;
};

export default function useEditableProfileForm<
  TValues extends object,
  TFormValues extends object = TValues,
>({
  values,
  onSave,
  toFormValues = (nextValues) => nextValues as unknown as TFormValues,
  fromFormValues = (nextValues) => nextValues as unknown as TValues,
  onOpen,
  onClose,
  onAfterSave,
}: UseEditableProfileFormOptions<TValues, TFormValues>) {
  const {isOpen, openModal, closeModal} = useModal();
  const [form] = Form.useForm<TFormValues>();
  const formValues = useMemo(
    () => toFormValues(values),
    [toFormValues, values],
  );

  useEffect(() => {
    if (!isOpen) return;

    form.setFieldsValue(formValues);
  }, [form, formValues, isOpen]);

  const handleOpen = () => {
    onOpen?.();
    openModal();
  };

  const handleClose = () => {
    onClose?.();
    closeModal();
  };

  const handleSubmit = (nextValues: TFormValues) => {
    onSave(fromFormValues(nextValues));
    onAfterSave?.();
    closeModal();
  };

  return {
    form,
    formValues,
    isOpen,
    openModal: handleOpen,
    closeModal: handleClose,
    handleSubmit,
  };
}
