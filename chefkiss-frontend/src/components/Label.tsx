<label htmlFor=""></label>;

type labelProps = {
  labelContent: string;
};

function Label({ labelContent }: labelProps) {
  return (
    <label className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
      {labelContent}
    </label>
  );
}

export default Label;
