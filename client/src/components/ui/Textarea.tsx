import type {
  TextareaHTMLAttributes,
} from "react";

import type {
  FieldError,
  UseFormRegisterReturn,
} from "react-hook-form";

interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: FieldError;
  register?: UseFormRegisterReturn;
}

export default function Textarea({
  label,
  error,
  register,
  rows = 4,
  className = "",
  ...props
}: TextareaProps) {
  return (
    <div className="w-full">
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>

      <textarea
        rows={rows}
        {...register}
        {...props}
        className={`
          w-full
          resize-none
          rounded-xl
          border
          bg-[#0A0F1E]
          px-4 py-3
          text-white
          outline-none
          transition
          placeholder:text-slate-500
          focus:border-cyan-400/50
          focus:shadow-[0_0_20px_rgba(0,212,255,0.12)]
          ${
            error
              ? "border-red-500"
              : "border-white/10"
          }
          ${className}
        `}
      />

      {error && (
        <p className="mt-2 text-sm text-red-400">
          {error.message}
        </p>
      )}
    </div>
  );
}