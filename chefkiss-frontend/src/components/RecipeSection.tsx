import type { ReactNode } from "react";

type recipeSectionProps = {
  label: string;
  gap?: number;
  children: ReactNode;
};

function RecipeSection({ label, gap = 8, children }: recipeSectionProps) {
  return (
    <section className="mb-[32px]">
      <h2 className="text-[20px] mb-[14px] text-[#1A0800]">{label}</h2>
      <div className="grid" style={{ gap: gap }}>
        {children}
      </div>
    </section>
  );
}

export default RecipeSection;
