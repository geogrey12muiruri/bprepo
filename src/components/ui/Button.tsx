import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  fullWidth?: boolean;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  fullWidth = false,
  target,
  rel,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-bold transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95";

  const variants = {
    primary:
      "bg-brand-blue text-white hover:bg-blue-900 shadow-lg shadow-brand-blue/20 hover:shadow-xl",
    secondary:
      "bg-brand-teal text-brand-blue hover:bg-teal-400 shadow-lg shadow-brand-teal/20",
    outline:
      "border-2 border-brand-blue text-brand-blue hover:bg-brand-blue/5",
    ghost: "text-brand-blue hover:bg-brand-blue/5",
  };

  const sizes = {
    sm: "text-xs px-4 py-2 uppercase tracking-wider",
    md: "text-sm px-6 py-3 uppercase tracking-widest",
    lg: "text-base px-8 py-4 uppercase tracking-[0.2em]",
  };

  const widthClass = fullWidth ? "w-full" : "";
  const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`;

  if (href) {
    return (
      <Link 
        href={href} 
        className={`${fullWidth ? "block w-full" : "inline-block"}`}
        target={target}
        rel={rel}
      >
        <button className={combinedClasses} {...props}>
          {children}
        </button>
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
