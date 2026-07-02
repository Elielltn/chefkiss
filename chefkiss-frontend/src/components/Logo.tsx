type logoProps = {
  fontSize: number;
  fontWeight?: number | string;
};

function Logo({ fontSize, fontWeight = 500 }: logoProps) {
  return (
    <h1
      style={{ fontSize: `${fontSize}px`, fontWeight: fontWeight }}
      className="font-display leading-none text-foreground"
    >
      ChefKiss
    </h1>
  );
}

export default Logo;
