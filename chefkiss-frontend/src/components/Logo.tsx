type logoProps = {
  fontSize: number;
};

function Logo({ fontSize }: logoProps) {
  return (
    <h1 style={{ fontSize: `${fontSize}px` }} className="logo text-orange-900 mb-[24px]">
      ChefKiss
    </h1>
  );
}

export default Logo;
