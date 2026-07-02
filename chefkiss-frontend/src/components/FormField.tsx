type FormFieldProps = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

function FormField({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-lg border border-border bg-surface px-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:outline-none focus:border-accent focus:ring-3 focus:ring-accent/25"
      />
    </div>
  );
}

export default FormField;
