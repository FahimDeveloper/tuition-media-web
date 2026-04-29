import type {ChangeEvent, FC} from 'react';

interface FileInputProps {
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: FC<FileInputProps> = ({className = '', onChange}) => {
  return (
    <input
      type="file"
      className={`h-11 w-full overflow-hidden rounded-lg border border-border bg-surface-elevated text-sm text-text-muted shadow-theme-xs transition-colors file:mr-5 file:cursor-pointer file:rounded-l-lg file:border-0 file:border-r file:border-solid file:border-border file:bg-surface-muted file:py-3 file:pl-3.5 file:pr-3 file:text-sm file:text-text-strong placeholder:text-text-soft hover:file:bg-brand-50 focus:outline-hidden ${className}`}
      onChange={onChange}
    />
  );
};

export default FileInput;
