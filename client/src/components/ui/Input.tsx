import React from "react";
import {
  FieldError,
  UseFormRegisterReturn,
} from "react-hook-form";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  register?: UseFormRegisterReturn;
}

export default function Input({
  label,
  error,
  register,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      <label className="mb-2 block text-sm text-slate-300 font-medium">
        {label}
      </label>

      <div className="relative">
        <input
          {...register}
          {...props}
          className={`
            peer
            w-full
            bg-white/5
            border
            border-white/10
            rounded-xl
            px-4
            py-3
            text-white
            outline-none
            transition-all
            duration-300
            placeholder:text-slate-500
            focus:border-cyan-400
            focus:shadow-[0_0_20px_rgba(0,212,255,0.15)]
            ${error ? "border-red-500" : ""}
            ${className}
          `}
        />

        <div
          className="
            absolute
            left-0
            bottom-0
            h-[2px]
            w-0
            bg-cyan-400
            transition-all
            duration-300
            peer-focus:w-full
          "
        />
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-400">
          {error.message}
        </p>
      )}
    </div>
  );
}