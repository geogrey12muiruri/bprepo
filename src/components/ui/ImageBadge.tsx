import React from "react";

type BadgeTone = "info" | "warning" | "success";

export type ImageBadgeData = {
  readonly text: string;
  readonly tone?: BadgeTone;
};

function toneClasses(tone: BadgeTone) {
  switch (tone) {
    case "success":
      return "bg-emerald-500/95 text-white";
    case "warning":
      return "bg-amber-500/95 text-white";
    case "info":
    default:
      return "bg-teal-500/95 text-white";
  }
}

export function ImageBadge({
  badge,
  className = "",
}: {
  badge?: ImageBadgeData;
  className?: string;
}) {
  if (!badge?.text) return null;

  return (
    <div
      className={[
        "inline-flex items-center rounded-full px-3 py-1",
        "text-[10px] font-black uppercase tracking-wider shadow-lg",
        "ring-1 ring-white/10",
        toneClasses(badge.tone ?? "info"),
        className,
      ].join(" ")}
    >
      {badge.text}
    </div>
  );
}

