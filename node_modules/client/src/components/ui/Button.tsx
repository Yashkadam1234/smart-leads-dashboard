import React from "react";
import Spinner from "./Spinner";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "ghost";

type ButtonSize =
  | "sm"
  | "md"
  | "lg";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variants = {
  primary:
    "bg-gradient-to-r from-cyan-400 to-violet-600 text-white shadow-[0_0_20px_rgba(0,212,255,0.25)] hover:shadow-[0_0_30px_rgba(124,58,237,0.45)]",

  secondary:
    "border border-cyan-500/40 bg-transparent text-cyan-300 hover:bg-cyan-500/10",

  danger:
    "bg-red-600 hover:bg-red-700 text-white",

  ghost:
    "bg-transparent text-slate-300 hover:bg-slate-800",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-6 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  fullWidth = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={
        disabled || isLoading
      }
      className={`
        relative
        rounded-xl
        font-medium
        transition-all
        duration-300
        flex
        items-center
        justify-center
        gap-2
        disabled:opacity-60
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner size="sm" />
          <span>
            Loading...
          </span>
        </>
      ) : (
        children
      )}
    </button>
  );
}