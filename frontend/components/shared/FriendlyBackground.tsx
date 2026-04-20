import { cn } from "@/lib/utils";

interface FriendlyBackgroundProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export default function FriendlyBackground({
  children,
  className,
  contentClassName,
}: FriendlyBackgroundProps) {
  return (
    <div
      className={cn(
        "relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.18),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(244,114,182,0.14),transparent_50%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_60%,#f1f5f9_100%)] dark:bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(251,113,133,0.12),transparent_50%),linear-gradient(180deg,#0f172a_0%,#020617_80%,#0b1120_100%)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(125,211,252,0.7),transparent_60%)] blur-3xl opacity-70 animate-[float_12s_ease-in-out_infinite] dark:opacity-50" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(251,182,206,0.7),transparent_60%)] blur-3xl opacity-60 animate-[float_16s_ease-in-out_infinite] dark:opacity-40" />
        <div className="absolute left-1/2 top-24 h-24 w-24 -translate-x-1/2 rounded-3xl border border-white/60 bg-white/40 blur-sm animate-[float_10s_ease-in-out_infinite] dark:border-white/10 dark:bg-white/5" />
      </div>

      <div className={cn("relative z-10", contentClassName)}>{children}</div>
    </div>
  );
}
