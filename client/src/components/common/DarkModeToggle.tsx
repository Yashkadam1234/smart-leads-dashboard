import { Moon, Sun } from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

export default function DarkModeToggle() {
  const { theme, toggleTheme } =
    useTheme();

  const isDark =
    theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      className="
        h-11 w-11
        rounded-xl
        border border-slate-700
        bg-slate-900/70
        text-slate-300
        transition-all
        duration-300
        hover:border-cyan-400/40
        hover:text-cyan-300
        focus:outline-none
        focus:ring-2
        focus:ring-cyan-400/40
      "
    >
      <span
        className="
          flex h-full w-full
          items-center justify-center
          transition-transform
          duration-300
          hover:scale-110
          active:rotate-180
        "
      >
        {isDark ? (
          <Sun size={18} />
        ) : (
          <Moon size={18} />
        )}
      </span>
    </button>
  );
}