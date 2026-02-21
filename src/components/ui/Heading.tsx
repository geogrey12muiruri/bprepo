import React, { type ReactNode } from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

type HeadingProps = {
  readonly level: HeadingLevel;
  readonly children: ReactNode;
  readonly size?: HeadingSize;
  readonly className?: string;
  readonly id?: string;
};

const sizeStyles: Record<HeadingSize, string> = {
  xs: "text-xs sm:text-sm font-semibold",
  sm: "text-sm sm:text-base font-semibold",
  md: "text-base sm:text-lg font-bold",
  lg: "text-lg sm:text-xl font-bold",
  xl: "text-xl sm:text-2xl font-bold",
  "2xl": "text-2xl sm:text-3xl md:text-4xl font-bold",
  "3xl": "text-3xl sm:text-4xl md:text-5xl font-bold",
};

export function Heading({
  level,
  children,
  size = "md",
  className = "",
  id,
}: HeadingProps) {
  const HeadingTag = level;
  const baseStyles = "text-neutral-900 leading-tight";

  return (
    <HeadingTag
      id={id}
      className={`${baseStyles} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </HeadingTag>
  );
}
