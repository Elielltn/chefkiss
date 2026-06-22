type secHeadProps = {
  title: string;
};

function SecHead({ title }: secHeadProps) {
  return (
    <div className="flex items-center gap-[10px]">
      <span className="text-[15px] font-bold whitespace-nowrap">{title}</span>
      <div className="flex-1 h-[1px] bg-[#593700]" />
    </div>
  );
}

export default SecHead;
