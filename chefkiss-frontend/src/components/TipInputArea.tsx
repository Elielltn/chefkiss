import { Lightbulb } from "lucide-react";

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
      <span className="mt-2 grid size-7 shrink-0 place-items-center rounded-full bg-accent/15">
        <Lightbulb className="size-3.5 text-accent" />
      </span>
      <textarea
        className="min-h-[68px] flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm focus:outline-none focus:border-accent focus:ring-3 focus:ring-accent/25"
        value={tip}
        placeholder="Dica ou observação"
        rows={2}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
      {tipsArr.length > 1 && (
        <button
          className="bg-transparent border-none cursor-pointer text-[20px] px-[4px] leading-none shrink-[0]"
          onClick={() => onRemoveTip()}
        >
          ×
        </button>
      )}
    </div>
  );
}

export default TipInputArea;
