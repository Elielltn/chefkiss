type tagBadgeProps = {
  label: string;
};

function TagBadge({ label }: tagBadgeProps) {
  return (
    <span className="bg-[#3D1800] text-[#FDF5E6] rounded-[20px] py-[3px] px-[12px] text-[12px] font-medium font-bold tracking-wider">
      {label}
    </span>
  );
}

export default TagBadge;
