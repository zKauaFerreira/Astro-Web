import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CosmicCard } from "@/components/ui/cosmic-card";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { useNavigate } from "react-router-dom";

const TermosUso = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Termos de Uso - AstroRhythm";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-12">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/")}
                className="mb-6 text-astro-light hover:text-astro-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              
              <h1 className="text-cosmic-lg text-astro-white mb-6 animate-fade-up">
                Termos de Uso
              </h1>
              <p className="text-lg text-astro-light animate-fade-up animate-stagger-1">
                Última atualização: Janeiro de 2025
              </p>
            </div>

            {/* Content */}
            <div className="space-y-8">
              
              <CosmicCard className="animate-fade-up animate-stagger-2">
                <h2 className="text-xl font-space font-semibold text-astro-white mb-4">
                  1. Aceite dos Termos
                </h2>
                <p className="text-astro-light mb-4">
                  Ao usar o AstroRhythm, você concorda com estes termos de uso. Se não concordar com algum ponto, 
                  por favor, não utilize nosso aplicativo.
                </p>
                <p className="text-astro-light">
                  Estes termos podem ser atualizados periodicamente. Continuando a usar o app após mudanças, 
                  você aceita automaticamente os novos termos.
                </p>
              </CosmicCard>

              <CosmicCard className="animate-fade-up animate-stagger-3">
                <h2 className="text-xl font-space font-semibold text-astro-white mb-4">
                  2. Sobre o Serviço
                </h2>
                <p className="text-astro-light mb-4">
                  O AstroRhythm é um aplicativo de meditação que conecta práticas de mindfulness com temas astronômicos. 
                  Oferecemos:
                </p>
                <ul className="list-disc list-inside text-astro-light space-y-2 ml-4">
                  <li>Sessões de meditação guiada</li>
                  <li>Acompanhamento de progresso</li>
                  <li>Conteúdo premium sobre astronomia</li>
                  <li>Notificações sobre eventos astronômicos</li>
                </ul>
              </CosmicCard>

              <CosmicCard className="animate-fade-up animate-stagger-4">
                <h2 className="text-xl font-space font-semibold text-astro-white mb-4">
                  3. Assinaturas e Pagamentos
                </h2>
                <p className="text-astro-light mb-4">
                  Oferecemos planos mensais, trimestrais e anuais. As assinaturas são:
                </p>
                <ul className="list-disc list-inside text-astro-light space-y-2 ml-4 mb-4">
                  <li>Renovadas automaticamente</li>
                  <li>Canceláveis a qualquer momento</li>
                  <li>Cobradas no cartão cadastrado</li>
                </ul>
                <p className="text-astro-light">
                  O cancelamento pode ser feito nas configurações do app. Após o cancelamento, 
                  você mantém acesso aos recursos premium até o fim do período pago.
                </p>
              </CosmicCard>

              <CosmicCard className="animate-fade-up animate-stagger-5">
                <h2 className="text-xl font-space font-semibold text-astro-white mb-4">
                  4. Uso Responsável
                </h2>
                <p className="text-astro-light mb-4">
                  Ao usar o AstroRhythm, você se compromete a:
                </p>
                <ul className="list-disc list-inside text-astro-light space-y-2 ml-4">
                  <li>Não compartilhar sua conta com terceiros</li>
                  <li>Manter suas informações de login seguras</li>
                  <li>Usar o app apenas para fins pessoais</li>
                  <li>Não tentar burlar nossos sistemas de segurança</li>
                </ul>
              </CosmicCard>

              <CosmicCard className="animate-fade-up animate-stagger-6">
                <h2 className="text-xl font-space font-semibold text-astro-white mb-4">
                  5. Propriedade Intelectual
                </h2>
                <p className="text-astro-light">
                  Todo o conteúdo do AstroRhythm (áudios, textos, imagens) é protegido por direitos autorais. 
                  É proibido copiar, distribuir ou usar nosso conteúdo fora do aplicativo sem autorização expressa.
                </p>
              </CosmicCard>

              <CosmicCard className="animate-fade-up animate-stagger-7">
                <h2 className="text-xl font-space font-semibold text-astro-white mb-4">
                  6. Limitações e Responsabilidades
                </h2>
                <p className="text-astro-light mb-4">
                  O AstroRhythm é fornecido "como está". Não garantimos que o serviço será ininterrupto ou livre de erros. 
                  Não somos responsáveis por:
                </p>
                <ul className="list-disc list-inside text-astro-light space-y-2 ml-4">
                  <li>Perda de dados ou conteúdo</li>
                  <li>Problemas técnicos temporários</li>
                  <li>Uso inadequado das práticas de meditação</li>
                </ul>
              </CosmicCard>

              <CosmicCard className="animate-fade-up animate-stagger-8">
                <h2 className="text-xl font-space font-semibold text-astro-white mb-4">
                  7. Contato
                </h2>
                <p className="text-astro-light">
                  Dúvidas sobre estes termos? Entre em contato conosco:
                  <br />
                  <a href="mailto:suporte@astrorhythm.com" className="text-astro-cyan hover:text-astro-white transition-colors">
                    suporte@astrorhythm.com
                  </a>
                </p>
              </CosmicCard>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermosUso;