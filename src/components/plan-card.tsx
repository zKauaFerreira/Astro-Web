import { ReactNode } from "react";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CosmicCard } from "@/components/ui/cosmic-card";
import { cn } from "@/lib/utils";

interface PlanCardProps {
  title: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
  onSelect: () => void;
  className?: string;
}

export function PlanCard({
  title,
  price,
  originalPrice,
  discount,
  features,
  isPopular = false,
  ctaText,
  onSelect,
  className
}: PlanCardProps) {
  return (
    <div className={cn("relative", className)}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="bg-gradient-to-r from-astro-gold via-astro-gold to-astro-gold/95 px-6 py-2.5 rounded-full flex items-center space-x-2 shadow-[0_4px_20px_rgba(247,184,1,0.5)] border-2 border-astro-white/90 backdrop-blur-sm">
            <Star className="h-4 w-4 text-astro-space fill-current drop-shadow-sm" />
            <span className="text-sm font-bold text-astro-space drop-shadow-sm whitespace-nowrap">Mais Popular</span>
          </div>
        </div>
      )}
      
      <CosmicCard 
        variant={isPopular ? "premium" : "default"}
        className={cn(
          "relative text-center space-y-6 pt-10 overflow-visible",
          isPopular && "scale-105 shadow-glow border-astro-gold/30"
        )}
      >
        {/* Plan title */}
        <div>
          <h3 className="text-cosmic-sm text-astro-white font-space font-bold">
            {title}
          </h3>
        </div>

        {/* Pricing */}
        <div className="space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-4xl md:text-5xl font-space font-bold text-astro-white">
              {price}
            </span>
          </div>
          
          {originalPrice && (
            <div className="flex items-center justify-center space-x-2">
              <span className="text-lg text-astro-muted line-through">
                {originalPrice}
              </span>
              {discount && (
                <span className="text-sm font-semibold text-astro-gold bg-astro-gold/20 px-2 py-1 rounded-full">
                  {discount}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Features */}
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <Check className="h-5 w-5 text-astro-cyan" />
              </div>
              <span className="text-astro-light text-left">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Button
          variant={isPopular ? "cosmic" : "cosmic"}
          size="lg"
          className={cn(
            "w-full transition-all duration-300",
            isPopular && "bg-gradient-to-r from-astro-purple to-astro-cyan hover:from-astro-purple/90 hover:to-astro-cyan/90 text-astro-white shadow-[0_0_20px_rgba(138,79,255,0.3)]"
          )}
          onClick={onSelect}
        >
          {ctaText}
        </Button>
      </CosmicCard>
    </div>
  );
}