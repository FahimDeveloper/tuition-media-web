import type { ReactNode } from "react";

import ProfileEditButton from "./ProfileEditButton";
import ProfileEditableFormModal from "./ProfileEditableFormModal";
import ProfileInfoList, { type ProfileInfoField } from "./ProfileInfoList";
import ProfileSectionCard, { ProfileInfoGrid } from "./ProfileSectionCard";
import useEditableProfileForm, {
  type ProfileSaveHandler,
} from "./useEditableProfileForm";

type RenderActionOptions = {
  defaultAction: ReactNode;
  isSaving: boolean;
  openModal: () => void;
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
  const defaultAction = (
    <ProfileEditButton
      disabled={editableForm.isSaving}
      onClick={editableForm.openModal}
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
