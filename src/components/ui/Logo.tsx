import Link from "next/link";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const textColor = variant === "light" ? "text-cream" : "text-charcoal";

  return (
    <Link href="/" className={`inline-flex flex-col leading-none ${className}`}>
      <span
        className={`font-heading font-bold text-2xl tracking-[0.15em] ${textColor}`}
      >
        EVERWOOD
      </span>
      <span
        className={`font-body text-[0.65rem] font-medium uppercase tracking-[0.35em] ${textColor} opacity-70`}
      >
        SAUNA
      </span>
    </Link>
  );
}
