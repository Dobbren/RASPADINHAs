"use client";

import { Target, Star, Crown, Zap, Clover } from "lucide-react";
import { useApp } from "@/lib/store";
import { formatKz } from "@/lib/utils";
import type { GameTier } from "@/lib/data";

const iconMap: Record<string, typeof Target> = {
  target: Target,
  star: Star,
  crown: Crown,
};

export function GameCard({ tier }: { tier: GameTier }) {
  const { setPage, setCurrentGame, balance, setBalance, setGamesPlayed, gamesPlayed } = useApp();
  const Icon = iconMap[tier.icon] || Target;

  const canPlay = balance >= tier.entry;

  function handlePlay() {
    if (!canPlay) return;
    setBalance(balance - tier.entry);
    setGamesPlayed(gamesPlayed + 1);
    setCurrentGame(tier.id);
    setPage("game");
  }

  return (
    <div
      className={`relative p-5 rounded-xl bg-card border transition-all ${
        tier.popular
          ? "border-primary/40 shadow-[0_0_20px_rgba(212,160,23,0.1)]"
          : "border-border/50 hover:border-primary/30"
      }`}
    >
      {tier.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full uppercase tracking-wider">
          Popular
        </div>
      )}

      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-foreground text-base">{tier.name}</h3>
          <p className="text-muted-foreground text-xs mt-0.5">
            {tier.subtitle}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="p-2 rounded-lg bg-secondary text-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
            Entrada
          </p>
          <p className="text-sm font-bold text-foreground mt-0.5">
            {formatKz(tier.entry)}
          </p>
        </div>
        <div className="p-2 rounded-lg bg-secondary text-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
            Premio ate
          </p>
          <p className="text-sm font-bold text-primary mt-0.5">
            {formatKz(tier.maxPrize)}
          </p>
        </div>
        <div className="p-2 rounded-lg bg-secondary text-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
            Chance
          </p>
          <div className="flex items-center justify-center gap-1 mt-0.5">
            <Clover className="w-3 h-3 text-success" />
            <p className="text-sm font-bold text-success">{tier.chance}%</p>
          </div>
        </div>
      </div>

      <button
        onClick={handlePlay}
        disabled={!canPlay}
        className={`mt-4 w-full py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all ${
          canPlay
            ? "bg-primary text-primary-foreground hover:brightness-110"
            : "bg-muted text-muted-foreground cursor-not-allowed"
        }`}
      >
        <Zap className="w-4 h-4" />
        {canPlay ? "Jogar Agora" : "Saldo Insuficiente"}
      </button>
    </div>
  );
}
