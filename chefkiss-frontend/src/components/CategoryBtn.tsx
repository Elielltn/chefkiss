type categoryBtnProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

function CategoryBtn({ label, active, onClick }: categoryBtnProps) {
  return (
    <button
      className="text-[12px] py-[5px] px-[14px] rounded-[20px] cursor-pointer whitespace-nowrap shrink-0"
      style={{
        background: active ? "#3D1800" : "transparent",
        color: active ? "#FDF5E6" : "#5C3010",
        border: `1.5px solid ${active ? "#3D1800" : "#8B5E2C"}`,
        fontWeight: active ? 500 : 400,
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default CategoryBtn;
