"use client";

import { createContext, useContext } from "react";

export type AppPage =
  | "login"
  | "dashboard"
  | "game"
  | "result"
  | "withdraw"
  | "processing"
  | "video";

export type AppState = {
  page: AppPage;
  balance: number;
  gamesPlayed: number;
  currentGame: string | null;
  lastWin: number;
  setPage: (page: AppPage) => void;
  setBalance: (balance: number) => void;
  setGamesPlayed: (count: number) => void;
  setCurrentGame: (game: string | null) => void;
  setLastWin: (amount: number) => void;
};

export const AppContext = createContext<AppState | null>(null);

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
