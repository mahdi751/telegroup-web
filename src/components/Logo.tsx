import { useTheme } from "../theme/ThemeContext";

type LogoProps = {
  variant?: "on-dark" | "on-light";
  className?: string;
  height?: number;
};

export default function Logo({ variant, className, height = 44 }: LogoProps) {
  const { theme } = useTheme();
  const resolved = variant ?? (theme === "dark" ? "on-dark" : "on-light");
  const src = resolved === "on-dark" ? "/logo-light.png" : "/logo-dark.png";
  return (
    <img
      src={src}
      alt="Telegroup Security"
      className={className}
      height={height}
      style={{ height, width: "auto" }}
      loading="eager"
      decoding="async"
    />
  );
}
