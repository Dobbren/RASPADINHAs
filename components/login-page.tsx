"use client";

import { Trophy, Shield, Zap, Users } from "lucide-react";
import { useApp } from "@/lib/store";
import { testimonials } from "@/lib/data";
import { TestimonialCard } from "./testimonial-card";
import { formatKz } from "@/lib/utils";

export function LoginPage() {
  const { setPage } = useApp();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,160,23,0.15),_transparent_60%)]" />
        <div className="relative max-w-lg mx-auto px-4 pt-12 pb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-primary text-xs font-medium">
              PremioKia
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight text-balance">
            Ganhe{" "}
            <span className="gold-shimmer">100.000 Kz</span>{" "}
            sem investir nada nessa plataforma
          </h1>

          <p className="text-muted-foreground mt-4 text-sm leading-relaxed max-w-sm mx-auto">
            A sua sorte esta aqui. Participe do sorteio e ganhe premios reais em Kwanzas.
          </p>

          <button
            onClick={() => setPage("dashboard")}
            className="mt-8 px-10 py-4 bg-primary text-primary-foreground font-bold text-lg rounded-xl hover:brightness-110 transition-all pulse-gold"
          >
            PARTICIPAR
          </button>

          {/* Stats */}
          <div className="mt-10 flex items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-4 h-4 text-success" />
              <span>100% Seguro</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Zap className="w-4 h-4 text-accent" />
              <span>Pagamento Rapido</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Users className="w-4 h-4 text-primary" />
              <span>{"+10k Jogadores"}</span>
            </div>
          </div>

          {/* Retrospective Banner */}
          <div className="mt-8 p-4 rounded-xl bg-card border border-primary/20">
            <div className="flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                Retrospectiva 2025
              </span>
            </div>
            <p className="text-xl font-bold text-primary mt-1">
              {formatKz(92102458)}
            </p>
            <p className="text-xs text-muted-foreground">
              pagos em premios
            </p>
          </div>

          {/* Bonus banner */}
          <div className="mt-4 p-4 rounded-xl bg-success/10 border border-success/20">
            <p className="text-sm font-semibold text-success">
              BONUS DE BOAS-VINDAS
            </p>
            <p className="text-foreground text-sm mt-1">
              Receba <span className="font-bold text-success">3.000 Kz</span> para comecar a jogar!
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-lg mx-auto px-4 pb-12">
        <h2 className="text-lg font-bold text-foreground mb-4">
          Veja o que quem ja participou tem a dizer!
        </h2>
        <div className="flex flex-col gap-3">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setPage("dashboard")}
            className="w-full py-4 bg-primary text-primary-foreground font-bold text-base rounded-xl hover:brightness-110 transition-all"
          >
            PARTICIPAR
          </button>
        </div>
      </section>
    </div>
  );
}
