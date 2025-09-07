import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CosmicCard } from "@/components/ui/cosmic-card";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    document.title = "Página não encontrada - AstroRhythm Premium";
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            
            {/* Error Number */}
            <div className="mb-8">
              <h1 className="text-8xl font-space font-bold text-astro-purple animate-fade-up">
                404
              </h1>
            </div>
            
            {/* Error Message */}
            <CosmicCard className="mb-8 animate-fade-up animate-stagger-1">
              <div className="space-y-6">
                <h2 className="text-cosmic-md text-astro-white">
                  Página Não Encontrada
                </h2>
                
                <p className="text-lg text-astro-light">
                  Ops! Parece que você se perdeu no cosmos. A página que você está 
                  procurando não existe ou foi movida para outro sistema solar.
                </p>
                
                <div className="flex items-center justify-center space-x-2 text-astro-muted">
                  <Search className="h-5 w-5" />
                  <span className="font-mono text-sm">{location.pathname}</span>
                </div>
              </div>
            </CosmicCard>

            {/* Action Buttons */}
            <div className="space-y-4 animate-fade-up animate-stagger-2">
              <Button 
                variant="cosmic" 
                size="lg"
                asChild
                className="w-full max-w-md mx-auto flex items-center space-x-3"
              >
                <Link to="/">
                  <Home className="h-5 w-5" />
                  <span>Voltar ao Início</span>
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                asChild
                className="w-full max-w-md mx-auto"
              >
                <Link to="/planos">
                  Explorar Planos Premium
                </Link>
              </Button>
            </div>

            {/* Helpful Links */}
            <CosmicCard variant="glass" className="mt-12 animate-fade-up animate-stagger-3">
              <div className="space-y-4">
                <h3 className="text-lg font-space font-semibold text-astro-white">
                  Links Úteis
                </h3>
                
                <div className="grid grid-cols-2 gap-4 text-astro-light">
                  <Link 
                    to="/planos" 
                    className="hover:text-astro-cyan transition-colors"
                  >
                    Todos os Planos
                  </Link>
                  <Link 
                    to="/trimestral" 
                    className="hover:text-astro-cyan transition-colors"
                  >
                    Plano Mais Popular
                  </Link>
                  <Link 
                    to="/anual" 
                    className="hover:text-astro-cyan transition-colors"
                  >
                    Melhor Economia
                  </Link>
                  <Link 
                    to="/verified" 
                    className="hover:text-astro-cyan transition-colors"
                  >
                    Verificar Email
                  </Link>
                </div>
              </div>
            </CosmicCard>

            {/* Support Info */}
            <div className="mt-8 text-center text-astro-muted animate-fade-up animate-stagger-4">
              <p className="text-sm">
                Ainda precisa de ajuda? Entre em contato pelo{" "}
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

export default NotFound;
