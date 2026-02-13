"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Wallet,
  Smartphone,
  Building2,
  Loader2,
  CheckCircle2,
  Play,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { formatKz } from "@/lib/utils";

type WithdrawStep = "choose" | "processing" | "video";

export function WithdrawPage() {
  const { balance, setPage } = useApp();
  const [step, setStep] = useState<WithdrawStep>("choose");
  const [method, setMethod] = useState<"multicaixa" | "bank" | null>(null);

  function handleConfirm() {
    if (!method) return;
    setStep("processing");
    setTimeout(() => {
      setStep("video");
    }, 3000);
  }

  if (step === "processing") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <Loader2 className="w-12 h-12 text-primary mx-auto animate-spin" />
          <h2 className="text-xl font-bold text-foreground mt-4">
            Processando o seu pedido...
          </h2>
          <p className="text-muted-foreground text-sm mt-2">
            Isso pode levar alguns segundos, nao feche esta pagina.
          </p>
        </div>
      </div>
    );
  }

  if (step === "video") {
    return (
      <div className="min-h-screen bg-background px-4 py-12">
        <div className="max-w-lg mx-auto text-center">
          <CheckCircle2 className="w-16 h-16 text-success mx-auto" />
          <h2 className="text-xl font-bold text-foreground mt-4">
            ASSISTA O VIDEO ABAIXO PARA VER COMO RECEBER O SEU DINHEIRO AGORA
            MESMO
          </h2>

          {/* Video placeholder */}
          <div className="mt-6 aspect-video rounded-xl bg-card border border-border/50 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <Play className="w-8 h-8 text-primary ml-1" />
              </div>
              <p className="text-muted-foreground text-sm mt-3">
                Toque para reproduzir
              </p>
            </div>
          </div>

          <button
            onClick={() => setPage("dashboard")}
            className="mt-8 w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:brightness-110 transition-all"
          >
            PAGAR A TAXA
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setPage("dashboard")}
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          <span className="font-bold text-foreground">Levantar</span>
          <div className="w-12" />
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 pt-8 pb-12">
        {/* Ready banner */}
        <div className="p-6 rounded-2xl bg-card border border-primary/30 text-center">
          <Wallet className="w-10 h-10 text-primary mx-auto" />
          <h2 className="text-lg font-bold text-foreground mt-3">Pronto!</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Ja pode levantar o seu dinheiro agora
          </p>
        </div>

        {/* Method Selection */}
        <div className="mt-8">
          <h3 className="text-base font-bold text-foreground mb-1">
            ESCOLHA POR ONDE QUER RECEBER O SEU SAQUE:
          </h3>
          <div className="mt-1 p-3 rounded-xl bg-secondary">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Valor disponivel para saque
            </p>
            <p className="text-2xl font-bold text-primary mt-1">
              {formatKz(balance)}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => setMethod("multicaixa")}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
              method === "multicaixa"
                ? "border-primary bg-primary/5"
                : "border-border/50 bg-card hover:border-primary/30"
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Smartphone className="w-6 h-6 text-primary" />
            </div>
            <div className="text-left">
              <p className="font-bold text-foreground">Multicaixa Express</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Receba via Multicaixa Express
              </p>
            </div>
            {method === "multicaixa" && (
              <CheckCircle2 className="w-5 h-5 text-primary ml-auto flex-shrink-0" />
            )}
          </button>

          <button
            onClick={() => setMethod("bank")}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
              method === "bank"
                ? "border-primary bg-primary/5"
                : "border-border/50 bg-card hover:border-primary/30"
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <div className="text-left">
              <p className="font-bold text-foreground">
                Transferencia Bancaria
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Receba via transferencia bancaria
              </p>
            </div>
            {method === "bank" && (
              <CheckCircle2 className="w-5 h-5 text-primary ml-auto flex-shrink-0" />
            )}
          </button>
        </div>

        <button
          onClick={handleConfirm}
          disabled={!method}
          className={`mt-8 w-full py-4 rounded-xl font-bold text-base transition-all ${
            method
              ? "bg-success text-success-foreground hover:brightness-110"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          CONCLUIR SAQUE
        </button>
      </div>
    </div>
  );
}
