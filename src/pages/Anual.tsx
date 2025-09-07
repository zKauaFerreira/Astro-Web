import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Star, Check, AlertCircle, User, Diamond, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CosmicCard } from "@/components/ui/cosmic-card";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { useToast } from "@/hooks/use-toast";

const Anual = () => {
  const [searchParams] = useSearchParams();
  const [userId, setUserId] = useState<string | null>(null);
  const [isValidUserId, setIsValidUserId] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const userIdParam = searchParams.get('userid');
    if (userIdParam) {
      setUserId(userIdParam);
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      const isValid = uuidRegex.test(userIdParam);
      setIsValidUserId(isValid);
      
      if (isValid) {
        toast({
          title: "ID do usuário detectado",
          description: "Suas informações serão vinculadas automaticamente.",
          duration: 3000,
        });
      }
    }
  }, [searchParams, toast]);

  const features = [
    "Estatísticas detalhadas de progresso",
    "Acompanhamento do tempo de meditação",
    "Meditações premium exclusivas",
    "Notícias astronômicas do mês",
    "Eventos astronômicos exclusivos",
    "Suporte prioritário",
    "APOD da semana traduzido"
  ];


  const faqs = [
    {
      question: "Por que o plano anual é mais vantajoso?",
      answer: "Com 40% de desconto, você economiza R$ 59,91 por ano e garante todos os recursos premium por 12 meses completos."
    },
    {
      question: "Posso cancelar a qualquer momento?",
      answer: "Sim, você pode cancelar sua assinatura a qualquer momento através das configurações do seu perfil no aplicativo."
    },
    {
      question: "Como funciona a garantia de 30 dias?",
      answer: "Se não ficar satisfeito nos primeiros 30 dias, devolvemos 100% do valor pago, sem perguntas."
    }
  ];

  const handleConfirmSubscription = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const checkoutUrl = `https://checkout-external.com/astrorhythm/anual${userId && isValidUserId ? `?userid=${userId}` : ''}`;
      
      toast({
        title: "Redirecionando para o checkout",
        description: userId && isValidUserId 
          ? "Seu ID de usuário será incluído automaticamente." 
          : "Você será redirecionado para finalizar o pagamento.",
        duration: 3000,
      });
      
      console.log('Redirecting to:', checkoutUrl);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            
            {/* Header with VIP Badge */}
            <div className="text-center mb-12 relative">
              <div className="inline-flex items-center space-x-2 bg-cosmic-gradient px-6 py-3 rounded-full shadow-glow mb-6 animate-fade-up">
                <Diamond className="h-6 w-6 text-astro-white" />
                <span className="font-bold text-astro-white">MÁXIMA ECONOMIA</span>
              </div>
              <h1 className="text-cosmic-xl text-astro-white mb-6 animate-fade-up animate-stagger-1">
                Plano Anual
              </h1>
              <p className="text-xl text-astro-light max-w-3xl mx-auto animate-fade-up animate-stagger-2">
                Para verdadeiros exploradores cósmicos. Máxima economia com 40% de desconto especial.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Pricing & Bonuses */}
              <div className="lg:col-span-1 space-y-6">
                
                {/* Pricing Card */}
                <CosmicCard className="text-center animate-fade-up animate-stagger-3">
                  <div className="space-y-6">
                    <div className="flex items-center justify-center space-x-2">
                      <Diamond className="h-8 w-8 text-astro-gold" />
                      <h2 className="text-xl font-space font-bold text-astro-white">Plano Anual</h2>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <span className="text-xl text-astro-muted line-through">R$ 149,90</span>
                        <span className="bg-astro-coral text-astro-white px-3 py-1 rounded-full font-bold text-sm">
                          40% OFF
                        </span>
                      </div>
                      <div className="text-4xl font-space font-bold text-astro-white">
                        R$ 89,99
                      </div>
                      <div className="text-astro-muted">por ano completo</div>
                    </div>
                    
                    <div className="p-4 bg-astro-gold/10 rounded-cosmic border border-astro-gold/30">
                      <div className="text-astro-gold font-bold text-lg">
                        Equivale a R$ 7,50/mês
                      </div>
                      <div className="text-astro-light text-sm">
                        Economia de R$ 59,91 no ano
                      </div>
                    </div>
                  </div>
                </CosmicCard>


                {/* User ID Status */}
                {userId && (
                  <CosmicCard 
                    variant={isValidUserId ? "glass" : "default"} 
                    className="animate-fade-up animate-stagger-5"
                  >
                    <div className="flex items-center space-x-3">
                      {isValidUserId ? (
                        <>
                          <User className="h-6 w-6 text-astro-cyan" />
                          <div>
                            <p className="text-astro-white font-semibold">ID detectado</p>
                            <p className="text-astro-light text-sm">
                              Conta será vinculada automaticamente
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-6 w-6 text-astro-coral" />
                          <div>
                            <p className="text-astro-white font-semibold">ID inválido</p>
                            <p className="text-astro-light text-sm">
                              Você ainda pode prosseguir normalmente
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </CosmicCard>
                )}

                {/* CTA */}
                <CosmicCard className="text-center animate-fade-up animate-stagger-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-space font-bold text-astro-white">
                      Oferta Limitada
                    </h3>
                    <Button 
                      variant="cosmic"
                      size="hero"
                      className="w-full"
                      onClick={handleConfirmSubscription}
                      disabled={isLoading}
                    >
                      {isLoading ? "Processando..." : "Garantir Meu Desconto"}
                    </Button>
                    <p className="text-xs text-astro-muted">
                      Garantia de 30 dias ou seu dinheiro de volta
                    </p>
                  </div>
                </CosmicCard>
              </div>

              {/* Features & Details */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* All Features */}
                <CosmicCard className="animate-fade-up animate-stagger-7">
                  <h3 className="text-xl font-space font-semibold text-astro-white mb-6">
                    Tudo que você recebe:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-astro-cyan flex-shrink-0 mt-0.5" />
                        <span className="text-astro-light">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CosmicCard>


                {/* Benefits */}
                <CosmicCard className="animate-fade-up animate-stagger-9">
                  <h3 className="text-lg font-space font-semibold text-astro-white mb-4">
                    Por que o plano anual é perfeito para você?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-astro-light">
                    <div className="space-y-2">
                      <p>• <strong>40% de economia</strong> versus mensal</p>
                      <p>• Todos os recursos premium incluídos</p>
                      <p>• Pagamento anual conveniente</p>
                    </div>
                    <div className="space-y-2">
                      <p>• Máxima economia no longo prazo</p>
                      <p>• Suporte prioritário completo</p>
                      <p>• Acesso por 12 meses completos</p>
                    </div>
                  </div>
                </CosmicCard>

                {/* Other Plans */}
                <CosmicCard variant="glass" className="animate-fade-up animate-stagger-10">
                  <h3 className="text-lg font-space font-semibold text-astro-white mb-4">
                    Comparar com outros planos
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      onClick={() => navigate('/mensal')}
                    >
                      Mensal - R$ 9,99/mês
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => navigate('/trimestral')}
                    >
                      Trimestral - R$ 26,99/3 meses
                    </Button>
                  </div>
                </CosmicCard>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-16">
              <h2 className="text-cosmic-md text-astro-white text-center mb-12">
                Perguntas sobre o Plano Anual
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {faqs.map((faq, index) => (
                  <CosmicCard key={index} className={`animate-fade-up animate-stagger-${index + 1}`}>
                    <h4 className="font-semibold text-astro-white mb-3">
                      {faq.question}
                    </h4>
                    <p className="text-astro-light">
                      {faq.answer}
                    </p>
                  </CosmicCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Anual;
