import { AlertTriangle } from "lucide-react";

import Button from "./Button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  message = "Something went wrong.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      className="
        flex flex-col items-center
        justify-center
        rounded-3xl
        border border-red-500/20
        bg-red-500/5
        backdrop-blur-xl
        px-8 py-14
        text-center
      "
    >
      {/* Error Icon */}
      <div
        className="
          mb-5
          flex h-20 w-20
          items-center justify-center
          rounded-full
          bg-red-500/10
          text-red-400
        "
      >
        <AlertTriangle size={38} />
      </div>

      {/* Title */}
      <h2
        className="
          text-2xl
          font-bold
          text-white
          font-space
        "
      >
        Something went wrong
      </h2>

      {/* Message */}
      <p
        className="
          mt-3
          max-w-md
          text-slate-400
        "
      >
        {message}
      </p>

      {/* Retry Button */}
      {onRetry && (
        <div className="mt-6">
          <Button
            variant="danger"
            onClick={onRetry}
          >
            Retry
          </Button>
        </div>
      )}
    </div>
  );
}