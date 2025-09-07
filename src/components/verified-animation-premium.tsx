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
    <div className="relative flex flex-col items-center justify-center min-h-[120vh]">
      {/* Confetti animation */}
      {isVisible && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <Lottie
            loop={false} // executa apenas 1 vez
            animationData={confettiJson}
            play
            style={{
              width: "1800px",
              height: "1800px",
              position: "absolute",
              top: "45%", // desloca mais para baixo
              left: "50%",
              transform: "translate(-50%, -50%)", // centraliza horizontal e verticalmente
              zIndex: 0,
            }}
          />
        </div>
      )}

      {/* Main check icon */}
      <div
        className={`relative z-10 transition-all duration-600 ease-out ${
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
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="h-32 w-32 bg-gradient-radial from-astro-purple/20 via-astro-cyan/10 to-transparent rounded-full animate-pulse" />
      </div>
    </div>
  );
}
