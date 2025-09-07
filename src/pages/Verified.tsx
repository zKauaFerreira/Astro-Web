import { useEffect } from "react";
import { ArrowLeft, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CosmicCard } from "@/components/ui/cosmic-card";
import { VerifiedAnimationPremium } from "@/components/verified-animation-premium";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

/**
 * CONFIGURAÇÃO (Ajuste nas variáveis de ambiente)
 * - NEXT_PUBLIC_EXPO_SCHEME: esquema exp:// para abrir o Expo/Dev client (ex: exp://exp.host/@username/project)
 * - NEXT_PUBLIC_EXPO_WEB: fallback público do projeto no expo.dev (ex: https://expo.dev/@username/project)
 *
 * Exemplo .env:
 * NEXT_PUBLIC_EXPO_SCHEME=exp://exp.host/@your-username/your-project
 * NEXT_PUBLIC_EXPO_WEB=https://expo.dev/@your-username/your-project
 */
const EXPO_SCHEME = "exp://192.168.0.191:8081";
const EXPO_WEB = "exp://192.168.0.191:8081";


const Verified = () => {
  useEffect(() => {
    document.title = "Email Verificado - AstroRhythm";
  }, []);

  const handleReturnToApp = () => {
    // Tentativa de abrir o Expo diretamente (Expo Go / Dev Client).
    // Se não abrir, cairá no EXPO_WEB (página do projeto no expo.dev).
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isAndroid = /android/i.test(ua);
    const isIOS = /iPhone|iPad|iPod/i.test(ua);

    let didOpenApp = false;
    let visibilityListener: (() => void) | null = null;
    let cleanupTimer: number | undefined;

    const openFallback = (url: string) => {
      try {
        window.location.href = url;
      } catch {
        window.open(url, "_blank");
      }
    };

    const markOpened = () => {
      didOpenApp = true;
      if (visibilityListener) {
        document.removeEventListener("visibilitychange", visibilityListener);
        visibilityListener = null;
      }
      if (cleanupTimer) {
        clearTimeout(cleanupTimer);
      }
    };

    // Listen for visibility change (if user switched to Expo app)
    visibilityListener = () => {
      if (document.visibilityState === "hidden") markOpened();
    };
    document.addEventListener("visibilitychange", visibilityListener);

    if (isAndroid) {
      // Android: tentar intent para abrir Expo Go (host.exp.exponent) — se não, fallback web.
      try {
        // Tentativa 1: abrir intent que aponta para package do Expo Go (host.exp.exponent).
        // Ajuste se você tiver um dev client com outro package.
        // Intenção: abrir o Expo/Dev client diretamente.
        const intentUrl = `intent://@open#Intent;scheme=exp;package=host.exp.exponent;S.browser_fallback_url=${encodeURIComponent(
          EXPO_WEB
        )};end`;

        // Navega para intent (muito comum em Android Chrome)
        window.location.href = intentUrl;

        // Se não abriu, depois de um tempo fallback para EXPO_WEB
        cleanupTimer = window.setTimeout(() => {
          if (!didOpenApp) {
            if (visibilityListener) {
              document.removeEventListener("visibilitychange", visibilityListener);
              visibilityListener = null;
            }
            openFallback(EXPO_WEB);
          }
        }, 1200);
      } catch (err) {
        // Em caso de erro, abre fallback
        if (visibilityListener) {
          document.removeEventListener("visibilitychange", visibilityListener);
          visibilityListener = null;
        }
        openFallback(EXPO_WEB);
      }
      return;
    }

    if (isIOS) {
      // iOS: iframe trick para abrir o esquema exp://
      try {
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = EXPO_SCHEME; // ex: exp://exp.host/@username/project
        document.body.appendChild(iframe);

        // fallback para pagina web se app não abrir
        cleanupTimer = window.setTimeout(() => {
          if (!didOpenApp) {
            try {
              iframe.parentNode?.removeChild(iframe);
            } catch {}
            if (visibilityListener) {
              document.removeEventListener("visibilitychange", visibilityListener);
              visibilityListener = null;
            }
            openFallback(EXPO_WEB);
          }
        }, 1200);

        // cleanup em pagehide
        const removeSafe = () => {
          try {
            iframe.parentNode?.removeChild(iframe);
          } catch {}
          if (visibilityListener) document.removeEventListener("visibilitychange", visibilityListener);
          if (cleanupTimer) clearTimeout(cleanupTimer);
        };
        window.addEventListener("pagehide", removeSafe, { once: true });
      } catch (err) {
        if (visibilityListener) {
          document.removeEventListener("visibilitychange", visibilityListener);
          visibilityListener = null;
        }
        openFallback(EXPO_WEB);
      }
      return;
    }

    // Desktop / other: tentar abrir esquema EXPO_SCHEME, depois fallback web
    try {
      window.location.href = EXPO_SCHEME;
      cleanupTimer = window.setTimeout(() => {
        if (!didOpenApp) {
          if (visibilityListener) {
            document.removeEventListener("visibilitychange", visibilityListener);
            visibilityListener = null;
          }
          openFallback(EXPO_WEB);
        }
      }, 1000);
    } catch (err) {
      if (visibilityListener) {
        document.removeEventListener("visibilitychange", visibilityListener);
        visibilityListener = null;
      }
      openFallback(EXPO_WEB);
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden"> {/* evita scroll horizontal */}
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center relative"> {/* relativo garante que elementos posicionados não saiam da tela */}
            
            {/* Success Animation */}
            <div className="mb-12">
              <VerifiedAnimationPremium />
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
                Se o Expo não abrir automaticamente, você será redirecionado para a página do projeto no Expo.
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
