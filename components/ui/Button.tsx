"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses =
    "px-12 py-2 rounded-full transition-colors font-medium shadow-md font-body";

  const variantClasses = {
    primary: "bg-main-green text-main-beige hover:bg-oxide",
    secondary:
      "bg-main-beige text-oxide border-2 border-oxide hover:bg-bg-beige",
  };

  const combinedClasses =
    `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
