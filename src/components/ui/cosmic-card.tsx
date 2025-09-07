import { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CosmicCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  variant?: "default" | "premium" | "glass";
  hover?: boolean;
}

export function CosmicCard({ 
  children, 
  className, 
  variant = "default", 
  hover = true,
  ...props
}: CosmicCardProps) {
  return (
    <div
      className={cn(
        "rounded-cosmic p-6 transition-all duration-300",
        {
          "bg-astro-void border border-astro-nebula shadow-card": variant === "default",
          "bg-premium-gradient border border-astro-gold shadow-glow": variant === "premium",
          "glass border-astro-purple/30 shadow-cosmic": variant === "glass",
        },
        hover && "hover-lift",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}