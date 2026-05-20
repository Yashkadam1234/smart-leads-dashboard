import { ChevronDown } from "lucide-react";

import type {
  FieldError,
} from "react-hook-form";

import type {
  ISelectOption,
} from "@shared/index";

interface SelectProps<T extends string> {
  label: string;
  options: ISelectOption[];
  value: T;
  onChange: (value: T) => void;
  error?: FieldError;
  placeholder?: string;
}

export default function Select<T extends string>({
  label,
  options,
  value,
  onChange,
  error,
  placeholder = "Select option",
}: SelectProps<T>) {
  return (
    <div className="w-full">
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(event) =>
            onChange(event.target.value as T)
          }
          className={`
            h-12 w-full
            appearance-none
            rounded-xl
            border
            bg-[#0A0F1E]
            px-4 pr-10
            text-white
            outline-none
            transition
            focus:border-cyan-400/50
            focus:shadow-[0_0_20px_rgba(0,212,255,0.12)]
            ${
              error
                ? "border-red-500"
                : "border-white/10"
            }
          `}
        >
          {placeholder && (
            <option value="">
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={18}
          className="
            pointer-events-none
            absolute right-4 top-1/2
            -translate-y-1/2
            text-slate-400
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