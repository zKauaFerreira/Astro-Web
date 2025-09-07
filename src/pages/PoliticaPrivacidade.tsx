import { useEffect } from "react";
import { ArrowLeft, Shield, Eye, Lock, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CosmicCard } from "@/components/ui/cosmic-card";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { useNavigate } from "react-router-dom";

const PoliticaPrivacidade = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Política de Privacidade - AstroRhythm";
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
              
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-cosmic-gradient flex items-center justify-center">
                  <Shield className="h-8 w-8 text-astro-white" />
                </div>
              </div>
              
              <h1 className="text-cosmic-lg text-astro-white mb-6 animate-fade-up">
                Política de Privacidade
              </h1>
              <p className="text-lg text-astro-light animate-fade-up animate-stagger-1">
                Sua privacidade é nossa prioridade. Última atualização: Janeiro de 2025
              </p>
            </div>

            {/* Content */}
            <div className="space-y-8">
              
              <CosmicCard className="animate-fade-up animate-stagger-2">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-astro-cyan/20 flex items-center justify-center flex-shrink-0">
                    <UserCheck className="h-5 w-5 text-astro-cyan" />
                  </div>
                  <div>
                    <h2 className="text-xl font-space font-semibold text-astro-white mb-4">
                      1. Informações que Coletamos
                    </h2>
                    <p className="text-astro-light mb-4">
                      Para oferecer a melhor experiência no AstroRhythm, coletamos apenas as informações necessárias:
                    </p>
                    <ul className="list-disc list-inside text-astro-light space-y-2 ml-4">
                      <li><strong>Informações da conta:</strong> E-mail, nome e preferências de meditação</li>
                      <li><strong>Dados de uso:</strong> Sessões realizadas, tempo de meditação e progresso</li>
                      <li><strong>Informações técnicas:</strong> Tipo de dispositivo e sistema operacional</li>
                      <li><strong>Dados de pagamento:</strong> Processados de forma segura por nossos parceiros</li>
                    </ul>
                  </div>
                </div>
              </CosmicCard>

              <CosmicCard className="animate-fade-up animate-stagger-3">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-astro-purple/20 flex items-center justify-center flex-shrink-0">
                    <Eye className="h-5 w-5 text-astro-purple" />
                  </div>
                  <div>
                    <h2 className="text-xl font-space font-semibold text-astro-white mb-4">
                      2. Como Usamos Suas Informações
                    </h2>
                    <p className="text-astro-light mb-4">
                      Suas informações são usadas exclusivamente para:
                    </p>
                    <ul className="list-disc list-inside text-astro-light space-y-2 ml-4">
                      <li>Personalizar sua experiência de meditação</li>
                      <li>Acompanhar seu progresso e estatísticas</li>
                      <li>Enviar notificações sobre eventos astronômicos</li>
                      <li>Processar pagamentos e gerenciar assinaturas</li>
                      <li>Melhorar nossos serviços e desenvolver novos recursos</li>
                      <li>Fornecer suporte técnico quando necessário</li>
                    </ul>
                  </div>
                </div>
              </CosmicCard>

              <CosmicCard className="animate-fade-up animate-stagger-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-astro-gold/20 flex items-center justify-center flex-shrink-0">
                    <Lock className="h-5 w-5 text-astro-gold" />
                  </div>
                  <div>
                    <h2 className="text-xl font-space font-semibold text-astro-white mb-4">
                      3. Proteção de Dados
                    </h2>
                    <p className="text-astro-light mb-4">
                      Levamos a segurança dos seus dados muito a sério:
                    </p>
                    <ul className="list-disc list-inside text-astro-light space-y-2 ml-4">
                      <li>Criptografia de ponta a ponta para dados sensíveis</li>
                      <li>Servidores seguros com certificação SSL</li>
                      <li>Acesso restrito apenas à equipe autorizada</li>
                      <li>Backups automáticos e seguros</li>
                      <li>Monitoramento constante contra ameaças</li>
                    </ul>
                  </div>
                </div>
              </CosmicCard>

              <CosmicCard className="animate-fade-up animate-stagger-5">
                <h2 className="text-xl font-space font-semibold text-astro-white mb-4">
                  4. Compartilhamento de Informações
                </h2>
                <p className="text-astro-light mb-4">
                  Nunca vendemos suas informações pessoais. Compartilhamos dados apenas:
                </p>
                <ul className="list-disc list-inside text-astro-light space-y-2 ml-4">
                  <li>Com processadores de pagamento para transações seguras</li>
                  <li>Com provedores de análise para melhorar o app (dados anonimizados)</li>
                  <li>Quando exigido por lei ou ordem judicial</li>
                  <li>Para proteger nossos direitos e segurança dos usuários</li>
                </ul>
              </CosmicCard>

              <CosmicCard className="animate-fade-up animate-stagger-6">
                <h2 className="text-xl font-space font-semibold text-astro-white mb-4">
                  5. Seus Direitos
                </h2>
                <p className="text-astro-light mb-4">
                  Você tem total controle sobre suas informações:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 glass rounded-lg">
                    <h3 className="font-semibold text-astro-cyan mb-2">Acesso</h3>
                    <p className="text-astro-light text-sm">
                      Veja todos os dados que temos sobre você
                    </p>
                  </div>
                  <div className="p-4 glass rounded-lg">
                    <h3 className="font-semibold text-astro-purple mb-2">Correção</h3>
                    <p className="text-astro-light text-sm">
                      Atualize informações incorretas
                    </p>
                  </div>
                  <div className="p-4 glass rounded-lg">
                    <h3 className="font-semibold text-astro-coral mb-2">Exclusão</h3>
                    <p className="text-astro-light text-sm">
                      Delete sua conta e dados permanentemente
                    </p>
                  </div>
                  <div className="p-4 glass rounded-lg">
                    <h3 className="font-semibold text-astro-gold mb-2">Portabilidade</h3>
                    <p className="text-astro-light text-sm">
                      Exporte seus dados em formato legível
                    </p>
                  </div>
                </div>
              </CosmicCard>

              <CosmicCard className="animate-fade-up animate-stagger-7">
                <h2 className="text-xl font-space font-semibold text-astro-white mb-4">
                  6. Cookies e Analytics
                </h2>
                <p className="text-astro-light mb-4">
                  Usamos cookies e ferramentas de análise para:
                </p>
                <ul className="list-disc list-inside text-astro-light space-y-2 ml-4 mb-4">
                  <li>Manter você conectado ao app</li>
                  <li>Lembrar suas preferências</li>
                  <li>Entender como você usa o AstroRhythm</li>
                  <li>Melhorar nossos recursos e performance</li>
                </ul>
                <p className="text-astro-light">
                  Você pode gerenciar cookies nas configurações do seu dispositivo, mas isso pode afetar algumas funcionalidades.
                </p>
              </CosmicCard>

              <CosmicCard className="animate-fade-up animate-stagger-8">
                <h2 className="text-xl font-space font-semibold text-astro-white mb-4">
                  7. Retenção de Dados
                </h2>
                <p className="text-astro-light">
                  Mantemos suas informações apenas pelo tempo necessário para fornecer nossos serviços. 
                  Dados de conta são mantidos enquanto sua conta estiver ativa. Após a exclusão da conta, 
                  seus dados são permanentemente removidos em até 30 dias.
                </p>
              </CosmicCard>

              <CosmicCard className="animate-fade-up animate-stagger-9">
                <h2 className="text-xl font-space font-semibold text-astro-white mb-4">
                  8. Alterações nesta Política
                </h2>
                <p className="text-astro-light">
                  Podemos atualizar esta política ocasionalmente. Quando isso acontecer, notificaremos você 
                  por e-mail e no próprio app. Continuando a usar o AstroRhythm após as mudanças, 
                  você aceita a nova política.
                </p>
              </CosmicCard>

              <CosmicCard variant="glass" className="animate-fade-up animate-stagger-10">
                <div className="text-center">
                  <h2 className="text-xl font-space font-semibold text-astro-white mb-4">
                    Precisa de Ajuda?
                  </h2>
                  <p className="text-astro-light mb-6">
                    Tem dúvidas sobre nossa política de privacidade ou quer exercer seus direitos? 
                    Estamos aqui para ajudar!
                  </p>
                  <Button variant="cosmic" asChild>
                    <a href="mailto:privacidade@astrorhythm.com">
                      Entrar em Contato
                    </a>
                  </Button>
                </div>
              </CosmicCard>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PoliticaPrivacidade;