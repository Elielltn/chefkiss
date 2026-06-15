type FormFieldProps = {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function FormField({
  label,
  type,
  placeholder,
  value,
  onChange,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-red-50 border border-orange-900 rounded-lg px-3 py-3 outline-none"
      />
    </div>
  );
}

export default FormField;
