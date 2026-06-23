type stepContainerProps = {
  step: string;
  i: number;
};

function StepContainer({ step, i }: stepContainerProps) {
  return (
    <div className="flex gap-3.5">
      <div className="bg-[#3D1800] text-[#FDF5E6] flex h-7 w-7 min-w-7 items-center justify-center rounded-full text-xs font-medium mt-0.5">
        {i + 1}
      </div>

      <p className="m-0 text-[15px] leading-[1.65] text-[#1A0800] font-sans">
        {step}
      </p>
    </div>
  );
}

export default StepContainer;
