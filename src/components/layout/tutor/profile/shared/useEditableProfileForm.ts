import { useEffect, useMemo } from "react";
import { Form } from "antd";
import { useModal } from "@/hooks/useModal";

export type ProfileSaveHandler<TValues> = (
  values: TValues,
) => Promise<void> | void;

type UseEditableProfileFormOptions<TValues, TFormValues extends object> = {
  values: TValues;
  onSave: ProfileSaveHandler<TValues>;
  isSaving?: boolean;
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
  isSaving = false,
  toFormValues = (nextValues) => nextValues as unknown as TFormValues,
  fromFormValues = (nextValues) => nextValues as unknown as TValues,
  onOpen,
  onClose,
  onAfterSave,
}: UseEditableProfileFormOptions<TValues, TFormValues>) {
  const { isOpen, openModal, closeModal } = useModal();
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
    if (isSaving) return;

    onClose?.();
    closeModal();
  };

  const handleSubmit = async (nextValues: TFormValues) => {
    if (isSaving) return;

    try {
      await onSave(fromFormValues(nextValues));
      onAfterSave?.();
      closeModal();
    } catch {
      // Mutation errors are owned by the parent query layer; the modal stays
      // open so users can fix or retry the same form without losing edits.
      return;
    }
  };

  return {
    form,
    formValues,
    isOpen,
    isSaving,
    openModal: handleOpen,
    closeModal: handleClose,
    handleSubmit,
  };
}
