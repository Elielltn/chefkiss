type inputProps = {
  value?: string;
  setValue?: (value: string) => void;
  width?: string;
  borderWidth?: number;
  borderColor?: string;
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
  borderWidth = 2,
  borderColor = "#8B5E2C",
  fontSize = 14,
  placeholder = "Digite aqui",
  type = "text",
  paddingY = 10,
  paddingX = 14,
}: inputProps) {
  return (
    <input
      value={value}
      type={type}
      placeholder={placeholder}
      style={{
        width,
        borderWidth: `${borderWidth}px`,
        borderColor,
        fontSize: `${fontSize}px`,
        paddingTop: `${paddingY}px`,
        paddingBottom: `${paddingY}px`,
        paddingLeft: `${paddingX}px`,
        paddingRight: `${paddingX}px`,
      }}
      className="border-solid rounded-lg"
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default Input;