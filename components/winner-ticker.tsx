"use client";

import { Trophy } from "lucide-react";
import { winners } from "@/lib/data";
import { formatKz } from "@/lib/utils";

export function WinnerTicker() {
  const items = [...winners, ...winners];

  return (
    <div className="overflow-hidden bg-card/50 border-y border-border/50 py-2">
      <div className="flex ticker-animation whitespace-nowrap">
        {items.map((w, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-6 text-xs flex-shrink-0"
          >
            <Trophy className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <span className="text-foreground font-medium">{w.name}</span>
            <span className="text-primary font-bold">
              {formatKz(w.amount)}
            </span>
            <span className="text-muted-foreground">{w.game}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
