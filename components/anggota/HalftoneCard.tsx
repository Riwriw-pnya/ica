interface HalftoneCardProps {
  children: React.ReactNode;
  dotColor?: string;
  bgColor?: string;
  dotSize?: string;
  className?: string;
  as?: "button" | "div";
  onClick?: () => void;
}

export default function HalftoneCard({
  children,
  dotColor = "var(--color-brand-orange-300)",
  bgColor = "var(--color-brand-orange-50)",
  dotSize = "8px",
  className = "",
  as = "div",
  onClick,
}: HalftoneCardProps) {
  const Tag = as;

  return (
    <Tag
      onClick={onClick}
      className={`group relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          backgroundImage: `radial-gradient(${dotColor} 1px, transparent 1px)`,
          backgroundSize: `${dotSize} ${dotSize}`,
          backgroundColor: bgColor,
        }}
      />
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}