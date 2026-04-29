import PageBreadcrumb from '@/components/layout/shared/PageBreadcrumb';
import DefaultInputs from '@/components/layout/forms/DefaultInputs';
import InputGroup from '@/components/layout/forms/InputGroup';
import DropzoneComponent from '@/components/layout/forms/DropZone';
import CheckboxComponents from '@/components/layout/forms/CheckboxComponents';
import RadioButtons from '@/components/layout/forms/RadioButtons';
import ToggleSwitch from '@/components/layout/forms/ToggleSwitch';
import FileInputExample from '@/components/layout/forms/FileInputExample';
import SelectInputs from '@/components/layout/forms/SelectInputs';
import TextAreaInput from '@/components/layout/forms/TextAreaInput';
import InputStates from '@/components/layout/forms/InputStates';
import PageMeta from '@/components/common/PageMeta';

export default function FormElements() {
  return (
    <div>
      <PageMeta
        title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Form Elements" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <DefaultInputs />
          <SelectInputs />
          <TextAreaInput />
          <InputStates />
        </div>
        <div className="space-y-6">
          <InputGroup />
          <FileInputExample />
          <CheckboxComponents />
          <RadioButtons />
          <ToggleSwitch />
          <DropzoneComponent />
        </div>
      </div>
    </div>
  );
}
