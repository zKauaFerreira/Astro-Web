import { useEffect, useState } from "react";
import { CheckCircle, Sparkles } from "lucide-react";

export function VerifiedAnimationPremium() {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setIsVisible(true), 200);
    const timer2 = setTimeout(() => setShowConfetti(true), 400);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center py-16">
      {/* Confetti particles - sempre visíveis após iniciar */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 1}s`,
                animationDuration: `${1.5 + Math.random() * 1}s`,
              }}
            >
              <Sparkles 
                className="text-astro-gold" 
                size={Math.random() * 12 + 8}
              />
            </div>
          ))}
        </div>
      )}
      
      {/* Main check icon */}
      <div
        className={
          "transition-all duration-600 ease-out " +
          (isVisible 
            ? "opacity-100 scale-100 animate-bounce-celebrate" 
            : "opacity-0 scale-50")
        }
      >
        <div className="relative">
          <div className="absolute inset-0 bg-astro-purple rounded-full blur-xl opacity-30 animate-pulse" />
          <CheckCircle className="relative h-24 w-24 text-astro-cyan drop-shadow-glow" />
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-32 w-32 bg-gradient-radial from-astro-purple/20 via-astro-cyan/10 to-transparent rounded-full animate-pulse" />
      </div>
    </div>
  );
}
