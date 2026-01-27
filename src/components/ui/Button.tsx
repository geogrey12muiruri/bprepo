"use client";

import React, { type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  readonly children: ReactNode;
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly disabled?: boolean;
  readonly onClick?: () => void;
  readonly type?: "button" | "submit" | "reset";
  readonly className?: string;
  readonly ariaLabel?: string;
  readonly id?: string;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-teal-500 text-white hover:bg-teal-600 active:bg-teal-700 disabled:bg-gray-300",
  secondary:
    "bg-white text-teal-600 border-2 border-teal-500 hover:bg-teal-50 active:bg-teal-100 disabled:border-gray-300 disabled:text-gray-400",
  tertiary:
    "bg-transparent text-teal-600 hover:bg-teal-50 active:bg-teal-100 disabled:text-gray-400",
  danger:
    "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 disabled:bg-gray-300",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-sm rounded-lg",
  md: "px-4 py-3 text-base rounded-lg",
  lg: "px-6 py-4 text-lg rounded-lg",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  type = "button",
  className = "",
  ariaLabel,
  id,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:cursor-not-allowed min-h-11 min-w-11";

  return (
    <button
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
