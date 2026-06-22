import Button from "./Button";

type tipInputAreaProps = {
  tipsArr: string[];
  tip: string;
  onRemoveTip: () => void;
  onChange: (newValue: string) => void;
};

function TipInputArea({
  tipsArr,
  tip,
  onRemoveTip,
  onChange,
}: tipInputAreaProps) {
  return (
    <div className="flex items-start gap-[10px]">
      <span className="mt-[10px] text-[16px] shrink-0">💡</span>
      <textarea
        className="bg-[#FFFAF2] border-[1.5px] border-solid border-[#8B5E2C] rounded-lg py-[10px] px-[14px] text-[#C8953A] text-[14px] outline-none box-border w-full flex-1 resize-y min-h-[50px]"
        value={tip}
        placeholder="Dica ou observação"
        rows={2}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
      {tipsArr.length > 1 && (
        <Button
          classes="bg-transparent border-none cursor-pointer text-[20px] px-[4px] leading-none shrink-[0]"
          text="×"
          onClick={() => onRemoveTip()}
        />
      )}
    </div>
  );
}

export default TipInputArea;
