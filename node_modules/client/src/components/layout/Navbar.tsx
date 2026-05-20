import { Menu, ChevronDown } from "lucide-react";
import { useState } from "react";

import { useAuth } from "../../context/AuthContext";
import DarkModeToggle from "../common/DarkModeToggle";

interface NavbarProps {
  title: string;
  onMenuClick: () => void;
}

export default function Navbar({
  title,
  onMenuClick,
}: NavbarProps) {
  const { user, logout } = useAuth();

  const [dropdownOpen, setDropdownOpen] =
    useState(false);

  const initials =
    user?.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase() ?? "U";

  return (
    <header
      className="
        sticky top-0 z-30
        border-b border-slate-800
        bg-[#0A0F1E]/80
        backdrop-blur-xl
      "
    >
      <div
        className="
          flex items-center
          justify-between
          px-4 py-4
          lg:px-8
        "
      >
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="text-slate-300 lg:hidden"
            type="button"
          >
            <Menu size={24} />
          </button>

          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Command Center
            </p>

            <h1 className="font-space text-2xl font-bold text-white">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <DarkModeToggle />

          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setDropdownOpen(
                  !dropdownOpen
                )
              }
              className="
                flex items-center gap-3
                rounded-xl
                border border-slate-700
                bg-slate-900/70
                px-3 py-2
                transition
                hover:border-cyan-400/30
              "
            >
              <div
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-full
                  bg-gradient-to-br
                  from-cyan-500
                  to-violet-500
                  text-sm font-bold
                  text-white
                "
              >
                {initials}
              </div>

              <div className="hidden text-left sm:block">
                <p className="text-sm font-medium text-white">
                  {user?.name}
                </p>

                <p className="text-xs uppercase text-slate-400">
                  {user?.role}
                </p>
              </div>

              <ChevronDown
                size={16}
                className="text-slate-400"
              />
            </button>

            {dropdownOpen && (
              <div
                className="
                  absolute right-0 mt-3
                  w-52 overflow-hidden
                  rounded-2xl
                  border border-slate-800
                  bg-[#111827]
                  shadow-2xl
                "
              >
                <div className="border-b border-slate-800 p-4">
                  <p className="text-sm font-medium text-white">
                    {user?.name}
                  </p>

                  <p className="text-xs text-slate-400">
                    {user?.email}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={logout}
                  className="
                    w-full px-4 py-3
                    text-left text-red-400
                    transition
                    hover:bg-red-500/10
                  "
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}