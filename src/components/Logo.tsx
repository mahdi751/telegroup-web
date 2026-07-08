type LogoProps = {
  theme?: "light" | "dark";
  className?: string;
  height?: number;
};

/**
 * theme "light"  → gold + white wordmark (use on dark backgrounds)
 * theme "dark"   → gold + black wordmark (use on light backgrounds)
 */
export default function Logo({ theme = "light", className, height = 44 }: LogoProps) {
  const src = theme === "light" ? "/logo-light.png" : "/logo-dark.png";
  return (
    <img
      src={src}
      alt="Telegroup Security — The Power to Protect"
      className={className}
      height={height}
      style={{ height, width: "auto" }}
      loading="eager"
      decoding="async"
    />
  );
}
