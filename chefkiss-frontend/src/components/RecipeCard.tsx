type recipeCardProps = {
  name: string;
  tags: string[];
};

function RecipeCard({ name, tags }: recipeCardProps) {
  return (
    <div className="bg-[#FFCC91] h-[240px] w-full border-2 border-[#593700] rounded-xl overflow-hidden">
      <div className="bg-[#593700] h-[180px] w-full"></div>
      <div className="h-[60px] w-full px-3 py-2 flex flex-col justify-center text-[#593700]">
        <h2 className="text-[15px] font-semibold leading-tight">{name}</h2>
        <span className="text-[12px] font-light">{`${tags[0]} • ${tags[1]}`}</span>
      </div>
    </div>
  );
}

export default RecipeCard;
