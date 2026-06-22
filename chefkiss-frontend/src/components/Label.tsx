<label htmlFor=""></label>;

type labelProps = {
  labelContent: string;
};

function Label({ labelContent }: labelProps) {
  return (
    <label className="text-[11px] font-bold tracking-wider uppercase mb-[6px] block">
      {labelContent}
    </label>
  );
}

export default Label;
