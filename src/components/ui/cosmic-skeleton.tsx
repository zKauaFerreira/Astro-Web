import { cn } from "@/lib/utils";

interface CosmicSkeletonProps {
  className?: string;
  variant?: "default" | "card" | "text";
}

export function CosmicSkeleton({ className, variant = "default" }: CosmicSkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-astro-nebula rounded",
        {
          "h-4 w-full": variant === "default",
          "h-32 w-full rounded-cosmic": variant === "card",
          "h-6 w-3/4": variant === "text",
        },
        className
      )}
    >
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-astro-light/10 to-transparent animate-shimmer" />
    </div>
  );
}