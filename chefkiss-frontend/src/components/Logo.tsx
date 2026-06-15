type logoProps = {
  fontSize: number;
};

function Logo({ fontSize }: logoProps) {
  return (
    <h1 style={{ fontSize: `${fontSize}px` }} className="logo text-[#593700]">
      ChefKiss
    </h1>
  );
}

export default Logo;
