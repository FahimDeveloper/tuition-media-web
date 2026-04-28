import React from 'react';

interface TextareaProps {
  placeholder?: string; // Placeholder text
  rows?: number; // Number of rows
  value?: string; // Current value
  onChange?: (value: string) => void; // Change handler
  className?: string; // Additional CSS classes
  disabled?: boolean; // Disabled state
  error?: boolean; // Error state
  hint?: string; // Hint text to display
}

const TextArea: React.FC<TextareaProps> = ({
  placeholder = 'Enter your message',
  rows = 3,
  value = '',
  onChange,
  className = '',
  disabled = false,
  error = false,
  hint = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  let textareaClasses = `w-full rounded-lg border border-border bg-surface-elevated px-4 py-2.5 text-sm text-text-strong shadow-theme-xs placeholder:text-text-soft focus:outline-hidden ${className}`;

  if (disabled) {
    textareaClasses += ` cursor-not-allowed border-border bg-surface-muted text-text-soft opacity-50`;
  } else if (error) {
    textareaClasses += ` focus:border-error-300 focus:ring-3 focus:ring-error-500/10`;
  } else {
    textareaClasses += ` focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10`;
  }

  return (
    <div className="relative">
      <textarea
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={textareaClasses}
      />
      {hint && (
        <p
          className={`mt-2 text-sm ${
            error ? 'text-error-500' : 'text-text-muted'
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

export default TextArea;
