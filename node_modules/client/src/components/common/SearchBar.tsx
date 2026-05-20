import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

import { useDebounce } from "../../hooks/useDebounce";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search by name or email...",
}: SearchBarProps) {
  const [localValue, setLocalValue] =
    useState(value);

  const debouncedValue =
    useDebounce(localValue, 400);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (debouncedValue !== value) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, value, onChange]);

  const clearSearch = (): void => {
    setLocalValue("");

    if (value !== "") {
      onChange("");
    }
  };

  return (
    <div className="relative w-full">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
      />

      <input
        value={localValue}
        onChange={(event) =>
          setLocalValue(event.target.value)
        }
        placeholder={placeholder}
        className="
          h-12 w-full rounded-2xl
          border border-white/10
          bg-white/5
          pl-11 pr-11
          text-white
          outline-none
          transition
          placeholder:text-slate-500
          focus:border-cyan-400/50
          focus:shadow-[0_0_25px_rgba(0,212,255,0.08)]
        "
      />

      {localValue && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}