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
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);
  
  const { ref: aboutScrollRef, isVisible: aboutVisible } = useScrollAnimation();
  const { ref: featuresScrollRef, isVisible: featuresVisible } = useScrollAnimation();
  const { ref: testimonialsScrollRef, isVisible: testimonialsVisible } = useScrollAnimation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced Hero Animation with more fluid sequences
      const heroTl = gsap.timeline({ delay: 0.5 });
      
      // Parallax background effect
      gsap.set(".hero-bg", { scale: 1.1 });
      
      heroTl.fromTo(".hero-title", 
        { 
          opacity: 0, 
          y: 80, 
          scale: 0.7,
          rotationX: 30,
          filter: "blur(10px)"
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          rotationX: 0,
          filter: "blur(0px)", 
          duration: 1.8, 
          ease: "power4.out" 
        }
      )
      .fromTo(".hero-subtitle", 
        { 
          opacity: 0, 
          y: 60,
          scale: 0.9,
          filter: "blur(5px)"
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          filter: "blur(0px)", 
          duration: 1.4, 
          ease: "power3.out" 
        }, "-=1.2"
      )
      .fromTo(".hero-buttons", 
        { 
          opacity: 0, 
          y: 40, 
          scale: 0.8,
          rotationY: 15 
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          rotationY: 0, 
          duration: 1.2, 
          ease: "back.out(1.7)" 
        }, "-=0.8"
      );

      // Enhanced continuous parallax for entire page
      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Hero background parallax
          gsap.to(".hero-bg", {
            y: progress * 150,
            scale: 1.1 + (progress * 0.15),
            duration: 0.3
          });
          
          // Multiple layer parallax throughout page
          gsap.to(".parallax-slow", {
            y: progress * 50,
            duration: 0.3
          });
          gsap.to(".parallax-medium", {
            y: progress * 100,
            duration: 0.3
          });
          gsap.to(".parallax-fast", {
            y: progress * 200,
            duration: 0.3
          });
          
          // Floating elements animation
          gsap.to(".floating-element", {
            y: Math.sin(progress * Math.PI * 4) * 10,
            x: Math.sin(progress * Math.PI * 2) * 5,
            rotation: progress * 360,
            duration: 0.3
          });
          
          // Continuous text animations
          gsap.to(".cosmic-text", {
            filter: `hue-rotate(${progress * 360}deg)`,
            duration: 0.3
          });
        }
      });

      // Enhanced About Section with multiple reveal layers
      ScrollTrigger.create({
        trigger: aboutRef.current,
        start: "top 85%",
        end: "bottom 15%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Continuous scaling and rotation during scroll
          gsap.to(".about-title", {
            scale: 1 + (progress * 0.05),
            y: progress * -20,
            duration: 0.3
          });
          
          gsap.to(".about-text", {
            y: progress * -10,
            opacity: 1 - (progress * 0.2),
            duration: 0.3
          });
        },
        onEnter: () => {
          const aboutTl = gsap.timeline();
          
          // Multi-layer background reveal
          gsap.fromTo(aboutRef.current,
            { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)" },
            { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.8, ease: "power3.out" }
          );
          
          aboutTl.fromTo(".about-title", 
            { 
              opacity: 0, 
              y: 80, 
              rotationX: 35,
              scale: 0.7,
              filter: "blur(15px)"
            },
            { 
              opacity: 1, 
              y: 0, 
              rotationX: 0,
              scale: 1,
              filter: "blur(0px)", 
              duration: 2, 
              ease: "power4.out" 
            }
          )
          .fromTo(".about-text", 
            { 
              opacity: 0, 
              y: 60,
              scale: 0.9,
              rotationY: 10
            },
            { 
              opacity: 1, 
              y: 0,
              scale: 1,
              rotationY: 0, 
              duration: 1.6, 
              ease: "power3.out" 
            }, "-=1.4"
          );
          
          // Floating animation for text elements
          gsap.to(".about-title", {
            y: -8,
            duration: 3,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1
          });
        }
      });

      // Enhanced Features section with advanced staggered animations
      ScrollTrigger.create({
        trigger: featuresRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 0.8,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Dynamic feature cards movement
          gsap.to(".feature-card", {
            y: Math.sin(progress * Math.PI * 2) * 15,
            rotationY: progress * 5,
            scale: 1 + (Math.sin(progress * Math.PI * 3) * 0.03),
            duration: 0.3,
            stagger: 0.1
          });
          
          // Background gradient shift
          gsap.to(featuresRef.current, {
            filter: `hue-rotate(${progress * 30}deg)`,
            duration: 0.3
          });
        },
        onEnter: () => {
          const featuresTl = gsap.timeline();
          
          // Section reveal with multiple layers
          gsap.fromTo(featuresRef.current,
            { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)" },
            { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.5, ease: "power3.out" }
          );
          
          featuresTl.fromTo(".features-title", 
            { 
              opacity: 0, 
              y: 100, 
              scale: 0.6,
              rotationY: 30,
              filter: "blur(20px)"
            },
            { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              rotationY: 0,
              filter: "blur(0px)", 
              duration: 2.2, 
              ease: "power4.out" 
            }
          )
          .fromTo(".features-subtitle", 
            { 
              opacity: 0, 
              y: 60,
              scale: 0.8,
              rotationX: 20
            },
            { 
              opacity: 1, 
              y: 0,
              scale: 1,
              rotationX: 0, 
              duration: 1.6, 
              ease: "power3.out" 
            }, "-=1.8"
          )
          .fromTo(".feature-card", 
            { 
              opacity: 0, 
              y: 120, 
              scale: 0.5, 
              rotationY: 45,
              rotationX: 25,
              filter: "blur(10px)"
            },
            { 
              opacity: 1, 
              y: 0, 
              scale: 1, 
              rotationY: 0,
              rotationX: 0,
              filter: "blur(0px)",
              duration: 1.8, 
              ease: "back.out(1.7)",
              stagger: {
                amount: 1.2,
                from: "random",
                ease: "power2.out"
              }
            }, "-=1.2"
          );
          
          // Enhanced continuous floating animation
          gsap.to(".feature-card", {
            y: -8,
            rotationY: 2,
            duration: 4,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            stagger: {
              amount: 2,
              from: "random"
            }
          });
        }
      });

      // Enhanced Testimonials with 3D carousel effect
      ScrollTrigger.create({
        trigger: testimonialsRef.current,
        start: "top 85%",
        end: "bottom 15%",
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // 3D carousel rotation effect
          gsap.to(".testimonial-card", {
            rotationY: Math.sin(progress * Math.PI * 2) * 8,
            y: Math.sin(progress * Math.PI * 4) * 12,
            scale: 1 + (Math.sin(progress * Math.PI * 3) * 0.05),
            duration: 0.3,
            stagger: 0.2
          });
          
          // Title perspective effect
          gsap.to(".testimonials-title", {
            rotationX: progress * 10,
            y: progress * -30,
            duration: 0.3
          });
        },
        onEnter: () => {
          const testimonialsTl = gsap.timeline();
          
          // Multi-layer section reveal
          gsap.fromTo(testimonialsRef.current,
            { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)" },
            { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.6, ease: "power3.out" }
          );
          
          testimonialsTl.fromTo(".testimonials-title", 
            { 
              opacity: 0, 
              y: 80,
              scale: 0.7,
              rotationX: 30,
              filter: "blur(12px)"
            },
            { 
              opacity: 1, 
              y: 0,
              scale: 1,
              rotationX: 0,
              filter: "blur(0px)", 
              duration: 1.8, 
              ease: "power4.out" 
            }
          )
          .fromTo(".testimonial-card", 
            { 
              opacity: 0, 
              y: 100, 
              rotationX: 60, 
              rotationY: 25,
              scale: 0.6,
              filter: "blur(15px)"
            },
            { 
              opacity: 1, 
              y: 0, 
              rotationX: 0,
              rotationY: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 2, 
              ease: "back.out(1.5)",
              stagger: {
                amount: 0.8,
                from: "center"
              }
            }, "-=1.2"
          );
          
          // Enhanced floating effects with different patterns
          gsap.to(".testimonial-card:nth-child(1)", {
            rotationY: 3,
            y: -5,
            duration: 3.5,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1
          });
          
          gsap.to(".testimonial-card:nth-child(2)", {
            rotationY: -2,
            y: -8,
            duration: 4,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            delay: 0.5
          });
          
          gsap.to(".testimonial-card:nth-child(3)", {
            rotationY: 2,
            y: -6,
            duration: 3.8,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            delay: 1
          });
        }
      });

      // Enhanced CTA with dramatic multi-layer entrance
      ScrollTrigger.create({
        trigger: ctaRef.current,
        start: "top 90%",
        end: "bottom 10%",
        scrub: 0.4,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Dynamic scaling and perspective
          gsap.to(".cta-content", {
            scale: 1 + (progress * 0.08),
            rotationY: Math.sin(progress * Math.PI) * 5,
            y: progress * -40,
            duration: 0.3
          });
          
          // Background color shift
          gsap.to(ctaRef.current, {
            filter: `brightness(${1 + (progress * 0.2)}) saturate(${1 + (progress * 0.3)})`,
            duration: 0.3
          });
        },
        onEnter: () => {
          // Multi-layer section reveal
          gsap.fromTo(ctaRef.current,
            { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)" },
            { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.8, ease: "power3.out" }
          );
          
          gsap.fromTo(".cta-content", 
            { 
              opacity: 0, 
              y: 120, 
              scale: 0.5, 
              rotationY: 35,
              rotationX: 30,
              filter: "blur(25px)"
            },
            { 
              opacity: 1, 
              y: 0, 
              scale: 1, 
              rotationY: 0,
              rotationX: 0,
              filter: "blur(0px)", 
              duration: 2.5, 
              ease: "power4.out" 
            }
          );
          
          // Enhanced pulsing glow with color cycling
          gsap.to(".cta-content", {
            filter: "drop-shadow(0 0 30px rgba(138, 79, 255, 0.4)) drop-shadow(0 0 60px rgba(78, 205, 196, 0.2))",
            scale: 1.02,
            duration: 3,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1
          });
        }
      });

      // Additional micro-animations for interactive elements
      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Navbar subtle animations
          gsap.to(".navbar", {
            filter: `blur(${progress * 2}px) brightness(${1 + (progress * 0.1)})`,
            duration: 0.3
          });
          
          // Button hover enhancement based on scroll
          gsap.to("button", {
            filter: `saturate(${1 + (progress * 0.5)})`,
            duration: 0.3
          });
        }
      });

      // Footer enhanced entrance
      ScrollTrigger.create({
        trigger: ".footer-section",
        start: "top 95%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          gsap.fromTo(".footer-content", 
            { 
              opacity: 0, 
              y: 60,
              scale: 0.9,
              filter: "blur(8px)"
            },
            { 
              opacity: 1, 
              y: 0,
              scale: 1,
              filter: "blur(0px)", 
              duration: 1.8, 
              ease: "power3.out" 
            }
          );
        }
      });

      // Advanced interactive hover effects for all cards
      const cards = document.querySelectorAll('.feature-card, .testimonial-card');
      cards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            rotationY: 5,
            y: -10,
            filter: "brightness(1.1) saturate(1.2)",
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            rotationY: 0,
            y: 0,
            filter: "brightness(1) saturate(1)",
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);
  
  // Prevent reduced motion users from seeing animations
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
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
            <h1 className="hero-title cosmic-text text-cosmic-xl text-astro-white leading-tight">
              Conecte-se com o{" "}
              <span className="text-gradient-cosmic floating-element">
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
            <h2 className="text-cosmic-lg text-astro-white leading-tight cosmic-text">
              Comece Sua Jornada{" "}
              <span className="text-gradient-cosmic floating-element">Cósmica</span>
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
