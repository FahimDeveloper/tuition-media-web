import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
import {useEffect} from 'react';
import Label from '@/components/layout/shared/forms/Label';
import {CalenderIcon} from '@/icons';

type Hook = flatpickr.Options.Hook;
type DateOption = flatpickr.Options.DateOption;

type PropsType = {
  id: string;
  mode?: 'single' | 'multiple' | 'range' | 'time';
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
      mode: mode || 'single',
      static: true,
      monthSelectorType: 'static',
      dateFormat: 'Y-m-d',
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
          className="h-11 w-full appearance-none rounded-lg border border-border bg-surface-elevated px-4 py-2.5 text-sm text-text-strong shadow-theme-xs placeholder:text-text-soft focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/20"
        />

        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
          <CalenderIcon className="size-6" />
        </span>
      </div>
    </div>
  );
}
