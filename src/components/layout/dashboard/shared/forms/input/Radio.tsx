interface RadioProps {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  label: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

const Radio: React.FC<RadioProps> = ({
  id,
  name,
  value,
  checked,
  label,
  onChange,
  className = '',
  disabled = false,
}) => {
  return (
    <label
      htmlFor={id}
      className={`relative flex select-none items-center gap-3 text-sm font-medium ${
        disabled ? 'cursor-not-allowed text-text-soft' : 'cursor-pointer text-text-muted'
      } ${className}`}
    >
      <input
        id={id}
        name={name}
        type="radio"
        value={value}
        checked={checked}
        onChange={() => !disabled && onChange(value)}
        className="sr-only"
        disabled={disabled}
      />
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full border-[1.25px] ${
          checked ? 'border-brand-500 bg-brand-500' : 'border-border bg-transparent'
        } ${disabled ? 'border-border bg-surface-muted' : ''}`}
      >
        <span
          className={`h-2 w-2 rounded-full bg-white ${checked ? 'block' : 'hidden'}`}
        ></span>
      </span>
      {label}
    </label>
  );
};

export default Radio;
