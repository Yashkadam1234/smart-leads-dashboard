import { useState } from "react";
import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  Shield,
  LogOut,
  X,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

type NavItem = {
  label: string;
  path: string;
  icon: LucideIcon;
};

export default function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Leads",
      path: "/leads",
      icon: Users,
    },
    ...(user?.role === "admin"
      ? [
          {
            label: "User Mgmt",
            path: "/dashboard",
            icon: Shield,
          },
        ]
      : []),
  ];

  const initials =
    user?.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase() ?? "U";

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-[280px] flex-col
          border-r border-cyan-500/10
          bg-[#0D1326]
          transition-transform duration-300
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 shadow-lg shadow-cyan-500/20">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M13 2L4 14H11L9 22L20 9H13L13 2Z"
                  fill="white"
                />
              </svg>
            </div>

            <div>
              <h1 className="font-space text-xl font-bold text-white">
                LeadOS
              </h1>

              <p className="text-xs text-slate-500">
                Command Center
              </p>

              {user?.role === "admin" && (
                <div className="mt-2 inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-violet-300">
                  ADMIN
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            className="text-slate-400 lg:hidden"
            onClick={onClose}
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-5">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `
                      flex items-center gap-3
                      rounded-xl border-l-4
                      px-4 py-3
                      transition-all duration-200
                      ${
                        isActive
                          ? "border-cyan-400 bg-cyan-500/10 text-cyan-300"
                          : "border-transparent text-slate-400 hover:bg-slate-800/60 hover:text-white"
                      }
                    `
                  }
                >
                  <Icon size={18} />
                  <span className="font-medium">
                    {item.label}
                  </span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-slate-800 p-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 font-bold text-white">
                {initials}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold text-white">
                  {user?.name}
                </h3>

                <span
                  className={`
                    mt-1 inline-block rounded-full
                    px-2 py-1
                    text-[10px] font-mono
                    uppercase tracking-widest
                    ${
                      user?.role === "admin"
                        ? "bg-violet-500/20 text-violet-300"
                        : "bg-cyan-500/20 text-cyan-300"
                    }
                  `}
                >
                  {user?.role}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loading}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 py-2.5 text-red-300 transition hover:bg-red-500/20 disabled:opacity-60"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}