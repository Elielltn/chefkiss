const btnDashed = {
  background: "transparent",
  color: "#5C3010",
  border: `1.5px dashed #8B5E2C55`,
  borderRadius: 8,
  padding: "8px 14px",
  fontSize: 13,
  cursor: "pointer",
  fontFamily: "system-ui,sans-serif",
};

type buttonProps = {
  style?: string;
  text: string;
  classes: string;
  onClick: () => void;
};

function Button({ style, text, classes, onClick }: buttonProps) {
  return (
    <button
      className={classes}
      style={style == "dashed" ? { ...btnDashed } : {}}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
