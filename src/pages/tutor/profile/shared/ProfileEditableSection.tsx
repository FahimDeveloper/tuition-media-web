import { useCallback, useEffect, useMemo, type ReactNode } from "react";
import { Alert, Button, Form, Popconfirm } from "antd";
import type { FormInstance } from "antd/es/form";

import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import { getDisplayValue } from "@/utils/display.utils";

export type ProfileInfoField<TValues> =
  | {
      key: keyof TValues;
      label: string;
    }
  | {
      key: string;
      label: string;
      getValue: (values: TValues) => unknown;
    };

export type ProfileSaveHandler<TValues> = (
  values: TValues,
) => Promise<void> | void;

type RenderActionOptions = {
  defaultAction: ReactNode;
  isSaving: boolean;
  openModal: () => void;
  deleteSection?: () => Promise<void> | void;
};

type ProfileEditableSectionProps<
  TValues extends object,
  TFormValues extends object = TValues,
> = {
  title: string;
  modalTitle: string;
  modalDescription: string;
  values: TValues;
  items: ProfileInfoField<TValues>[];
  onSave: ProfileSaveHandler<TValues>;
  onDelete?: () => Promise<void> | void;
  isSaving?: boolean;
  saveError?: string;
  onClearSaveError?: () => void;
  children: ReactNode;
  className?: string;
  formClassName?: string;
  scrollClassName?: string;
  toFormValues?: (values: TValues) => TFormValues;
  fromFormValues?: (values: TFormValues) => TValues;
  formatValue?: (key: string, value: unknown, values: TValues) => string;
  renderAction?: (options: RenderActionOptions) => ReactNode;
};

type UseEditableProfileFormOptions<
  TValues extends object,
  TFormValues extends object,
> = {
  values: TValues;
  onSave: ProfileSaveHandler<TValues>;
  isSaving?: boolean;
  toFormValues?: (values: TValues) => TFormValues;
  fromFormValues?: (values: TFormValues) => TValues;
  onOpen?: () => void;
  onClose?: () => void;
  onAfterSave?: () => void;
};

const identityToFormValues = <TValues extends object, TFormValues extends object>(
  values: TValues,
) => values as unknown as TFormValues;

const identityFromFormValues = <TValues extends object, TFormValues extends object>(
  values: TFormValues,
) => values as unknown as TValues;

const cx = (...classNames: Array<string | undefined>) =>
  classNames.filter(Boolean).join(" ");

function useEditableProfileForm<
  TValues extends object,
  TFormValues extends object = TValues,
>({
  values,
  onSave,
  isSaving = false,
  toFormValues = identityToFormValues,
  fromFormValues = identityFromFormValues,
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

    form.resetFields();
    form.setFieldsValue(formValues);
  }, [form, formValues, isOpen]);

  const handleOpen = useCallback(() => {
    onOpen?.();
    openModal();
  }, [onOpen, openModal]);

  const handleClose = useCallback(() => {
    if (isSaving) return;

    form.resetFields();
    onClose?.();
    closeModal();
  }, [closeModal, form, isSaving, onClose]);

  const handleSubmit = useCallback(
    async (nextValues: TFormValues) => {
      if (isSaving) return;

      try {
        await onSave(fromFormValues(nextValues));
        onAfterSave?.();
        closeModal();
      } catch {
        // Mutation errors are owned by the parent query layer; the modal stays
        // open so users can fix or retry the same form without losing edits.
      }
    },
    [closeModal, fromFormValues, isSaving, onAfterSave, onSave],
  );

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

export function ProfileFormSection({
  title,
  description,
  children,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div>
      {title ? (
        <h5 className="mb-5 text-lg font-medium text-gray-800 lg:mb-6 dark:text-white/90">
          {title}
        </h5>
      ) : null}

      {description ? (
        <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      ) : null}

      {children}
    </div>
  );
}

export function ProfileFormGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("grid grid-cols-1 gap-x-6 lg:grid-cols-2", className)}>
      {children}
    </div>
  );
}

export function ProfileFormScrollArea({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("custom-scrollbar overflow-y-auto px-2 pb-3", className)}>
      {children}
    </div>
  );
}

function ProfileEditButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="shadow-theme-xs flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50 lg:inline-flex lg:w-auto dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200"
    >
      Edit
    </button>
  );
}

function ProfileDeleteButton({
  onConfirm,
  disabled,
}: {
  onConfirm: () => Promise<void> | void;
  disabled?: boolean;
}) {
  return (
    <Popconfirm
      title="Clear this section?"
      description="This will save blank values for this profile section."
      okText="Clear"
      cancelText="Cancel"
      okButtonProps={{ danger: true }}
      disabled={disabled}
      onConfirm={onConfirm}
    >
      <button
        type="button"
        disabled={disabled}
        className="shadow-theme-xs flex w-full items-center justify-center gap-2 rounded-full border border-red-200 bg-white px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 lg:inline-flex lg:w-auto dark:border-red-900/50 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-red-950/30"
      >
        Delete
      </button>
    </Popconfirm>
  );
}

function ProfileSectionActions({
  onEdit,
  onDelete,
  disabled,
}: {
  onEdit: () => void;
  onDelete?: () => Promise<void> | void;
  disabled?: boolean;
}) {
  return (
    <div className="flex w-full flex-col gap-2 lg:w-auto lg:flex-row lg:justify-end">
      <ProfileEditButton disabled={disabled} onClick={onEdit} />
      {onDelete ? (
        <ProfileDeleteButton disabled={disabled} onConfirm={onDelete} />
      ) : null}
    </div>
  );
}

function ProfileInfoItem({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
        {label}
      </p>
      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
        {value}
      </p>
    </div>
  );
}

const getFieldValue = <TValues extends object>(
  field: ProfileInfoField<TValues>,
  values: TValues,
) => ("getValue" in field ? field.getValue(values) : values[field.key]);

function ProfileInfoList<TValues extends object>({
  items,
  values,
  formatValue,
}: {
  items: ProfileInfoField<TValues>[];
  values: TValues;
  formatValue?: (key: string, value: unknown, values: TValues) => string;
}) {
  return (
    <>
      {items.map((field) => {
        const value = getFieldValue(field, values);
        const formattedValue = formatValue
          ? formatValue(String(field.key), value, values)
          : getDisplayValue(value);

        return (
          <ProfileInfoItem
            key={String(field.key)}
            label={field.label}
            value={formattedValue}
          />
        );
      })}
    </>
  );
}

function ProfileSectionCard({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <h4 className="text-lg font-semibold text-gray-800 lg:mb-6 dark:text-white/90">
            {title}
          </h4>

          {children}
        </div>

        {action}
      </div>
    </div>
  );
}

function ProfileInfoGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-7 2xl:gap-x-32">
      {children}
    </div>
  );
}

function ProfileModalContent({ children }: { children: ReactNode }) {
  return (
    <div className="no-scrollbar relative flex h-fit max-h-[90vh] w-full max-w-175 flex-col overflow-y-auto rounded-3xl bg-white p-4 lg:p-8 lg:pb-6 dark:bg-gray-900">
      {children}
    </div>
  );
}

function ProfileModalHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="px-2 pr-14">
      <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
        {title}
      </h4>
      <p className="mb-6 text-sm text-gray-500 lg:mb-7 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}

function ProfileModalActions({
  isSaving = false,
  onCancel,
}: {
  isSaving?: boolean;
  onCancel: () => void;
}) {
  return (
    <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
      <Button disabled={isSaving} onClick={onCancel}>
        Close
      </Button>
      <Button type="primary" htmlType="submit" loading={isSaving}>
        Save Changes
      </Button>
    </div>
  );
}

function ProfileEditableFormModal<TFormValues extends object>({
  isOpen,
  onClose,
  title,
  description,
  form,
  initialValues,
  isSaving = false,
  saveError,
  onSubmit,
  children,
  className = "max-w-175 m-4",
  formClassName,
  scrollClassName,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  form: FormInstance<TFormValues>;
  initialValues: TFormValues;
  isSaving?: boolean;
  saveError?: string;
  onSubmit: (values: TFormValues) => Promise<void> | void;
  children: ReactNode;
  className?: string;
  formClassName?: string;
  scrollClassName?: string;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={className}>
      <ProfileModalContent>
        <ProfileModalHeader title={title} description={description} />

        {saveError ? (
          <Alert
            type="error"
            showIcon
            message={saveError}
            className="mb-5! rounded-lg!"
          />
        ) : null}

        <Form<TFormValues>
          form={form}
          layout="vertical"
          initialValues={initialValues}
          className={cx("flex grow flex-col overflow-y-auto", formClassName)}
          onFinish={onSubmit}
        >
          <ProfileFormScrollArea className={scrollClassName}>
            {children}
          </ProfileFormScrollArea>

          <ProfileModalActions isSaving={isSaving} onCancel={onClose} />
        </Form>
      </ProfileModalContent>
    </Modal>
  );
}

export default function ProfileEditableSection<
  TValues extends object,
  TFormValues extends object = TValues,
>({
  title,
  modalTitle,
  modalDescription,
  values,
  items,
  onSave,
  onDelete,
  isSaving = false,
  saveError,
  onClearSaveError,
  children,
  className,
  formClassName,
  scrollClassName,
  toFormValues,
  fromFormValues,
  formatValue,
  renderAction,
}: ProfileEditableSectionProps<TValues, TFormValues>) {
  const editableForm = useEditableProfileForm<TValues, TFormValues>({
    values,
    onSave,
    isSaving,
    toFormValues,
    fromFormValues,
    onOpen: onClearSaveError,
  });
  const handleDelete = useCallback(async () => {
    if (editableForm.isSaving || !onDelete) return;

    await onDelete();
  }, [editableForm.isSaving, onDelete]);

  const defaultAction = (
    <ProfileSectionActions
      disabled={editableForm.isSaving}
      onEdit={editableForm.openModal}
      onDelete={onDelete ? handleDelete : undefined}
    />
  );

  return (
    <>
      <ProfileSectionCard
        title={title}
        action={
          renderAction
            ? renderAction({
                defaultAction,
                isSaving: editableForm.isSaving,
                openModal: editableForm.openModal,
                deleteSection: onDelete ? handleDelete : undefined,
              })
            : defaultAction
        }
      >
        <ProfileInfoGrid>
          <ProfileInfoList
            items={items}
            values={values}
            formatValue={formatValue}
          />
        </ProfileInfoGrid>
      </ProfileSectionCard>

      <ProfileEditableFormModal
        isOpen={editableForm.isOpen}
        onClose={editableForm.closeModal}
        title={modalTitle}
        description={modalDescription}
        form={editableForm.form}
        initialValues={editableForm.formValues}
        isSaving={editableForm.isSaving}
        saveError={saveError}
        className={className}
        formClassName={formClassName}
        scrollClassName={scrollClassName}
        onSubmit={editableForm.handleSubmit}
      >
        {children}
      </ProfileEditableFormModal>
    </>
  );
}
