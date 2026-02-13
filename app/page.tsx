"use client";

import { useApp } from "@/lib/store";
import { AppProvider } from "@/components/app-provider";
import { LoginPage } from "@/components/login-page";
import { DashboardPage } from "@/components/dashboard-page";
import { ScratchGame } from "@/components/scratch-game";
import { WithdrawPage } from "@/components/withdraw-page";

function AppContent() {
  const { page } = useApp();

  switch (page) {
    case "login":
      return <LoginPage />;
    case "dashboard":
      return <DashboardPage />;
    case "game":
      return <ScratchGame />;
    case "withdraw":
    case "processing":
    case "video":
      return <WithdrawPage />;
    default:
      return <LoginPage />;
  }
}

export default function Home() {
  return (
    <AppProvider>
      <main className="min-h-screen">
        <AppContent />
      </main>
    </AppProvider>
  );
}
