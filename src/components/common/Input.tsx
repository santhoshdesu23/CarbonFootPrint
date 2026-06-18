import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

type BaseProps = {
  label?: string;
  helperText?: string;
  error?: string;
};

type InputProps = BaseProps & InputHTMLAttributes<HTMLInputElement>;
type TextAreaProps = BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextInput({ label = 'Input', helperText, error, id, className = '', ...props }: InputProps) {
  const inputId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, '-');

  return (
    <label htmlFor={inputId} className="flex flex-col gap-2 text-sm font-medium text-slate-700">
      <span>{label}</span>
      <input
        id={inputId}
        className={`h-11 rounded-xl border border-slate-200 bg-white px-4 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 ${className}`}
        aria-invalid={Boolean(error)}
        aria-describedby={helperText || error ? `${inputId}-hint` : undefined}
        {...props}
      />
      {helperText ? <span id={`${inputId}-hint`} className="text-xs text-slate-500">{helperText}</span> : null}
      {error ? <span className="text-xs font-medium text-rose-600">{error}</span> : null}
    </label>
  );
}

export function TextArea({ label = 'Input', helperText, error, id, className = '', ...props }: TextAreaProps) {
  const textAreaId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, '-');

  return (
    <label htmlFor={textAreaId} className="flex flex-col gap-2 text-sm font-medium text-slate-700">
      <span>{label}</span>
      <textarea
        id={textAreaId}
        className={`min-h-28 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 ${className}`}
        aria-invalid={Boolean(error)}
        aria-describedby={helperText || error ? `${textAreaId}-hint` : undefined}
        {...props}
      />
      {helperText ? <span id={`${textAreaId}-hint`} className="text-xs text-slate-500">{helperText}</span> : null}
      {error ? <span className="text-xs font-medium text-rose-600">{error}</span> : null}
    </label>
  );
}

export default function Input({ label = 'Input', ...props }: InputProps) {
  return <TextInput label={label} {...props} />;
}
