type tagBadgeProps = {
  label: string;
};

function TagBadge({ label }: tagBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
      {label}
    </span>
  );
}

export default TagBadge;
