import { Link, useNavigate } from "react-router-dom";
import { Star, Heart } from "lucide-react";

export function Footer() {
  const navigate = useNavigate();
  
  const handleLinkClick = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <footer className="bg-astro-void border-t border-astro-nebula">
      <div className="container mx-auto px-4 py-12">
        <div className="footer-content grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 rounded-full bg-cosmic-gradient">
                <Star className="h-5 w-5 text-astro-white" />
              </div>
              <span className="text-xl font-space font-bold text-astro-white">
                AstroRhythm
              </span>
            </Link>
            <p className="text-astro-muted max-w-sm">
              Conecte-se com o cosmos através da meditação guiada. 
              Transforme seus momentos de contemplação em uma jornada astronômica única.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-space font-semibold text-astro-white">Navegação</h3>
            <div className="space-y-2">
              <button onClick={() => handleLinkClick("/")} className="block text-astro-light hover:text-astro-cyan transition-colors text-left">
                Início
              </button>
              <button onClick={() => handleLinkClick("/planos")} className="block text-astro-light hover:text-astro-cyan transition-colors text-left">
                Planos Premium
              </button>
              <button onClick={() => handleLinkClick("/mensal")} className="block text-astro-light hover:text-astro-cyan transition-colors text-left">
                Plano Mensal
              </button>
              <button onClick={() => handleLinkClick("/trimestral")} className="block text-astro-light hover:text-astro-cyan transition-colors text-left">
                Plano Trimestral
              </button>
              <button onClick={() => handleLinkClick("/anual")} className="block text-astro-light hover:text-astro-cyan transition-colors text-left">
                Plano Anual
              </button>
            </div>
          </div>

          {/* Contact & Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-space font-semibold text-astro-white">Suporte</h3>
            <div className="space-y-2">
              <a href="mailto:suporte@astrorhythm.com" className="block text-astro-light hover:text-astro-cyan transition-colors">
                suporte@astrorhythm.com
              </a>
              <button onClick={() => handleLinkClick("/termos-uso")} className="block text-astro-light hover:text-astro-cyan transition-colors text-left">
                Termos de Uso
              </button>
              <button onClick={() => handleLinkClick("/politica-privacidade")} className="block text-astro-light hover:text-astro-cyan transition-colors text-left">
                Política de Privacidade
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-astro-nebula">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-astro-muted text-sm">
              © 2025 AstroRhythm Premium. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-1 text-astro-muted text-sm">
              <span>Feito com</span>
              <Heart className="h-4 w-4 text-astro-coral" />
              <span>para exploradores do cosmos</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}