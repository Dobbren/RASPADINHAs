"use client";

import { useState, useEffect } from "react";
import {
  Trophy,
  Wallet,
  Gamepad2,
  Flame,
  ChevronRight,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { gameTiers } from "@/lib/data";
import { formatKz } from "@/lib/utils";
import { WinnerTicker } from "./winner-ticker";
import { GameCard } from "./game-card";

export function DashboardPage() {
  const { balance, gamesPlayed, setPage } = useApp();
  const [showBonus, setShowBonus] = useState(false);
  const [onlineCount] = useState(234);
  const [recentWins] = useState(67);

  useEffect(() => {
    if (balance === 3000 && gamesPlayed === 0) {
      const timer = setTimeout(() => setShowBonus(true), 800);
      return () => clearTimeout(timer);
    }
  }, [balance, gamesPlayed]);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            <span className="font-bold text-foreground">PremioKia</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border/50">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
              Saldo
            </span>
            <span className="font-bold text-primary text-sm">
              {formatKz(balance)}
            </span>
          </div>
        </div>
      </header>

      {/* Winner Ticker */}
      <WinnerTicker />

      {/* Stats Row */}
      <div className="max-w-lg mx-auto px-4 mt-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-card border border-border/50">
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">
                Saldo Total
              </span>
            </div>
            <p className="text-xl font-bold text-foreground mt-1">
              {formatKz(balance)}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border/50">
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground">
                Jogos Feitos
              </span>
            </div>
            <p className="text-xl font-bold text-foreground mt-1">
              {gamesPlayed}
            </p>
          </div>
        </div>
      </div>

      {/* Online Players */}
      <div className="max-w-lg mx-auto px-4 mt-4">
        <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20">
          <Flame className="w-4 h-4 text-destructive" />
          <span className="text-sm text-foreground">
            <strong>{onlineCount} Jogadores</strong>{" "}
            <span className="text-muted-foreground">
              online &bull; {recentWins} ganharam ultimos 10 min
            </span>
          </span>
        </div>
      </div>

      {/* Game Tiers */}
      <div className="max-w-lg mx-auto px-4 mt-6">
        <div className="flex flex-col gap-4">
          {gameTiers.map((tier) => (
            <GameCard key={tier.id} tier={tier} />
          ))}
        </div>
      </div>

      {/* Withdraw Button */}
      {balance > 3000 && (
        <div className="max-w-lg mx-auto px-4 mt-6">
          <button
            onClick={() => setPage("withdraw")}
            className="w-full py-4 rounded-xl bg-success text-success-foreground font-bold text-base flex items-center justify-center gap-2 hover:brightness-110 transition-all"
          >
            <Wallet className="w-5 h-5" />
            LEVANTAR {formatKz(balance)}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Bonus Modal */}
      {showBonus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4">
          <div className="w-full max-w-sm p-6 rounded-2xl bg-card border border-primary/30 text-center shadow-2xl shadow-primary/10">
            <p className="text-3xl">🎉</p>
            <h2 className="text-xl font-bold text-foreground mt-3">
              Parabens!
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
              Voce acabou de ganhar
            </p>
            <p className="text-3xl font-bold text-primary mt-2">3.000 KZ</p>
            <p className="text-muted-foreground text-sm mt-1">
              para comecar agora mesmo.
            </p>
            <button
              onClick={() => setShowBonus(false)}
              className="mt-6 w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:brightness-110 transition-all"
            >
              COMECAR
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
