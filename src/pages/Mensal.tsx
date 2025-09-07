import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Star, Check, AlertCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CosmicCard } from "@/components/ui/cosmic-card";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { useToast } from "@/hooks/use-toast";

const Mensal = () => {
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
      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      const isValid = uuidRegex.test(userIdParam);
      setIsValidUserId(isValid);
      
      if (isValid) {
        toast({
          title: "ID do usuário detectado",
          description: "Suas informações serão vinculadas automaticamente.",
          duration: 3000,
        });
      } else {
        toast({
          title: "ID inválido detectado",
          description: "Você ainda pode prosseguir com a assinatura.",
          variant: "destructive",
          duration: 5000,
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
      question: "Posso mudar de plano depois?",
      answer: "Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento nas configurações do app."
    },
    {
      question: "O pagamento é recorrente?",
      answer: "Sim, a cobrança será feita mensalmente na mesma data da sua assinatura inicial."
    },
    {
      question: "Como funciona o cancelamento?",
      answer: "Você pode cancelar a qualquer momento e continuará tendo acesso até o final do período pago."
    }
  ];

  const handleConfirmSubscription = () => {
    setIsLoading(true);
    
    // Simulate checkout process
    setTimeout(() => {
      const checkoutUrl = `https://checkout-external.com/astrorhythm/mensal${userId && isValidUserId ? `?userid=${userId}` : ''}`;
      
      toast({
        title: "Redirecionando para o checkout",
        description: userId && isValidUserId 
          ? "Seu ID de usuário será incluído automaticamente." 
          : "Você será redirecionado para finalizar o pagamento.",
        duration: 3000,
      });
      
      // In a real app, this would redirect to the actual checkout
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
            
            {/* Header */}
            <div className="text-center mb-12">
            <h1 className="text-cosmic-lg text-astro-white mb-6 animate-fade-up">
              Plano Mensal
            </h1>
              <p className="text-lg text-astro-light animate-fade-up animate-stagger-1">
                Comece sua jornada cósmica com flexibilidade mensal e desconto especial
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Plan Details */}
              <div className="space-y-8">
                
                {/* Pricing Card */}
                <CosmicCard className="text-center animate-fade-up animate-stagger-2">
                  <div className="space-y-6">
                    <div className="flex items-center justify-center space-x-2">
                      <Star className="h-8 w-8 text-astro-gold" />
                      <h2 className="text-cosmic-sm text-astro-white">Plano Mensal</h2>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <span className="text-xl text-astro-muted line-through">R$ 10,99</span>
                        <span className="bg-astro-gold text-astro-space px-3 py-1 rounded-full font-bold text-sm">
                          10% OFF
                        </span>
                      </div>
                      <div className="text-5xl font-space font-bold text-astro-white">
                        R$ 9,99
                      </div>
                      <div className="text-astro-muted">por mês</div>
                    </div>
                    
                    <div className="text-astro-light">
                      Desconto especial de 10% no valor original para novos usuários
                    </div>
                  </div>
                </CosmicCard>

                {/* User ID Status */}
                {userId && (
                  <CosmicCard 
                    variant={isValidUserId ? "glass" : "default"} 
                    className="animate-fade-up animate-stagger-3"
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
                <CosmicCard className="animate-fade-up animate-stagger-4">
                  <h3 className="text-xl font-space font-semibold text-astro-white mb-6">
                    Tudo que está incluído:
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
                <CosmicCard variant="premium" className="text-center animate-fade-up animate-stagger-5">
                  <div className="space-y-6">
                    <h3 className="text-xl font-space font-bold text-astro-space">
                      Pronto para começar?
                    </h3>
                    <p className="text-astro-space">
                      Cancele a qualquer momento. Sem compromissos de longo prazo.
                    </p>
                    <Button 
                      variant="default"
                      size="hero"
                      className="w-full bg-astro-space text-astro-white hover:bg-astro-void"
                      onClick={handleConfirmSubscription}
                      disabled={isLoading}
                    >
                      {isLoading ? "Processando..." : "Confirmar Assinatura"}
                    </Button>
                    <p className="text-xs text-astro-space/70">
                      Pagamento seguro processado por nosso parceiro de confiança
                    </p>
                  </div>
                </CosmicCard>

                {/* Benefits */}
                <CosmicCard className="animate-fade-up animate-stagger-6">
                  <h3 className="text-lg font-space font-semibold text-astro-white mb-4">
                    Por que escolher o plano mensal?
                  </h3>
                  <div className="space-y-3 text-astro-light">
                    <p>• Flexibilidade total para experimentar</p>
                    <p>• Sem compromisso de longo prazo</p>
                    <p>• Acesso imediato a todos os recursos</p>
                    <p>• Suporte completo incluído</p>
                  </div>
                </CosmicCard>

                {/* Other Plans */}
                <CosmicCard variant="glass" className="animate-fade-up animate-stagger-7">
                  <h3 className="text-lg font-space font-semibold text-astro-white mb-4">
                    Quer economizar?
                  </h3>
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate('/trimestral')}
                    >
                      Ver Plano Trimestral - 33% OFF
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate('/anual')}
                    >
                      Ver Plano Anual - 50% OFF
                    </Button>
                  </div>
                </CosmicCard>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-16">
              <h2 className="text-cosmic-md text-astro-white text-center mb-12">
                Perguntas Frequentes
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

export default Mensal;
