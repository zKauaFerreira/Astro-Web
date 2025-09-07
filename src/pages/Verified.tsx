import { useEffect } from "react";
import { ArrowLeft, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CosmicCard } from "@/components/ui/cosmic-card";
import { VerifiedAnimation } from "@/components/verified-animation-premium";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

const Verified = () => {
  useEffect(() => {
    // Set page title for better UX
    document.title = "Email Verificado - AstroRhythm";
  }, []);

  const handleReturnToApp = () => {
    // This URL would be provided by the mobile app
    const appDeepLink = "astrorhythm://verified";
    const fallbackUrl = "https://play.google.com/store/apps/details?id=com.astrorhythm";
    
    // Try to open the app, fallback to store if not installed
    window.location.href = appDeepLink;
    
    // Fallback after a short delay
    setTimeout(() => {
      window.location.href = fallbackUrl;
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            
            {/* Success Animation */}
            <div className="mb-12">
              <VerifiedAnimation />
            </div>
            
            {/* Success Message */}
            <CosmicCard variant="premium" className="mb-8 animate-fade-up animate-stagger-1">
              <div className="space-y-6">
                <h1 className="text-cosmic-lg text-astro-space">
                  Email Verificado com Sucesso!
                </h1>
                
                <p className="text-lg text-astro-space">
                  Parabéns! Sua conta foi verificada com sucesso. 
                  Você já pode voltar ao aplicativo e começar sua jornada cósmica.
                </p>
                
                <div className="flex items-center justify-center space-x-2 text-astro-space/70">
                  <Smartphone className="h-5 w-5" />
                  <span>Retorne ao aplicativo para continuar sua jornada cósmica</span>
                </div>
              </div>
            </CosmicCard>

            {/* Return to App Button */}
            <div className="space-y-4 animate-fade-up animate-stagger-2">
              <Button 
                variant="cosmic" 
                size="hero"
                onClick={handleReturnToApp}
                className="w-full max-w-md mx-auto flex items-center space-x-3"
              >
                <ArrowLeft className="h-6 w-6" />
                <span>Voltar ao Aplicativo</span>
              </Button>
              
              <p className="text-astro-muted text-sm">
                Se o aplicativo não abrir automaticamente, você pode baixá-lo nas lojas de aplicativos
              </p>
            </div>

            {/* Additional Info */}
            <CosmicCard variant="glass" className="mt-12 animate-fade-up animate-stagger-3">
              <div className="space-y-4">
                <h3 className="text-lg font-space font-semibold text-astro-white">
                  O que acontece agora?
                </h3>
                
                <div className="space-y-3 text-astro-light">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-astro-cyan flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-astro-space text-sm font-bold">1</span>
                    </div>
                    <p>Sua conta está verificada e pronta para usar</p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-astro-purple flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-astro-white text-sm font-bold">2</span>
                    </div>
                    <p>Agora você pode explorar todos os recursos do AstroRhythm</p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-astro-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-astro-space text-sm font-bold">3</span>
                    </div>
                    <p>Considere um plano premium para desbloquear recursos exclusivos</p>
                  </div>
                </div>
              </div>
            </CosmicCard>

            {/* Support Info */}
            <div className="mt-8 text-center text-astro-muted animate-fade-up animate-stagger-4">
              <p className="text-sm">
                Precisa de ajuda? Entre em contato pelo{" "}
                <a 
                  href="mailto:suporte@astrorhythm.com" 
                  className="text-astro-cyan hover:text-astro-white transition-colors"
                >
                  suporte@astrorhythm.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Verified;