import { useEffect, useRef, useState } from "react";
import { CheckCircle, Sparkles, Star, Zap, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";

export function VerifiedAnimationLottie() {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const sparkleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const confettiRefs = useRef<(HTMLDivElement | null)[]>([]);
  const successIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (prefersReducedMotion) {
      setIsVisible(true);
      setShowConfetti(true);
      return;
    }

    const ctx = gsap.context(() => {
      // Main success animation sequence
      const mainTl = gsap.timeline({ delay: 0.5 });
      
      // Dramatic check icon entrance with multiple effects
      mainTl.fromTo(successIconRef.current, {
        scale: 0,
        opacity: 0,
        rotation: -360,
        filter: "blur(20px) brightness(0.5)",
        y: 50
      }, {
        scale: 1,
        opacity: 1,
        rotation: 0,
        filter: "blur(0px) brightness(1)",
        y: 0,
        duration: 2,
        ease: "back.out(2)"
      })
      
      // Enhanced glow effect with multiple layers
      .fromTo(glowRef.current, {
        scale: 0.3,
        opacity: 0,
        filter: "blur(30px)"
      }, {
        scale: 2,
        opacity: 1,
        filter: "blur(20px)",
        duration: 1.5,
        ease: "power2.out"
      }, "-=1.5")
      
      // Sparkles with enhanced timing and effects
      .fromTo(sparkleRefs.current, {
        scale: 0,
        opacity: 0,
        rotation: 0,
        y: 20,
        filter: "blur(5px)"
      }, {
        scale: 1,
        opacity: 1,
        rotation: 360,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "back.out(2)",
        stagger: {
          amount: 0.6,
          from: "random"
        }
      }, "-=1.0");

      // Continuous success celebration animations
      // Enhanced check pulse with glow
      gsap.to(successIconRef.current, {
        scale: 1.1,
        filter: "drop-shadow(0 0 30px rgba(78, 205, 196, 0.8))",
        duration: 2.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      // Multi-layer glow breathing effect
      gsap.to(glowRef.current, {
        opacity: 0.3,
        scale: 2.5,
        filter: "blur(40px)",
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      // Enhanced sparkles continuous animations
      sparkleRefs.current.forEach((sparkle, index) => {
        if (sparkle) {
          // Individual rotation with varying speeds
          gsap.to(sparkle, {
            rotation: 360,
            duration: 4 + (index * 0.5),
            ease: "none",
            repeat: -1
          });
          
          // Complex floating movement
          gsap.to(sparkle, {
            y: -15 + Math.sin(index) * 5,
            x: Math.cos(index) * 8,
            scale: 1.1,
            duration: 3 + (index * 0.3),
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1
          });

          // Sparkle opacity breathing
          gsap.to(sparkle, {
            opacity: 0.6,
            duration: 2 + (index * 0.2),
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1
          });
        }
      });

      // Success confirmation animation (check mark drawing effect)
      const checkMark = checkRef.current;
      if (checkMark) {
        gsap.set(checkMark, { drawSVG: "0%" });
        gsap.to(checkMark, {
          drawSVG: "100%",
          duration: 1.5,
          ease: "power2.out",
          delay: 1
        });
      }

    }, containerRef);

    // Set visibility and start confetti
    const timer1 = setTimeout(() => setIsVisible(true), 200);
    const timer2 = setTimeout(() => setShowConfetti(true), 1500);
    
    // Enhanced continuous confetti bursts
    const confettiInterval = setInterval(() => {
      if (!prefersReducedMotion) {
        setShowConfetti(false);
        setTimeout(() => setShowConfetti(true), 150);
      }
    }, 6000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(confettiInterval);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative flex flex-col items-center justify-center py-24">
      {/* Enhanced Multi-Layer Confetti System */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(25)].map((_, i) => (
            <div
              key={`confetti-${i}`}
              ref={(el) => (confettiRefs.current[i] = el)}
              className="absolute"
              style={{
                left: `${5 + Math.random() * 90}%`,
                top: `${-15 + Math.random() * 25}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2.5 + Math.random() * 2}s`,
              }}
            >
              <div className="animate-[fall_3s_ease-out_forwards]">
                {i % 5 === 0 ? (
                  <Crown 
                    className="text-astro-gold drop-shadow-lg animate-spin" 
                    size={10 + Math.random() * 12}
                  />
                ) : i % 5 === 1 ? (
                  <Sparkles 
                    className="text-astro-purple drop-shadow-lg animate-pulse" 
                    size={8 + Math.random() * 10}
                  />
                ) : i % 5 === 2 ? (
                  <Star 
                    className="text-astro-cyan drop-shadow-lg animate-bounce" 
                    size={6 + Math.random() * 10}
                  />
                ) : i % 5 === 3 ? (
                  <Zap 
                    className="text-astro-coral drop-shadow-lg animate-pulse" 
                    size={6 + Math.random() * 8}
                  />
                ) : (
                  <div 
                    className="rounded-full drop-shadow-lg animate-spin"
                    style={{
                      width: `${4 + Math.random() * 8}px`,
                      height: `${4 + Math.random() * 8}px`,
                      background: i % 3 === 0 
                        ? "linear-gradient(45deg, hsl(var(--astro-purple)), hsl(var(--astro-gold)))"
                        : i % 3 === 1
                        ? "linear-gradient(45deg, hsl(var(--astro-cyan)), hsl(var(--astro-purple)))"
                        : "hsl(var(--astro-coral))"
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Enhanced Floating Sparkles Ring */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30) * Math.PI / 180;
          const radius = 140 + Math.sin(i) * 20;
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
              {i % 4 === 0 ? (
                <Crown 
                  className={cn(
                    "drop-shadow-lg transition-all duration-500",
                    "text-astro-gold"
                  )}
                  size={12 + (i % 3) * 3}
                />
              ) : i % 4 === 1 ? (
                <Sparkles 
                  className={cn(
                    "drop-shadow-lg transition-all duration-500",
                    "text-astro-purple"
                  )}
                  size={10 + (i % 3) * 3}
                />
              ) : i % 4 === 2 ? (
                <Star 
                  className={cn(
                    "drop-shadow-lg transition-all duration-500",
                    "text-astro-cyan"
                  )}
                  size={8 + (i % 3) * 3}
                />
              ) : (
                <Zap 
                  className={cn(
                    "drop-shadow-lg transition-all duration-500",
                    "text-astro-coral"
                  )}
                  size={6 + (i % 3) * 3}
                />
              )}
            </div>
          );
        })}
      </div>
      
      {/* Main Enhanced Success Icon with Multiple Visual Layers */}
      <div ref={successIconRef} className="opacity-0 scale-0">
        <div className="relative">
          {/* Multi-layer enhanced glow system */}
          <div 
            ref={glowRef} 
            className="absolute inset-0 bg-gradient-radial from-astro-cyan/30 via-astro-purple/20 to-transparent rounded-full blur-3xl scale-75 opacity-0" 
          />
          <div className="absolute inset-0 bg-gradient-radial from-astro-gold/15 via-astro-cyan/10 to-transparent rounded-full blur-2xl animate-pulse" />
          <div className="absolute inset-0 bg-gradient-conic from-astro-purple/20 via-astro-cyan/20 to-astro-purple/20 rounded-full blur-xl animate-spin" 
               style={{ animation: "spin 8s linear infinite" }} />
          
          {/* Enhanced success indicator with premium styling */}
          <div className="relative p-4 rounded-full bg-gradient-to-br from-astro-purple/40 via-astro-cyan/30 to-astro-purple/40 backdrop-blur-lg border-2 border-astro-cyan/50 shadow-2xl shadow-astro-cyan/30">
            <div className="p-3 rounded-full bg-gradient-to-br from-astro-space/80 to-astro-void/80 backdrop-blur-sm border border-astro-cyan/30">
              <div className="relative">
                <CheckCircle className="relative h-28 w-28 text-astro-cyan filter drop-shadow-[0_0_40px_hsl(var(--astro-cyan))]" />
                
                {/* Animated check mark overlay */}
                <div 
                  ref={checkRef} 
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-8 h-12 border-r-4 border-b-4 border-astro-white transform rotate-45 translate-x-1 -translate-y-1" 
                       style={{ 
                         borderColor: "hsl(var(--astro-white))",
                         filter: "drop-shadow(0 0 10px hsl(var(--astro-white)))"
                       }} 
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional premium glow rings */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-astro-gold/10 via-transparent to-astro-cyan/10 animate-ping" 
               style={{ animation: "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite" }} />
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-astro-purple/5 via-astro-cyan/5 to-astro-purple/5 animate-pulse" />
        </div>
      </div>

      {/* Enhanced Premium Background Effects */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-80 w-80 bg-gradient-radial from-astro-purple/15 via-astro-cyan/8 to-transparent rounded-full animate-pulse" />
        <div className="absolute h-60 w-60 bg-gradient-radial from-astro-gold/10 via-transparent to-transparent rounded-full animate-ping" />
        <div className="absolute h-96 w-96 bg-gradient-radial from-astro-purple/5 via-transparent to-transparent rounded-full" />
        <div className="absolute h-32 w-32 bg-gradient-conic from-astro-cyan/20 via-transparent to-astro-purple/20 rounded-full animate-spin" 
             style={{ animation: "spin 12s linear infinite reverse" }} />
      </div>
    </div>
  );
}