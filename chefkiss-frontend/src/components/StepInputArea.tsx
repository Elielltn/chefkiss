import Button from "./Button";

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
        className="bg-[#FFFAF2] border-[1.5px] border-solid border-[#8B5E2C] rounded-lg py-[10px] px-[14px] text-[#C8953A] text-[14px] outline-none box-border w-full flex-1 resize-y min-h-[50px]"
        value={step}
        placeholder={`Descreva o passo ${id + 1}...`}
        rows={2}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
      {stepsArr.length > 1 && (
        <Button
          classes="bg-transparent border-none cursor-pointer text-[20px] px-[4px] leading-none shrink-[0]"
          text="×"
          onClick={() => onRemoveStep()}
        />
      )}
    </div>
  );
}

export default StepInputArea;
