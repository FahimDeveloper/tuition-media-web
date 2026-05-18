import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import { useEffect } from "react";
import Label from "@/components/layout/shared/forms/Label";
import { CalenderIcon } from "@/icons";

type Hook = flatpickr.Options.Hook;
type DateOption = flatpickr.Options.DateOption;

type PropsType = {
  id: string;
  mode?: "single" | "multiple" | "range" | "time";
  onChange?: Hook | Hook[];
  defaultDate?: DateOption;
  label?: string;
  placeholder?: string;
};

export default function DatePicker({
  id,
  mode,
  onChange,
  label,
  defaultDate,
  placeholder,
}: PropsType) {
  useEffect(() => {
    const flatPickr = flatpickr(`#${id}`, {
      mode: mode || "single",
      static: true,
      monthSelectorType: "static",
      dateFormat: "Y-m-d",
      defaultDate,
      onChange,
    });

    return () => {
      if (!Array.isArray(flatPickr)) {
        flatPickr.destroy();
      }
    };
  }, [mode, onChange, id, defaultDate]);

  return (
    <div>
      {label ? <Label htmlFor={id}>{label}</Label> : null}

      <div className="relative">
        <input
          id={id}
          placeholder={placeholder}
          className="border-border bg-surface-elevated text-text-strong shadow-theme-xs placeholder:text-text-soft focus:border-brand-300 focus:ring-brand-500/20 h-11 w-full appearance-none rounded-lg border px-4 py-2.5 text-sm focus:ring-3 focus:outline-hidden"
        />

        <span className="text-text-muted pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
          <CalenderIcon className="size-6" />
        </span>
      </div>
    </div>
  );
}
