type categoryBtnProps = {
  label: string;
  active: boolean;
  catsArr: string[];
  onClick: () => void;
};

function CategoryBtn({ label, active, catsArr, onClick }: categoryBtnProps) {
  const disabled = catsArr.length >= 2;
  return (
    <button
      className="text-[12px] py-[5px] px-[14px] rounded-[20px] whitespace-nowrap shrink-0"
      style={{
        background: active ? "#3D1800" : disabled ? "#E8E0D5" : "transparent",
        color: active ? "#FDF5E6" : disabled ? "#C4B8A8" : "#5C3010",
        border: `1.5px solid ${active ? "#3D1800" : disabled ? "#C4B8A8" : "#8B5E2C"}`,
        fontWeight: active ? 500 : 400,
        cursor: disabled && !active ? "not-allowed" : "pointer",
      }}
      disabled={active ? false : disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default CategoryBtn;
