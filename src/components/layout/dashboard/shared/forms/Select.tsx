import {useState} from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  defaultValue?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = 'Select an option',
  onChange,
  className = '',
  defaultValue = '',
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <select
      className={`h-11 w-full appearance-none rounded-lg border border-border bg-surface-elevated px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-text-soft focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 ${
        selectedValue ? 'text-text-strong' : 'text-text-soft'
      } ${className}`}
      value={selectedValue}
      onChange={handleChange}
    >
      <option value="" disabled className="bg-surface-elevated text-text-muted">
        {placeholder}
      </option>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="bg-surface-elevated text-text-strong"
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
