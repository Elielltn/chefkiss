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
      key={label}
      type="button"
      onClick={onClick}
      disabled={active ? false : disabled}
      className={
        "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all focus-visible:focus-ring " +
        (active
          ? "border-primary bg-primary text-primary-foreground shadow-soft"
          : disabled
            ? "border-border bg-surface text-muted-foreground opacity-60 cursor-not-allowed"
            : "border-border bg-surface text-foreground hover:border-accent hover:text-primary")
      }
    >
      {label}
    </button>
  );
}

export default CategoryBtn;
