type inputProps = {
  value?: string;
  setValue?: (value: string) => void;
  width?: string;
  borderWidth?: number;
  fontSize?: number;
  placeholder?: string;
  type?: string;
  paddingY?: number;
  paddingX?: number;
};

function Input({
  value = "",
  setValue = () => {},
  width = "100%",
  borderWidth = 1,
  fontSize = 14,
  placeholder = "Digite aqui",
  type = "text",
  paddingY = 10,
  paddingX = 12,
}: inputProps) {
  return (
    <input
      value={value}
      type={type}
      placeholder={placeholder}
      style={{
        width,
        borderWidth: `${borderWidth}px`,
        fontSize: `${fontSize}px`,
        paddingTop: `${paddingY}px`,
        paddingBottom: `${paddingY}px`,
        paddingLeft: `${paddingX}px`,
        paddingRight: `${paddingX}px`,
      }}
      className="h-10 rounded-lg border-border bg-surface focus:outline-none focus:border-accent focus:ring-3 focus:ring-accent/25"
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default Input;