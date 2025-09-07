import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import Lottie from "react-lottie-player";
import confettiJson from "@/assets/lottie/confetti.json"; // JSON de confetes

export function VerifiedAnimationPremium() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center py-16">
      {/* Confetti animation */}
      {isVisible && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-full">
            <Lottie
              loop={false} // Executa apenas uma vez
              animationData={confettiJson}
              play
              style={{
                width: "150%",  // escala maior que a tela
                height: "150%", // escala maior que a tela
                maxWidth: "none",
                maxHeight: "none",
                transform: "translate(-25%, -25%)", // centraliza a animação
              }}
            />
          </div>
        </div>
      )}

      {/* Main check icon */}
      <div
        className={`transition-all duration-600 ease-out ${
          isVisible
            ? "opacity-100 scale-100 animate-bounce-celebrate"
            : "opacity-0 scale-50"
        }`}
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
