import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Star, Telescope, Moon, Sparkles, Zap, Shield, Users, Clock, Calendar, Heart, Crown, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CosmicCard } from "@/components/ui/cosmic-card";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import cosmicHero from "@/assets/cosmic-hero.jpg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const navigate = useNavigate();
  const heroRef = useRef<any>(null);
  const aboutRef = useRef<any>(null);
  const featuresRef = useRef<any>(null);
  const testimonialsRef = useRef<any>(null);
  const ctaRef = useRef<any>(null);

  const { ref: aboutScrollRef, isVisible: aboutVisible } = useScrollAnimation();
  const { ref: featuresScrollRef, isVisible: featuresVisible } = useScrollAnimation();
  const { ref: testimonialsScrollRef, isVisible: testimonialsVisible } = useScrollAnimation();

  useEffect(() => {
    // respect reduced motion
    const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      return;
    }

    // Use gsap.context so selectors are scoped and cleanup is easy
    const ctx = gsap.context(() => {
      // small default ease and durations
      const defaultEase = "power2.out";

      // HERO: gentle entrance (not scroll-synced)
      const heroTl = gsap.timeline({ delay: 0.35, defaults: { ease: defaultEase } });
      gsap.set(".hero-bg", { scale: 1.06, willChange: "transform" });

      heroTl
        .fromTo(".hero-title", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9 })
        .fromTo(".hero-subtitle", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.55")
        .fromTo(".hero-buttons", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.45");

      // Parallax background synced to scroll (gentle)
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.7,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.to(".hero-bg", { y: p * 45, scale: 1.06 + p * 0.02, duration: 0.35, overwrite: true });
          gsap.to(".parallax-medium", { y: p * 60, duration: 0.35, overwrite: true });
          gsap.to(".parallax-fast", { y: p * 90, duration: 0.35, overwrite: true });
        }
      });

      // Use matchMedia to adapt triggers for breakpoints
      const mm = gsap.matchMedia();

      // Desktop / large screens
      mm.add("(min-width: 1024px)", () => {
        // ABOUT - scroll-synced subtle reveal for heading (fade + move up) with small scrub
        gsap.fromTo(
          ".about-title",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: defaultEase,
            scrollTrigger: {
              trigger: aboutRef.current,
              start: "top 85%",
              end: "top 60%",
              scrub: 0.6
            }
          }
        );

        gsap.fromTo(
          ".about-text",
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: defaultEase,
            scrollTrigger: {
              trigger: aboutRef.current,
              start: "top 82%",
              end: "top 62%",
              scrub: 0.45
            }
          }
        );

        // FEATURES: batch animate large lists to reduce overhead; cards fade from bottom in stagger when entering
        ScrollTrigger.batch(".feature-card", {
          interval: 0.12,
          batchMax: 6,
          start: "top 75%",
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { opacity: 0, y: 20, scale: 0.995 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.85,
                ease: defaultEase,
                stagger: { each: 0.08, from: "start" }
              }
            );
          },
          onLeaveBack: (batch) => {
            gsap.to(batch, { opacity: 0, y: 12, duration: 0.5, ease: defaultEase, stagger: 0.05 });
          }
        });

        // Features title/subtitle with small scrub for smooth reveal tied to scroll
        gsap.fromTo(
          ".features-title",
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: defaultEase,
            scrollTrigger: {
              trigger: featuresRef.current,
              start: "top 80%",
              end: "top 60%",
              scrub: 0.5
            }
          }
        );

        gsap.fromTo(
          ".features-subtitle",
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: defaultEase,
            scrollTrigger: {
              trigger: featuresRef.current,
              start: "top 78%",
              end: "top 58%",
              scrub: 0.45
            }
          }
        );

        // Testimonials: batch + gentle float
        ScrollTrigger.batch(".testimonial-card", {
          interval: 0.14,
          batchMax: 4,
          start: "top 80%",
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { opacity: 0, y: 18 },
              { opacity: 1, y: 0, duration: 0.85, ease: defaultEase, stagger: 0.12 }
            );
          },
          onLeaveBack: (batch) => {
            gsap.to(batch, { opacity: 0, y: 12, duration: 0.5, stagger: 0.06, ease: defaultEase });
          }
        });

        // gentle continuous sway for testimonials (tiny amplitude)
        gsap.to(".testimonial-card", { rotationY: 1, duration: 6, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: 0.3, overwrite: false });

        // CTA reveal with minimal scrub
        gsap.fromTo(
          ".cta-content",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: defaultEase,
            scrollTrigger: { trigger: ctaRef.current, start: "top 80%", end: "top 60%", scrub: 0.5 }
          }
        );
      });

      // Mobile & small screens
      mm.add("(max-width: 1023px)", () => {
        // About section: slightly later start for mobile
        gsap.fromTo(
          ".about-title",
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: defaultEase,
            scrollTrigger: {
              trigger: aboutRef.current,
              start: "top 92%",
              end: "top 70%",
              scrub: 0.6
            }
          }
        );

        gsap.fromTo(
          ".about-text",
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: defaultEase,
            scrollTrigger: {
              trigger: aboutRef.current,
              start: "top 90%",
              end: "top 72%",
              scrub: 0.45
            }
          }
        );

        // FEATURES: batch with later start and slightly different timing
        ScrollTrigger.batch(".feature-card", {
          interval: 0.14,
          batchMax: 4,
          start: "top 92%",
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { opacity: 0, y: 22, scale: 0.995 },
              { opacity: 1, y: 0, scale: 1, duration: 0.95, ease: defaultEase, stagger: 0.09 }
            );
          },
          onLeaveBack: (batch) => gsap.to(batch, { opacity: 0, y: 12, duration: 0.45, stagger: 0.05 })
        });

        // Feature title/subtitle without heavy scrub (mobile performance)
        gsap.fromTo(".features-title", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.9, ease: defaultEase, scrollTrigger: { trigger: featuresRef.current, start: "top 90%", end: "top 72%", scrub: 0.45 } });
        gsap.fromTo(".features-subtitle", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8, ease: defaultEase, scrollTrigger: { trigger: featuresRef.current, start: "top 90%", end: "top 74%", scrub: 0.35 } });

        // Testimonials batch for mobile
        ScrollTrigger.batch(".testimonial-card", {
          interval: 0.16,
          batchMax: 3,
          start: "top 92%",
          onEnter: (batch) => gsap.fromTo(batch, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.95, stagger: 0.12, ease: defaultEase }),
          onLeaveBack: (batch) => gsap.to(batch, { opacity: 0, y: 10, duration: 0.45 })
        });

        // CTA mobile reveal
        gsap.fromTo(".cta-content", { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1, ease: defaultEase, scrollTrigger: { trigger: ctaRef.current, start: "top 92%", end: "top 74%", scrub: 0.45 } });
      });

      // Global parallax for the whole page with low amplitude (works across breakpoints)
      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.7,
        onUpdate: (self) => {
          gsap.to(".parallax-slow", { y: self.progress * 40, duration: 0.35, overwrite: true });
          gsap.to(".parallax-medium", { y: self.progress * 80, duration: 0.35, overwrite: true });
          gsap.to(".parallax-fast", { y: self.progress * 120, duration: 0.35, overwrite: true });
        }
      });

      // Ensure mm is cleaned up when ctx reverts
      // mm will be reverted in the cleanup code below via mm.revert()
      // (we keep reference by closure)
    }, heroRef);

    // cleanup
    return () => {
      try {
        // revert matchMedia handlers and ScrollTrigger instances created by them
        const mm = (gsap as any).matchMedia && (gsap as any).matchMedia();
        // Note: mm here is a fresh matchMedia instance; the ones created inside ctx are cleaned by ctx.revert()
      } finally {
        ctx.revert();
        // also ensure existing ScrollTriggers killed (defensive)
        ScrollTrigger.getAll().forEach((t) => t.kill());
      }
    };
  }, []);

  // also listen for dynamic changes to reduce motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      }
    };
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  const premiumFeatures = [
    {
      icon: Star,
      title: "Estatísticas de Progresso",
      description: "Acompanhe sua evolução com métricas detalhadas e insights personalizados da sua jornada."
    },
    {
      icon: Clock,
      title: "Tempo de Meditação",
      description: "Monitore e registre todas as suas sessões com cronometragem precisa e histórico completo."
    },
    {
      icon: Moon,
      title: "Meditações Premium",
      description: "Acesso exclusivo a sessões guiadas por especialistas em mindfulness e astronomia."
    },
    {
      icon: Sparkles,
      title: "Notícias Astronômicas",
      description: "Receba as últimas descobertas e eventos astronômicos do mês diretamente no app."
    },
    {
      icon: Calendar,
      title: "Eventos Astronômicos",
      description: "Participe de experiências exclusivas sincronizadas com fenômenos celestiais especiais."
    },
    {
      icon: Shield,
      title: "Suporte Prioritário",
      description: "Atendimento especializado e resposta rápida para todas as suas dúvidas e necessidades."
    },
    {
      icon: Telescope,
      title: "APOD da Semana",
      description: "Imagem Astronômica do Dia traduzida exclusivamente para usuários premium semanalmente."
    },
    {
      icon: Heart,
      title: "Mindfulness Cósmico",
      description: "Técnicas exclusivas que combinam meditação tradicional com contemplação astronômica."
    },
    {
      icon: Crown,
      title: "Experiência VIP",
      description: "Acesso antecipado a novos recursos e conteúdos exclusivos para membros premium."
    }
  ];

  const testimonials = [
    {
      name: "Marina Silva",
      text: "O AstroRhythm transformou completamente minha prática de meditação. A conexão com os ciclos cósmicos trouxe uma profundidade incrível.",
      rating: 5
    },
    {
      name: "Carlos Mendoza",
      text: "As experiências astronômicas são únicas. Meditar durante eclipses lunares nunca foi tão significativo.",
      rating: 5
    },
    {
      name: "Ana Beatriz",
      text: "Os soundscapes cósmicos são absolutamente envolventes. Sinto que estou flutuando no espaço durante as sessões.",
      rating: 5
    }
  ];

  return (
    <div ref={heroRef} className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div
          className="hero-bg absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 parallax-slow"
          style={{ backgroundImage: `url(${cosmicHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-astro-space/50 via-astro-space/70 to-astro-space parallax-medium" />
        <div className="absolute inset-0 bg-gradient-radial from-astro-purple/5 via-transparent to-transparent parallax-fast" />

        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="hero-title text-cosmic-xl text-astro-white leading-tight">
              Conecte-se com o{" "}
              <span className="text-gradient-cosmic">
                Cosmos
              </span>
            </h1>

            <p className="hero-subtitle text-xl md:text-2xl text-astro-light max-w-2xl mx-auto">
              Transforme seus momentos de meditação em uma jornada astronômica única. 
              Descubra a harmonia entre mindfulness e a vastidão do universo.
            </p>

            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="cosmic"
                size="hero"
                onClick={() => navigate("/planos")}
              >
                Conheça os Planos
              </Button>
              <Button
                variant="glass"
                size="hero"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              >
                Conhecer o App
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-16 lg:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
            <h2 className="about-title text-cosmic-lg text-astro-white">
              Uma Nova Dimensão da Meditação
            </h2>
            <p className="about-text text-lg text-astro-light">
              O AstroRhythm combina práticas milenares de mindfulness com a fascinação 
              do cosmos, criando experiências de meditação verdadeiramente transformadoras.
            </p>
          </div>
        </div>
      </section>

      {/* Premium Features Grid */}
      <section ref={featuresRef} className="py-16 lg:py-24 bg-astro-void/50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="features-title text-cosmic-lg text-astro-white mb-6 text-center">
              Vantagens do AstroRhythm <span className="text-gradient-cosmic">Premium</span>
            </h2>
            <p className="features-subtitle text-lg text-astro-light max-w-3xl mx-auto leading-relaxed text-center">
              Eleve sua prática com recursos exclusivos desenvolvidos para exploradores do cosmos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {premiumFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <CosmicCard
                  key={index}
                  className="feature-card hover-lift"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-full bg-cosmic-gradient flex items-center justify-center mx-auto">
                      <Icon className="h-6 w-6 text-astro-white" />
                    </div>
                    <h3 className="text-xl font-space font-semibold text-astro-white text-center">
                      {feature.title}
                    </h3>
                    <p className="text-astro-light text-center">
                      {feature.description}
                    </p>
                  </div>
                </CosmicCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className="py-16 lg:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="testimonials-title text-cosmic-lg text-astro-white mb-6">
              O Que Dizem Nossos Exploradores
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <CosmicCard
                key={index}
                variant="glass"
                className="testimonial-card hover-lift"
              >
                <div className="space-y-4">
                  <div className="flex justify-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-astro-gold fill-current" />
                    ))}
                  </div>
                  <p className="text-astro-light italic">"{testimonial.text}"</p>
                  <p className="text-astro-white font-semibold">— {testimonial.name}</p>
                </div>
              </CosmicCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-16 lg:py-24 bg-astro-void/30 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="cta-content max-w-3xl mx-auto space-y-8">
            <h2 className="text-cosmic-lg text-astro-white leading-tight">
              Comece Sua Jornada{" "}
              <span className="text-gradient-cosmic">Cósmica</span>
            </h2>

            <p className="text-xl text-astro-light">
              Transforme seus momentos de introspecção em experiências extraordinárias 
              conectadas com o universo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="cosmic"
                size="hero"
                onClick={() => navigate("/planos")}
              >
                Explorar Planos Premium
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="footer-section">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
