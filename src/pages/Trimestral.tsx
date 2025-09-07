import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Star, Check, AlertCircle, User, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CosmicCard } from "@/components/ui/cosmic-card";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { useToast } from "@/hooks/use-toast";

const Trimestral = () => {
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
      question: "Qual a diferença para o plano mensal?",
      answer: "Além de tudo do mensal, você tem acesso a eventos ao vivo, comunidade exclusiva e suporte prioritário."
    },
    {
      question: "As sessões ao vivo ficam gravadas?",
      answer: "Sim, todas as sessões são gravadas e ficam disponíveis para assinantes premium por tempo limitado."
    },
    {
      question: "Posso convidar amigos para a comunidade?",
      answer: "A comunidade é exclusiva para assinantes premium, mas você pode indicar amigos para se juntarem."
    }
  ];

  const handleConfirmSubscription = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const checkoutUrl = `https://checkout-external.com/astrorhythm/trimestral${userId && isValidUserId ? `?userid=${userId}` : ''}`;
      
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
          <div className="max-w-4xl mx-auto">
            
            {/* Header with Popular Badge */}
            <div className="text-center mb-12 relative">
              <div className="inline-flex items-center space-x-2 bg-premium-gradient px-6 py-3 rounded-full shadow-glow mb-6 animate-fade-up">
                <Crown className="h-6 w-6 text-astro-space" />
                <span className="font-bold text-astro-space">MAIS POPULAR</span>
              </div>
              <h1 className="text-cosmic-lg text-astro-white mb-6 animate-fade-up animate-stagger-1">
                Plano Trimestral
              </h1>
              <p className="text-lg text-astro-light animate-fade-up animate-stagger-2">
                A escolha dos exploradores sérios. Melhor relação custo-benefício para sua jornada.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Plan Details */}
              <div className="space-y-8">
                
                {/* Pricing Card */}
                <CosmicCard variant="premium" className="text-center animate-fade-up animate-stagger-3">
                  <div className="space-y-6">
                    <div className="flex items-center justify-center space-x-2">
                      <Star className="h-8 w-8 text-astro-space" />
                      <h2 className="text-cosmic-sm text-astro-space">Plano Trimestral</h2>
                    </div>
                    
                    <div>
                      <div className="text-5xl font-space font-bold text-astro-space">
                        R$ 26,99
                      </div>
                      <div className="text-astro-space/70">por 3 meses</div>
                    </div>
                    
                    <div className="text-astro-space font-semibold">
                      Equivale a R$ 8,99 por mês
                    </div>
                  </div>
                </CosmicCard>

                {/* User ID Status */}
                {userId && (
                  <CosmicCard 
                    variant={isValidUserId ? "glass" : "default"} 
                    className="animate-fade-up animate-stagger-4"
                  >
                    <div className="flex items-center space-x-3">
                      {isValidUserId ? (
                        <>
                          <User className="h-6 w-6 text-astro-cyan" />
                          <div>
                            <p className="text-astro-white font-semibold">ID do usuário detectado</p>
                            <p className="text-astro-light text-sm">
                              Sua assinatura será vinculada automaticamente à sua conta
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-6 w-6 text-astro-coral" />
                          <div>
                            <p className="text-astro-white font-semibold">ID inválido detectado</p>
                            <p className="text-astro-light text-sm">
                              Você ainda pode prosseguir com a assinatura normalmente
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </CosmicCard>
                )}

                {/* Features List */}
                <CosmicCard className="animate-fade-up animate-stagger-5">
                  <h3 className="text-xl font-space font-semibold text-astro-white mb-6">
                    Recursos incluídos:
                  </h3>
                  <div className="space-y-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-astro-cyan flex-shrink-0 mt-0.5" />
                        <span className="text-astro-light">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CosmicCard>

              </div>

              {/* Action Panel */}
              <div className="space-y-8">
                
                {/* CTA Card */}
                <CosmicCard className="text-center animate-fade-up animate-stagger-7">
                  <div className="space-y-6">
                    <h3 className="text-xl font-space font-bold text-astro-white">
                      Melhor Custo-Benefício
                    </h3>
                    <p className="text-astro-light">
                      O plano mais popular. Ideal para quem quer se aprofundar na prática cósmica.
                    </p>
                    <Button 
                      variant="cosmic"
                      size="hero"
                      className="w-full"
                      onClick={handleConfirmSubscription}
                      disabled={isLoading}
                    >
                      {isLoading ? "Processando..." : "Confirmar Assinatura"}
                    </Button>
                    <p className="text-xs text-astro-muted">
                      Renovação automática. Cancele quando quiser.
                    </p>
                  </div>
                </CosmicCard>

                {/* Benefits */}
                <CosmicCard variant="glass" className="animate-fade-up animate-stagger-8">
                  <h3 className="text-lg font-space font-semibold text-astro-white mb-4">
                    Por que escolher o trimestral?
                  </h3>
                    <div className="space-y-3 text-astro-light">
                      <p>• <strong>Melhor relação custo-benefício</strong></p>
                      <p>• Todos os recursos premium incluídos</p>
                      <p>• Pagamento trimestral conveniente</p>
                      <p>• Suporte prioritário</p>
                      <p>• Tempo ideal para formar o hábito</p>
                    </div>
                </CosmicCard>

                {/* Other Plans */}
                <CosmicCard className="animate-fade-up animate-stagger-9">
                  <h3 className="text-lg font-space font-semibold text-astro-white mb-4">
                    Comparar outros planos
                  </h3>
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate('/mensal')}
                    >
                      Plano Mensal - R$ 9,99/mês
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full"
                      onClick={() => navigate('/anual')}
                    >
                      Plano Anual - R$ 89,99/ano
                    </Button>
                  </div>
                </CosmicCard>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-16">
              <h2 className="text-cosmic-md text-astro-white text-center mb-12">
                Perguntas sobre o Plano Trimestral
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

export default Trimestral;
