export const testimonials = [
  {
    name: "Maria F.",
    handle: "@maria_f",
    time: "ha 2 minutos",
    avatar: "M",
    message:
      "Ainda estou emocionada. Raspei, ganhei e recebi os 100.000 KZ sem complicacoes. Foi tudo muito rapido e simples. Quem tiver oportunidade, aproveite.",
    likes: 120,
  },
  {
    name: "Joao K.",
    handle: "@joao_k",
    time: "ha 5 minutos",
    avatar: "J",
    message:
      "No inicio pensei que fosse so conversa, mas resolvi tentar. Raspei, ganhei e o dinheiro caiu mesmo. Funcionou certinho. Recomendo.",
    likes: 98,
  },
  {
    name: "Ana P.",
    handle: "@ana_p",
    time: "ha 12 minutos",
    avatar: "A",
    message:
      "Obrigada pela seriedade. Em poucos minutos raspei, confirmei o premio e ja consegui levantar o valor. Valeu muito a pena.",
    likes: 156,
  },
  {
    name: "Carlos M.",
    handle: "@carlos_m",
    time: "ha 45 minutos",
    avatar: "C",
    message:
      "Nao pensei duas vezes. Raspei, ganhei os 100.000 KZ e ja levantei. E real e funciona mesmo.",
    likes: 203,
  },
  {
    name: "Helena S.",
    handle: "@helena_s",
    time: "ha 1 hora",
    avatar: "H",
    message:
      "Gostei muito da experiencia. Tudo claro, sem complicacao. Fiz tudo pelo telemovel e recebi o premio no mesmo dia.",
    likes: 87,
  },
  {
    name: "Paulo T.",
    handle: "@paulo_t",
    time: "ha 2 horas",
    avatar: "P",
    message:
      "Recomendo! Raspadinha simples, sem stress, e o premio sai de verdade. Fiquei muito satisfeito.",
    likes: 142,
  },
  {
    name: "Rosa L.",
    handle: "@rosa_l",
    time: "ha 3 horas",
    avatar: "R",
    message:
      "E verdadeiro sim. Raspei, ganhei e recebi. Aproveitem enquanto ainda esta disponivel.",
    likes: 175,
  },
  {
    name: "Fernando A.",
    handle: "@fernando_a",
    time: "ha 5 horas",
    avatar: "F",
    message:
      "Parabens pela iniciativa. Raspei, ganhei e fui pago sem problemas. Facil, rapido e confiavel.",
    likes: 91,
  },
];

export const winners = [
  { name: "Joao Pedro", amount: 12000, game: "Trevo" },
  { name: "Maria Silva", amount: 5000, game: "Mini Baza" },
  { name: "Carlos M.", amount: 50000, game: "Grande Baza" },
  { name: "Ana Costa", amount: 15000, game: "Baza Media" },
  { name: "Paulo Mendes", amount: 30000, game: "Grande Baza" },
  { name: "Rosa Santos", amount: 8000, game: "Mini Baza" },
];

export type GameTier = {
  id: string;
  name: string;
  subtitle: string;
  entry: number;
  maxPrize: number;
  chance: number;
  icon: string;
  popular?: boolean;
};

export const gameTiers: GameTier[] = [
  {
    id: "mini",
    name: "Mini Baza",
    subtitle: "Comeca pequeno, ganha grande",
    entry: 150,
    maxPrize: 15000,
    chance: 15,
    icon: "target",
  },
  {
    id: "media",
    name: "Baza Media",
    subtitle: "O favorito dos vencedores",
    entry: 400,
    maxPrize: 30000,
    chance: 20,
    icon: "star",
    popular: true,
  },
  {
    id: "grande",
    name: "Grande Baza",
    subtitle: "Kandengues enormes te esperam",
    entry: 1000,
    maxPrize: 100000,
    chance: 25,
    icon: "crown",
  },
];
