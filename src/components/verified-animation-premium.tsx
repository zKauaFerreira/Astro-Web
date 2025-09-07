import { useEffect, useState, useRef } from "react";
import { CheckCircle, Sparkles, Star, Zap, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";

export function VerifiedAnimationPremium() {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<HTMLDivElement>(null);
  const orbitsRef = useRef<HTMLDivElement>(null);
  const sparkleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const confettiRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (prefersReducedMotion) {
      setIsVisible(true);
      setShowConfetti(true);
      return;
    }

    const ctx = gsap.context(() => {
      // Entrada principal com sequência dramática
      const mainTl = gsap.timeline({ delay: 0.3 });
      
      // Animação do ícone principal
      mainTl.fromTo(checkRef.current, {
        scale: 0,
        opacity: 0,
        rotation: -90,
        filter: "blur(15px)",
        transformOrigin: "center"
      }, {
        scale: 1,
        opacity: 1,
        rotation: 0,
        filter: "blur(0px)",
        duration: 1.5,
        ease: "back.out(2)"
      });

      // Órbitas animadas
      mainTl.fromTo(orbitsRef.current, {
        scale: 0,
        opacity: 0
      }, {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out"
      }, "-=1");

      // Sparkles com stagger mais elaborado
      mainTl.fromTo(sparkleRefs.current, {
        scale: 0,
        opacity: 0,
        rotation: -180
      }, {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(2)",
        stagger: {
          amount: 0.6,
          from: "random"
        }
      }, "-=0.8");

      // Animações contínuas
      // Pulsação suave do check
      gsap.to(checkRef.current, {
        scale: 1.08,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });

      // Rotação das órbitas
      gsap.to(orbitsRef.current, {
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1
      });

      // Sparkles flutuando e girando
      sparkleRefs.current.forEach((sparkle, index) => {
        if (sparkle) {
          gsap.to(sparkle, {
            rotation: 360,
            duration: 4 + (index * 0.3),
            ease: "none",
            repeat: -1
          });
          
          gsap.to(sparkle, {
            y: -8 + Math.sin(index) * 3,
            x: Math.cos(index) * 2,
            duration: 3 + (index * 0.2),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
          });
        }
      });

    }, containerRef);

    // Mostrar elementos
    const timer1 = setTimeout(() => setIsVisible(true), 100);
    const timer2 = setTimeout(() => setShowConfetti(true), 800);
    
    // Confete contínuo com intervalo maior
    const confettiInterval = setInterval(() => {
      if (!prefersReducedMotion) {
        setShowConfetti(false);
        setTimeout(() => setShowConfetti(true), 150);
      }
    }, 12000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(confettiInterval);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative flex flex-col items-center justify-center py-16">
      {/* Sistema de confete aprimorado */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={`confetti-${i}`}
              ref={(el) => (confettiRefs.current[i] = el)}
              className="absolute"
              style={{
                left: `${15 + Math.random() * 70}%`,
                top: `${-15 + Math.random() * 25}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <div className="animate-[fall_3s_ease-out_forwards]">
                {i % 5 === 0 ? (
                  <Sparkles 
                    className="text-astro-purple drop-shadow-lg" 
                    size={6 + Math.random() * 6}
                  />
                ) : i % 5 === 1 ? (
                  <Star 
                    className="text-astro-cyan drop-shadow-lg" 
                    size={5 + Math.random() * 5}
                  />
                ) : i % 5 === 2 ? (
                  <Zap 
                    className="text-astro-gold drop-shadow-lg" 
                    size={4 + Math.random() * 4}
                  />
                ) : i % 5 === 3 ? (
                  <Circle 
                    className="text-astro-coral drop-shadow-lg" 
                    size={3 + Math.random() * 3}
                  />
                ) : (
                  <div 
                    className="rounded-full drop-shadow-lg"
                    style={{
                      width: `${2 + Math.random() * 4}px`,
                      height: `${2 + Math.random() * 4}px`,
                      background: i % 2 === 0 
                        ? "linear-gradient(45deg, hsl(var(--astro-purple)), hsl(var(--astro-cyan)))"
                        : "hsl(var(--astro-gold))"
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Órbitas cósmicas */}
      <div ref={orbitsRef} className="absolute inset-0 pointer-events-none">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Órbita externa */}
          <div className="absolute w-48 h-48 border border-astro-purple/20 rounded-full">
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
              <div className="w-2 h-2 bg-astro-purple rounded-full animate-pulse" />
            </div>
          </div>
          
          {/* Órbita média */}
          <div className="absolute w-36 h-36 border border-astro-cyan/25 rounded-full">
            <div className="absolute -right-1 top-1/2 transform -translate-y-1/2">
              <div className="w-1.5 h-1.5 bg-astro-cyan rounded-full animate-pulse" />
            </div>
          </div>
          
          {/* Órbita interna */}
          <div className="absolute w-24 h-24 border border-astro-gold/30 rounded-full">
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
              <div className="w-1 h-1 bg-astro-gold rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Sparkles em anel */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => {
          const angle = (i * 60) * Math.PI / 180;
          const radius = 100;
          return (
            <div
              key={`sparkle-${i}`}
              ref={(el) => (sparkleRefs.current[i] = el)}
              className="absolute"
              style={{
                left: `calc(50% + ${Math.cos(angle) * radius}px)`,
                top: `calc(50% + ${Math.sin(angle) * radius}px)`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <Sparkles 
                className={cn(
                  "drop-shadow-md transition-all duration-300",
                  i % 3 === 0 ? "text-astro-purple" : 
                  i % 3 === 1 ? "text-astro-cyan" : "text-astro-gold"
                )}
                size={8 + (i % 2) * 2}
              />
            </div>
          );
        })}
      </div>
      
      {/* Ícone principal verificado */}
      <div ref={checkRef} className="opacity-0 scale-0">
        <div className="relative">
          {/* Glow multicamadas */}
          <div className="absolute inset-0 bg-astro-cyan/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute inset-0 bg-astro-purple/15 rounded-full blur-2xl" />
          
          {/* Ícone principal */}
          <div className="relative p-4 rounded-full bg-gradient-to-br from-astro-space/80 via-astro-void/60 to-astro-space/80 backdrop-blur-sm border border-astro-cyan/30">
            <CheckCircle 
              className="h-20 w-20 text-astro-cyan filter drop-shadow-[0_0_25px_hsl(var(--astro-cyan))]" 
              strokeWidth={1.5}
            />
          </div>
          
          {/* Anel de glow rotativo */}
          <div 
            className="absolute inset-0 rounded-full bg-gradient-to-r from-astro-purple/10 via-transparent via-astro-cyan/10 to-transparent"
            style={{ 
              animation: "spin 12s linear infinite",
              background: "conic-gradient(from 0deg, transparent 0%, rgba(138,79,255,0.2) 20%, transparent 40%, rgba(78,205,196,0.2) 60%, transparent 80%, rgba(138,79,255,0.2) 100%)"
            }}
          />
        </div>
      </div>

      {/* Efeitos de fundo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-56 w-56 bg-gradient-radial from-astro-purple/8 via-astro-cyan/4 to-transparent rounded-full animate-pulse" />
        <div className="absolute h-32 w-32 bg-gradient-radial from-astro-gold/6 via-transparent to-transparent rounded-full" />
      </div>
    </div>
  );
}