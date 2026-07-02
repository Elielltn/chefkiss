import { Plus } from "lucide-react";

type buttonProps = {
  text: string;
  onClick: () => void;
};

function AddButton({ text, onClick }: buttonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-border bg-transparent px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-accent hover:text-primary focus-visible:focus-ring"
    >
      <Plus className="size-3.5" />
      {text}
    </button>
  );
}

export default AddButton;
