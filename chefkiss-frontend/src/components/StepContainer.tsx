type stepContainerProps = {
  step: string;
  i: number;
};

function StepContainer({ step, i }: stepContainerProps) {
  return (
    <li key={i} className="flex items-start gap-3.5">
      <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
        {i + 1}
      </span>
      <p className="text-sm leading-relaxed text-foreground">{step}</p>
    </li>
  );
}

export default StepContainer;
