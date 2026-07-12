function ModeTab({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={
        "rounded-lg px-3 py-2 text-sm font-medium transition-all focus-visible:focus-ring " +
        (active
          ? "bg-card text-foreground shadow-soft"
          : "text-muted-foreground hover:text-foreground")
      }
    >
      {label}
    </button>
  );
}

export default ModeTab;
