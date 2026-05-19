import React, { type ReactNode } from "react";

type ContainerProps = {
  readonly children: ReactNode;
  readonly className?: string;
};

export function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div className={`container-responsive ${className}`}>
      {children}
    </div>
  );
}
