type stepInputAreaProps = {
  id: number;
  step: string;
  stepsArr: string[];
  onRemoveStep: () => void;
  onChange: (newValue: string) => void;
};

function StepInputArea({
  id,
  step,
  onRemoveStep,
  onChange,
  stepsArr,
}: stepInputAreaProps) {
  return (
    <div className="flex gap-[10px] items-start">
      <div className="bg-[#3D1800] text-[#FDF5E6] text-[12px] mt-[2px] font-medium rounded-[50%] w-[28px] h-[28px] min-w-[28px] flex items-center justify-center">
        {id + 1}
      </div>

      <textarea
        className="min-h-[68px] flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm focus:outline-none focus:border-accent focus:ring-3 focus:ring-accent/25"
        value={step}
        placeholder={`Descreva o passo ${id + 1}...`}
        rows={2}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
      {stepsArr.length > 1 && (
        <button
          className="bg-transparent border-none cursor-pointer text-[20px] px-[4px] leading-none shrink-[0]"
          onClick={() => onRemoveStep()}
        >
          ×
        </button>
      )}
    </div>
  );
}

export default StepInputArea;
