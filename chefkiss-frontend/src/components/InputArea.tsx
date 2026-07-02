import { Search, Plus } from "lucide-react";

type inputAreaProps = {
  onOpenModal: () => void;
};

function InputArea({ onOpenModal }: inputAreaProps) {
  return (
    <div className="mt-10 flex items-center gap-3">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Digite o nome de uma receita aqui..."
          className="h-12 w-full rounded-xl border border-border bg-surface pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground shadow-soft transition-colors focus:outline-none focus:border-accent focus:ring-3 focus:ring-accent/25"
          aria-label="Buscar receita"
        />
      </div>
      <button
        aria-label="Adicionar nova receita"
        className="grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground shadow-soft transition-all hover:bg-primary-hover hover:shadow-elevated focus-visible:focus-ring"
        onClick={onOpenModal}
      >
        <Plus className="size-5" strokeWidth={2.25} />
      </button>
    </div>
  );
}

export default InputArea;
