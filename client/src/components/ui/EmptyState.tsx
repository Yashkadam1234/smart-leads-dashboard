import type { ReactNode } from "react";

import Button from "./Button";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div
      className="
        flex flex-col items-center
        justify-center
        rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        px-8 py-14
        text-center
      "
    >
      {/* Icon */}
      {icon && (
        <div
          className="
            mb-5
            flex h-20 w-20
            items-center justify-center
            rounded-full
            bg-cyan-500/10
            text-cyan-400
          "
        >
          {icon}
        </div>
      )}

      {/* Title */}
      <h2
        className="
          text-2xl
          font-bold
          text-white
          font-space
        "
      >
        {title}
      </h2>

      {/* Description */}
      <p
        className="
          mt-3
          max-w-md
          text-slate-400
        "
      >
        {description}
      </p>

      {/* CTA */}
      {actionLabel && onAction && (
        <div className="mt-6">
          <Button
            variant="primary"
            onClick={onAction}
          >
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}