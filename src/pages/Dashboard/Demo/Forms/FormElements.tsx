import PageBreadcrumb from "@/components/layout/dashboard/shared/PageBreadcrumb";
import DefaultInputs from "@/components/layout/dashboard/demo/forms/DefaultInputs";
import InputGroup from "@/components/layout/dashboard/demo/forms/InputGroup";
import DropzoneComponent from "@/components/layout/dashboard/demo/forms/DropZone";
import CheckboxComponents from "@/components/layout/dashboard/demo/forms/CheckboxComponents";
import RadioButtons from "@/components/layout/dashboard/demo/forms/RadioButtons";
import ToggleSwitch from "@/components/layout/dashboard/demo/forms/ToggleSwitch";
import FileInputExample from "@/components/layout/dashboard/demo/forms/FileInputExample";
import SelectInputs from "@/components/layout/dashboard/demo/forms/SelectInputs";
import TextAreaInput from "@/components/layout/dashboard/demo/forms/TextAreaInput";
import InputStates from "@/components/layout/dashboard/demo/forms/InputStates";
import PageMeta from "@/components/common/PageMeta";

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
