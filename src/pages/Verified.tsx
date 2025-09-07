import { useEffect } from "react";
import { ArrowLeft, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CosmicCard } from "@/components/ui/cosmic-card";
import { VerifiedAnimationPremium } from "@/components/verified-animation-premium";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

const Verified = () => {
  useEffect(() => {
    document.title = "Email Verificado - AstroRhythm";
  }, []);

  const handleReturnToApp = () => {
    // deep link scheme + fallbacks
    const appScheme = "astrorhythm://verified";
    const androidStoreUrl = "https://play.google.com/store/apps/details?id=com.astrorhythm"; // substituir se necessário
    const iosStoreUrl = "https://apps.apple.com/app/idYOUR_APP_ID"; // substituir pelo ID real
    const fallbackWeb = "https://astrorhythm.com"; // fallback web

    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isAndroid = /android/i.test(ua);
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    let didOpenApp = false;
    let visibilityListener: (() => void) | null = null;
    let cleanupTimeout = 0;

    const openFallback = (url: string) => {
      try {
        window.location.href = url;
      } catch (e) {
        window.open(url, "_blank");
      }
    };

    // mark that app was opened when visibility changes
    const markOpened = () => {
      didOpenApp = true;
      // cleanup if needed
      if (visibilityListener) {
        document.removeEventListener("visibilitychange", visibilityListener);
        visibilityListener = null;
      }
      if (cleanupTimeout) {
        clearTimeout(cleanupTimeout);
      }
    };

    if (isAndroid) {
      // Use intent:// for Android (opens app if installed, otherwise Play Store)
      try {
        // Try intent first — this pattern usually opens app when installed.
        const intentUrl = `intent://verified#Intent;scheme=astrorhythm;package=com.astrorhythm;end`;
        // set a listener to detect if document becomes hidden (user left to app)
        visibilityListener = () => {
          if (document.visibilityState === "hidden") markOpened();
        };
        document.addEventListener("visibilitychange", visibilityListener);

        // open intent
        window.location.href = intentUrl;

        // fallback to Play Store after a timeout if app didn't open
        cleanupTimeout = window.setTimeout(() => {
          if (!didOpenApp) {
            // Remove listener and navigate to Play Store
            if (visibilityListener) {
              document.removeEventListener("visibilitychange", visibilityListener);
              visibilityListener = null;
            }
            openFallback(androidStoreUrl);
          }
        }, 1500);
      } catch (err) {
        openFallback(androidStoreUrl);
      }
      return;
    }

    if (isIOS) {
      // iOS: try iframe trick + visibility detection (not 100% reliable across all iOS versions/browsers)
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = appScheme;

      visibilityListener = () => {
        if (document.visibilityState === "hidden") {
          markOpened();
        }
      };
      document.addEventListener("visibilitychange", visibilityListener);

      // append iframe and set fallback
      document.body.appendChild(iframe);

      cleanupTimeout = window.setTimeout(() => {
        if (!didOpenApp) {
          // cleanup iframe and listener
          try {
            if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
          } catch {}
          if (visibilityListener) {
            document.removeEventListener("visibilitychange", visibilityListener);
            visibilityListener = null;
          }
          // fallback to App Store
          openFallback(iosStoreUrl);
        }
      }, 1200);

      // ensure we remove iframe/listener if user navigates away or if app opened
      const removeSafe = () => {
        try {
          if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
        } catch {}
        if (visibilityListener) {
          document.removeEventListener("visibilitychange", visibilityListener);
          visibilityListener = null;
        }
        if (cleanupTimeout) clearTimeout(cleanupTimeout);
      };

      // in case user clicks again or page is unloaded
      window.addEventListener("pagehide", removeSafe, { once: true });

      return;
    }

    // Desktop / other platforms: attempt direct navigation to scheme (may show browser message).
    try {
      // attempt open custom scheme
      window.location.href = appScheme;

      // fallback to web after short timeout
      cleanupTimeout = window.setTimeout(() => {
        if (!didOpenApp) {
          openFallback(fallbackWeb);
        }
      }, 1200);
    } catch {
      openFallback(fallbackWeb);
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
