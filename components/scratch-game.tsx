"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowLeft, Wallet } from "lucide-react";
import { useApp } from "@/lib/store";
import { gameTiers } from "@/lib/data";
import { formatKz } from "@/lib/utils";

const SYMBOLS = ["💎", "🍀", "⭐", "🎯", "👑", "💰", "🔥", "🎲"];

function generateGrid(): string[][] {
  const grid: string[][] = [];
  // Pick a winning symbol
  const winSymbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
  // Create 3x3 grid, always make 3 matching (rigged to win)
  const positions = [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2],
  ];
  // Place 3 winning symbols randomly
  const shuffled = [...positions].sort(() => Math.random() - 0.5);
  const winPositions = new Set(
    shuffled.slice(0, 3).map((p) => `${p[0]}-${p[1]}`)
  );

  for (let r = 0; r < 3; r++) {
    grid[r] = [];
    for (let c = 0; c < 3; c++) {
      if (winPositions.has(`${r}-${c}`)) {
        grid[r][c] = winSymbol;
      } else {
        let sym;
        do {
          sym = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        } while (sym === winSymbol);
        grid[r][c] = sym;
      }
    }
  }
  return grid;
}

export function ScratchGame() {
  const { currentGame, setPage, balance, setBalance, setLastWin } = useApp();
  const tier = gameTiers.find((t) => t.id === currentGame) || gameTiers[0];

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [grid] = useState(() => generateGrid());
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [scratchPercent, setScratchPercent] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [winAmount] = useState(() => {
    const min = tier.entry * 2;
    const max = tier.maxPrize;
    return Math.floor((Math.random() * (max - min) + min) / 100) * 100;
  });
  const isDrawing = useRef(false);

  const CELL_SIZE = 90;
  const GAP = 8;
  const GRID_SIZE = CELL_SIZE * 3 + GAP * 2;

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = GRID_SIZE;
    canvas.height = GRID_SIZE;

    // Gold scratch layer
    ctx.fillStyle = "#d4a017";
    ctx.fillRect(0, 0, GRID_SIZE, GRID_SIZE);

    // Add subtle pattern
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    for (let i = 0; i < GRID_SIZE; i += 4) {
      for (let j = 0; j < GRID_SIZE; j += 4) {
        if ((i + j) % 8 === 0) {
          ctx.fillRect(i, j, 2, 2);
        }
      }
    }

    // Text
    ctx.fillStyle = "#0a0a0f";
    ctx.font = "bold 16px system-ui";
    ctx.textAlign = "center";
    ctx.fillText("RASPE AQUI", GRID_SIZE / 2, GRID_SIZE / 2 - 8);
    ctx.font = "12px system-ui";
    ctx.fillText("Encontre 3 iguais", GRID_SIZE / 2, GRID_SIZE / 2 + 12);
  }, [GRID_SIZE]);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  function scratch(x: number, y: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    // Check which cells are revealed
    const newRevealed = new Set(revealed);
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const cx = c * (CELL_SIZE + GAP) + CELL_SIZE / 2;
        const cy = r * (CELL_SIZE + GAP) + CELL_SIZE / 2;
        const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
        if (dist < CELL_SIZE / 2) {
          newRevealed.add(`${r}-${c}`);
        }
      }
    }
    setRevealed(newRevealed);

    // Calculate scratch percentage
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparent++;
    }
    const percent = (transparent / (canvas.width * canvas.height)) * 100;
    setScratchPercent(percent);

    if (percent >= 70 && !showResult) {
      setShowResult(true);
      setLastWin(winAmount);
      setBalance(balance + winAmount);
    }
  }

  function getPos(e: React.MouseEvent | React.TouchEvent) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  function handleStart(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    isDrawing.current = true;
    const { x, y } = getPos(e);
    scratch(x, y);
  }

  function handleMove(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    if (!isDrawing.current) return;
    const { x, y } = getPos(e);
    scratch(x, y);
  }

  function handleEnd() {
    isDrawing.current = false;
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
          <span className="font-bold text-foreground">{tier.name}</span>
          <div className="flex items-center gap-1 text-primary text-sm">
            <Wallet className="w-4 h-4" />
            <span className="font-bold">{formatKz(balance)}</span>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 pt-6 pb-12">
        {/* Game Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground">{tier.name}</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Raspe para encontrar 3 simbolos iguais e ganhar!
          </p>
          {scratchPercent < 70 && (
            <p className="text-xs text-accent mt-2">
              So mostra o resultado depois de revelar 70% das cartas
            </p>
          )}
        </div>

        {/* Scratch Card */}
        <div className="relative mx-auto rounded-2xl overflow-hidden border-2 border-primary/30 bg-secondary p-4"
          style={{ maxWidth: GRID_SIZE + 32 }}>
          {/* Symbol Grid (underneath) */}
          <div
            className="grid gap-2 mx-auto"
            style={{
              gridTemplateColumns: `repeat(3, ${CELL_SIZE}px)`,
              width: GRID_SIZE,
              height: GRID_SIZE,
            }}
          >
            {grid.flatMap((row, r) =>
              row.map((symbol, c) => (
                <div
                  key={`${r}-${c}`}
                  className="flex items-center justify-center rounded-lg bg-card border border-border/30 text-3xl"
                  style={{ width: CELL_SIZE, height: CELL_SIZE }}
                >
                  {symbol}
                </div>
              ))
            )}
          </div>

          {/* Canvas Overlay */}
          <canvas
            ref={canvasRef}
            className="absolute top-4 left-4 scratch-canvas rounded-lg"
            style={{
              width: GRID_SIZE,
              height: GRID_SIZE,
            }}
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
          />
        </div>

        {/* Progress */}
        <div className="mt-4 mx-auto" style={{ maxWidth: GRID_SIZE + 32 }}>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground">Progresso</span>
            <span className="text-primary font-medium">
              {Math.min(100, Math.round(scratchPercent))}%
            </span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, scratchPercent)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Result Modal */}
      {showResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4">
          <div className="w-full max-w-sm p-6 rounded-2xl bg-card border border-primary/30 text-center shadow-2xl shadow-primary/10">
            <p className="text-4xl">🎉</p>
            <h2 className="text-2xl font-bold text-foreground mt-3">
              Parabens!
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
              Voce ganhou
            </p>
            <p className="text-4xl font-bold text-primary mt-2 gold-shimmer">
              {formatKz(winAmount)}
            </p>
            <button
              onClick={() => setPage("dashboard")}
              className="mt-6 w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:brightness-110 transition-all"
            >
              CONTINUAR
            </button>
            <button
              onClick={() => setPage("withdraw")}
              className="mt-2 w-full py-3 bg-success text-success-foreground font-bold rounded-xl hover:brightness-110 transition-all"
            >
              LEVANTAR AGORA
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
