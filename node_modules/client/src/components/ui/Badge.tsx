import type {
  LeadStatus,
  LeadSource,
} from "@shared/index";

type BadgeVariant = "status" | "source";

interface BadgeProps {
  status: LeadStatus | LeadSource | string;
  variant?: BadgeVariant;
}

const statusClasses: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-300 border-blue-500/30",
  contacted: "bg-yellow-500/10 text-yellow-300 border-yellow-500/30",
  qualified: "bg-green-500/10 text-green-300 border-green-500/30",
  lost: "bg-red-500/10 text-red-300 border-red-500/30",
};

const sourceClasses: Record<string, string> = {
  website: "bg-purple-500/10 text-purple-300 border-purple-500/30",
  instagram: "bg-pink-500/10 text-pink-300 border-pink-500/30",
  referral: "bg-orange-500/10 text-orange-300 border-orange-500/30",
};

export default function Badge({
  status,
  variant = "status",
}: BadgeProps) {
  const key = String(status).toLowerCase();

  const className =
    variant === "source"
      ? sourceClasses[key]
      : statusClasses[key];

  return (
    <span
      className={`
        inline-flex items-center
        rounded-full border
        px-3 py-1
        text-[11px]
        font-mono
        uppercase
        tracking-wider
        ${className ?? "bg-slate-500/10 text-slate-300 border-slate-500/30"}
      `}
    >
      {status}
    </span>
  );
}