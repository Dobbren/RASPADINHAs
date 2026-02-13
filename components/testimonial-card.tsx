"use client";

import { ThumbsUp, MessageCircle } from "lucide-react";

type TestimonialCardProps = {
  name: string;
  handle: string;
  time: string;
  avatar: string;
  message: string;
  likes: number;
};

export function TestimonialCard({
  name,
  handle,
  time,
  avatar,
  message,
  likes,
}: TestimonialCardProps) {
  return (
    <div className="flex gap-3 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
        {avatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-foreground text-sm">{name}</span>
          <span className="text-muted-foreground text-xs">{handle}</span>
          <span className="text-muted-foreground text-xs">{"  "}  {time}</span>
        </div>
        <p className="text-card-foreground text-sm mt-1 leading-relaxed">
          {message}
        </p>
        <div className="flex items-center gap-4 mt-2">
          <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors text-xs">
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>{likes}</span>
          </button>
          <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors text-xs">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Responder</span>
          </button>
        </div>
      </div>
    </div>
  );
}
