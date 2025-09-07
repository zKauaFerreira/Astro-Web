import { useEffect, useState, useRef } from "react";
import { CheckCircle, Sparkles, Star, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";

export function VerifiedAnimationEnhanced() {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const containerRef = useRef(null);
  const checkRef = useRef(null);
  const glowRef = useRef(null);
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
      // Initial dramatic entrance
      const mainTl = gsap.timeline({ delay: 0.5 });
      
      // Check icon animation
      mainTl.fromTo(checkRef.current, {
        scale: 0,
        opacity: 0,
        rotation: -180,
        filter: "blur(10px)"
      }, {
        scale: 1,
        opacity: 1,
        rotation: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "back.out(1.7)"
      })
      
      // Glow effect
      .fromTo(glowRef.current, {
        scale: 0.5,
        opacity: 0
      }, {
        scale: 1.5,
        opacity: 0.8,
        duration: 1,
        ease: "power2.out"
      }, "-=0.8")
      
      // Sparkles staggered animation
      .fromTo(sparkleRefs.current, {
        scale: 0,
        opacity: 0,
        rotation: 0
      }, {
        scale: 1,
        opacity: 1,
        rotation: 360,
        duration: 0.8,
        ease: "back.out(1.5)",
        stagger: 0.08
      }, "-=0.6");

      // Continuous animations
      // Check pulse
      gsap.to(checkRef.current, {
        scale: 1.1,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      // Glow breathing
      gsap.to(glowRef.current, {
        opacity: 0.4,
        scale: 1.8,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      // Sparkles continuous rotation and floating
      sparkleRefs.current.forEach((sparkle, index) => {
        if (sparkle) {
          // Rotation
          gsap.to(sparkle, {
            rotation: 360,
            duration: 3 + (index * 0.5),
            ease: "none",
            repeat: -1
          });
          
          // Floating movement
          gsap.to(sparkle, {
            y: -8,
            x: Math.sin(index) * 5,
            duration: 2.5 + (index * 0.2),
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1
          });
        }
      });

    }, containerRef);

    // Set visibility and confetti
    const timer1 = setTimeout(() => setIsVisible(true), 200);
    const timer2 = setTimeout(() => setShowConfetti(true), 1000);
    
    // Continuous confetti bursts
    const confettiInterval = setInterval(() => {
      if (!prefersReducedMotion) {
        setShowConfetti(false);
        setTimeout(() => setShowConfetti(true), 100);
      }
    }, 8000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(confettiInterval);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative flex flex-col items-center justify-center py-20">
      {/* Enhanced Confetti System */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={`confetti-${i}`}
              ref={(el) => (confettiRefs.current[i] = el)}
              className="absolute"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${-10 + Math.random() * 20}%`,
                animationDelay: `${Math.random() * 1.5}s`,
                animationDuration: `${2 + Math.random() * 1.5}s`,
              }}
            >
              <div className="animate-[fall_2.5s_ease-out_forwards]">
                {i % 4 === 0 ? (
                  <Sparkles 
                    className="text-astro-purple drop-shadow-lg animate-spin" 
                    size={8 + Math.random() * 8}
                  />
                ) : i % 4 === 1 ? (
                  <Star 
                    className="text-astro-cyan drop-shadow-lg animate-pulse" 
                    size={6 + Math.random() * 8}
                  />
                ) : i % 4 === 2 ? (
                  <Zap 
                    className="text-astro-gold drop-shadow-lg" 
                    size={6 + Math.random() * 6}
                  />
                ) : (
                  <div 
                    className="rounded-full drop-shadow-lg animate-bounce"
                    style={{
                      width: `${3 + Math.random() * 6}px`,
                      height: `${3 + Math.random() * 6}px`,
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
      
      {/* Floating Sparkles Ring */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45) * Math.PI / 180;
          const radius = 120;
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
                size={10 + (i % 3) * 3}
              />
            </div>
          );
        })}
      </div>
      
      {/* Main Success Icon */}
      <div ref={checkRef} className="opacity-0 scale-0">
        <div className="relative">
          {/* Enhanced multi-layer glow */}
          <div 
            ref={glowRef} 
            className="absolute inset-0 bg-astro-purple/25 rounded-full blur-3xl scale-75 opacity-0" 
          />
          <div className="absolute inset-0 bg-astro-cyan/20 rounded-full blur-2xl animate-pulse" />
          <div className="absolute inset-0 bg-gradient-radial from-astro-purple/15 via-astro-cyan/10 to-transparent rounded-full" />
          
          {/* Enhanced check circle with multiple visual layers */}
          <div className="relative p-3 rounded-full bg-gradient-to-br from-astro-purple/30 via-astro-purple/20 to-astro-cyan/30 backdrop-blur-sm border border-astro-cyan/40">
            <div className="p-2 rounded-full bg-gradient-to-br from-astro-space/50 to-astro-void/50 backdrop-blur-sm">
              <CheckCircle className="relative h-24 w-24 text-astro-cyan filter drop-shadow-[0_0_30px_hsl(var(--astro-cyan))]" />
            </div>
          </div>
          
          {/* Additional glow ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-astro-purple/10 via-transparent to-astro-cyan/10 animate-spin" 
               style={{ animation: "spin 8s linear infinite" }} />
        </div>
      </div>

      {/* Enhanced background effects */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-60 w-60 bg-gradient-radial from-astro-purple/12 via-astro-cyan/6 to-transparent rounded-full animate-pulse" />
        <div className="absolute h-40 w-40 bg-gradient-radial from-astro-gold/8 via-transparent to-transparent rounded-full animate-ping" />
        <div className="absolute h-80 w-80 bg-gradient-radial from-astro-purple/4 via-transparent to-transparent rounded-full" />
      </div>
    </div>
  );
}