import type { ChangeEvent, FC } from "react";

interface FileInputProps {
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: FC<FileInputProps> = ({ className = "", onChange }) => {
  return (
    <input
      type="file"
      className={`border-border bg-surface-elevated text-text-muted shadow-theme-xs file:border-border file:bg-surface-muted file:text-text-strong placeholder:text-text-soft hover:file:bg-brand-50 h-11 w-full overflow-hidden rounded-lg border text-sm transition-colors file:mr-5 file:cursor-pointer file:rounded-l-lg file:border-0 file:border-r file:border-solid file:py-3 file:pr-3 file:pl-3.5 file:text-sm focus:outline-hidden ${className}`}
      onChange={onChange}
    />
  );
};

export default FileInput;
