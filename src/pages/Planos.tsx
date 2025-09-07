import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Star, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlanCard } from "@/components/plan-card";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Planos = () => {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const plansRef = useRef(null);
  const comparisonRef = useRef(null);
  const faqRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(".plans-header-title", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
      gsap.fromTo(".plans-header-subtitle", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.2 }
      );

      // Plans section animation with earlier trigger
      ScrollTrigger.create({
        trigger: plansRef.current,
        start: "top 120%",  // Starts 1.5 scrolls before element enters viewport
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          gsap.fromTo(".plan-card", 
            { opacity: 0, y: 60, scale: 0.9 },
            { 
              opacity: 1, 
              y: 0, 
              scale: 1, 
              duration: 0.8, 
              ease: "power3.out",
              stagger: 0.2
            }
          );
        }
      });

      // Comparison section animation with earlier trigger
      ScrollTrigger.create({
        trigger: comparisonRef.current,
        start: "top 120%",  // Starts 1.5 scrolls before element enters viewport
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          gsap.fromTo(".comparison-title", 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
          );
          gsap.fromTo(".comparison-table", 
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
          );
        }
      });

      // FAQ section animation with earlier trigger
      ScrollTrigger.create({
        trigger: faqRef.current,
        start: "top 120%",  // Starts 1.5 scrolls before element enters viewport
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          gsap.fromTo(".faq-title", 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
          );
          gsap.fromTo(".faq-item", 
            { opacity: 0, y: 30 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.8, 
              ease: "power3.out",
              stagger: 0.15,
              delay: 0.3
            }
          );
        }
      });

    }, headerRef);

    return () => ctx.revert();
  }, []);

  // Prevent reduced motion users from seeing animations
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  }, []);

  const plans = [
    {
      id: "mensal",
      title: "Mensal",
      price: "R$ 9,99",
      originalPrice: "R$ 10,99",
      discount: "10% OFF",
      period: "/mês",
      features: [
        "Estatísticas detalhadas de progresso",
        "Acompanhamento do tempo de meditação",
        "Meditações premium exclusivas",
        "Notícias astronômicas do mês",
        "Eventos astronômicos exclusivos",
        "Suporte prioritário",
        "APOD da semana traduzido"
      ],
      ctaText: "Escolher Mensal",
      isPopular: false
    },
    {
      id: "trimestral",
      title: "Trimestral",
      price: "R$ 26,99",
      period: "/3 meses",
      features: [
        "Estatísticas detalhadas de progresso",
        "Acompanhamento do tempo de meditação",
        "Meditações premium exclusivas",
        "Notícias astronômicas do mês",
        "Eventos astronômicos exclusivos",
        "Suporte prioritário",
        "APOD da semana traduzido"
      ],
      ctaText: "Escolher Trimestral",
      isPopular: true
    },
    {
      id: "anual",
      title: "Anual",
      price: "R$ 89,99",
      originalPrice: "R$ 149,90",
      discount: "40% OFF",
      period: "/ano",
      features: [
        "Estatísticas detalhadas de progresso",
        "Acompanhamento do tempo de meditação",
        "Meditações premium exclusivas",
        "Notícias astronômicas do mês",
        "Eventos astronômicos exclusivos",
        "Suporte prioritário",
        "APOD da semana traduzido"
      ],
      ctaText: "Escolher Anual",
      isPopular: false
    }
  ];

  const handlePlanSelect = (planId: string) => {
    navigate(`/${planId}`);
  };

  return (
    <div ref={headerRef} className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="plans-header-title text-cosmic-lg text-astro-white">
              Escolha Seu Plano
            </h1>
            <p className="plans-header-subtitle text-lg text-astro-light">
              Explore os diferentes níveis de acesso e encontre o plano perfeito 
              para sua jornada de meditação cósmica
            </p>
          </div>
        </div>
      </section>

      {/* Plans Grid */}
      <section ref={plansRef} className="pb-16 lg:pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <PlanCard
                key={plan.id}
                title={plan.title}
                price={plan.price}
                originalPrice={plan.originalPrice}
                discount={plan.discount}
                features={plan.features}
                isPopular={plan.isPopular}
                ctaText={plan.ctaText}
                onSelect={() => handlePlanSelect(plan.id)}
                className="plan-card"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section ref={comparisonRef} className="py-16 lg:py-24 bg-astro-void/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="comparison-title text-cosmic-md text-astro-white mb-6">
              Compare os Recursos
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="comparison-table grid grid-cols-4 gap-4 p-6 glass rounded-cosmic">
              {/* Header */}
              <div className="font-semibold text-astro-white">Recursos</div>
              <div className="text-center font-semibold text-astro-white">Mensal</div>
              <div className="text-center font-semibold text-astro-gold">Trimestral</div>
              <div className="text-center font-semibold text-astro-white">Anual</div>
              
              {/* Features */}
              {[
                "Estatísticas de Progresso",
                "Tempo de Meditação",
                "Meditações Premium",
                "Notícias Astronômicas",
                "Eventos Astronômicos",
                "Suporte Prioritário",
                "APOD Traduzido"
              ].map((feature, index) => (
                <>
                  <div key={`feature-${index}`} className="text-astro-light py-2 border-t border-astro-nebula">
                    {feature}
                  </div>
                  <div className="text-center py-2 border-t border-astro-nebula">
                    <Check className="h-5 w-5 mx-auto text-astro-cyan" />
                  </div>
                  <div className="text-center py-2 border-t border-astro-nebula">
                    <Check className="h-5 w-5 mx-auto text-astro-cyan" />
                  </div>
                  <div className="text-center py-2 border-t border-astro-nebula">
                    <Check className="h-5 w-5 mx-auto text-astro-cyan" />
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="faq-title text-cosmic-md text-astro-white mb-6">
              Perguntas Frequentes
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Posso cancelar minha assinatura a qualquer momento?",
                answer: "Sim, você pode cancelar sua assinatura a qualquer momento através das configurações do seu perfil no aplicativo."
              },
              {
                question: "O que acontece com meu conteúdo offline se eu cancelar?",
                answer: "O conteúdo baixado permanece disponível por 30 dias após o cancelamento, permitindo que você finalize suas práticas."
              },
              {
                question: "Existe um período de teste gratuito?",
                answer: "Oferecemos 7 dias gratuitos para todos os novos usuários experimentarem nossos recursos premium."
              }
            ].map((faq, index) => (
              <div key={index} className="faq-item glass rounded-cosmic p-6">
                <h3 className="text-lg font-semibold text-astro-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-astro-light">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Planos;