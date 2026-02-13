"use client";

import { useState, type ReactNode } from "react";
import { AppContext, type AppPage } from "@/lib/store";

export function AppProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<AppPage>("login");
  const [balance, setBalance] = useState(3000);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [lastWin, setLastWin] = useState(0);

  return (
    <AppContext.Provider
      value={{
        page,
        balance,
        gamesPlayed,
        currentGame,
        lastWin,
        setPage,
        setBalance,
        setGamesPlayed,
        setCurrentGame,
        setLastWin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
