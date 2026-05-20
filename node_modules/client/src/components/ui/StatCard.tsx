import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  color?: string;
  isLoading?: boolean;
  trend?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  color = "from-cyan-500 to-blue-500",
  isLoading = false,
  trend,
}: StatCardProps) {
  if (isLoading) {
    return (
      <div
        className="
          rounded-3xl
          border border-white/10
          bg-white/5
          backdrop-blur-xl
          p-6
          animate-pulse
        "
      >
        <div className="flex items-center justify-between">
          <div className="space-y-3 flex-1">
            <div className="h-3 w-24 rounded bg-slate-700" />
            <div className="h-8 w-20 rounded bg-slate-700" />
            <div className="h-3 w-16 rounded bg-slate-700" />
          </div>

          <div className="h-14 w-14 rounded-2xl bg-slate-700" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        p-6
        transition-all duration-300
        hover:border-cyan-400/30
        hover:shadow-[0_0_30px_rgba(0,212,255,0.08)]
      "
    >
      {/* Glow */}
      <div
        className={`
          absolute inset-0 opacity-10
          bg-gradient-to-br ${color}
        `}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p
            className="
              text-sm
              uppercase
              tracking-widest
              text-slate-400
              font-medium
            "
          >
            {title}
          </p>

          <h3
            className="
              mt-3
              text-4xl
              font-bold
              text-white
              font-space
            "
          >
            {value}
          </h3>

          {trend && (
            <p className="mt-2 text-sm text-cyan-400">
              {trend}
            </p>
          )}
        </div>

        <div
          className={`
            flex h-14 w-14
            items-center justify-center
            rounded-2xl
            bg-gradient-to-br
            ${color}
            text-white
            shadow-lg
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}