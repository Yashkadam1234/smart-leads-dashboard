import React from "react";

type SpinnerSize =
  | "sm"
  | "md"
  | "lg";

interface SpinnerProps {
  size?: SpinnerSize;
  color?: string;
}

const sizeClasses = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-[3px]",
  lg: "h-10 w-10 border-4",
};

export default function Spinner({
  size = "md",
  color = "#00D4FF",
}: SpinnerProps) {
  return (
    <div
      className={`
        animate-spin
        rounded-full
        border-solid
        border-transparent
        border-t-current
        ${sizeClasses[size]}
      `}
      style={{
        color,
      }}
    />
  );
}