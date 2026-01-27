import React, { type ReactNode } from "react";

type CardProps = {
  readonly children: ReactNode;
  readonly className?: string;
  readonly asLink?: boolean;
  readonly href?: string;
};

export function Card({
  children,
  className = "",
  asLink = false,
  href,
}: CardProps) {
  const baseStyles =
    "rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 bg-white";

  if (asLink && href) {
    return (
      <a href={href} className={`${baseStyles} block ${className}`}>
        {children}
      </a>
    );
  }

  return <div className={`${baseStyles} ${className}`}>{children}</div>;
}
