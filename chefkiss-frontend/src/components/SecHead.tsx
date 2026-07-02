type secHeadProps = {
  title: string;
};

function SecHead({ title }: secHeadProps) {
  return (
    <div className="flex items-center gap-3">
      <h3 className="font-display text-lg font-semibold text-foreground">
        {title}
      </h3>
      <span className="h-px flex-1 bg-border" aria-hidden />
    </div>
  );
}

export default SecHead;
