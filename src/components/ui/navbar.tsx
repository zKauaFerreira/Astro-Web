import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Star } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef(null);
  const overlayRef = useRef(null);
  const navRef = useRef(null);
  const borderRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
      
      // Enhanced gradient border animation forming complete frame
      if (scrolled && borderRef.current) {
        // Só anima se ainda não estiver visível
        const currentOpacity = gsap.getProperty(borderRef.current, "opacity");
        if (currentOpacity === 0) {
          gsap.fromTo(borderRef.current, {
            clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",
            opacity: 0
          }, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            opacity: 1,
            duration: 1.2,
            ease: "power3.out"
          });
        }
      } else if (borderRef.current) {
        // Só anima se ainda estiver visível
        const currentOpacity = gsap.getProperty(borderRef.current, "opacity");
        if (currentOpacity === 1) {
          gsap.to(borderRef.current, {
            clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",
            opacity: 0,
            duration: 0.8,
            ease: "power2.in"
          });
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Enhanced navbar entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current,
        { 
          y: -100, 
          opacity: 0,
          filter: "blur(10px)"
        },
        { 
          y: 0, 
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2, 
          ease: "power3.out",
          delay: 0.3
        }
      );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      // Enhanced menu opening animation
      gsap.fromTo(overlayRef.current, 
        { opacity: 0, backdropFilter: "blur(0px)" },
        { opacity: 1, backdropFilter: "blur(20px)", duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(mobileMenuRef.current,
        { 
          x: "100%", 
          opacity: 0,
          scale: 0.95,
          filter: "blur(5px)"
        },
        { 
          x: "0%", 
          opacity: 1,
          scale: 1,
          filter: "blur(0px)", 
          duration: 0.6, 
          ease: "back.out(1.7)" 
        }
      );
      gsap.fromTo(".mobile-menu-item",
        { 
          opacity: 0, 
          y: 30,
          x: 20,
          scale: 0.9
        },
        { 
          opacity: 1, 
          y: 0,
          x: 0,
          scale: 1, 
          duration: 0.5, 
          stagger: 0.08, 
          delay: 0.3, 
          ease: "back.out(1.5)" 
        }
      );
      document.body.style.overflow = 'hidden';
    } else if (overlayRef.current && mobileMenuRef.current) {
      // Enhanced menu closing animation
      gsap.to(".mobile-menu-item",
        { 
          opacity: 0, 
          y: -20,
          scale: 0.95, 
          duration: 0.2, 
          stagger: 0.05, 
          ease: "power2.in" 
        }
      );
      gsap.to(overlayRef.current, 
        { 
          opacity: 0, 
          backdropFilter: "blur(0px)", 
          duration: 0.3, 
          ease: "power2.in",
          delay: 0.1
        }
      );
      gsap.to(mobileMenuRef.current,
        { 
          x: "100%", 
          opacity: 0,
          scale: 0.95, 
          duration: 0.4, 
          ease: "power2.in",
          delay: 0.1
        }
      );
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navItems = [
    { href: "/", label: "Início" },
    { href: "/planos", label: "Planos" },
  ];

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out border-0",
        isScrolled 
          ? "glass-strong shadow-card backdrop-blur-2xl" 
          : "bg-transparent backdrop-blur-sm"
      )}
      style={{ border: 'none', borderTop: 'none', borderBottom: 'none' }}
    >
      {/* Enhanced animated gradient border - Thin outline only */}
      <div 
        ref={borderRef}
        className="absolute inset-0 opacity-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(138,79,255,0.4) 10%, rgba(78,205,196,0.8) 25%, rgba(138,79,255,0.9) 50%, rgba(78,205,196,0.8) 75%, rgba(138,79,255,0.4) 90%, transparent 100%)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1px',
          borderRadius: '0',
          boxShadow: '0 0 20px rgba(78,205,196,0.3)',
          clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)"
        }}
      />
      
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-full bg-cosmic-gradient">
              <Star className="h-6 w-6 text-astro-white" />
            </div>
            <span className="text-cosmic-sm text-astro-white font-space font-bold">
              AstroRhythm
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-astro-light hover:text-astro-white transition-colors font-medium",
                  location.pathname === item.href && "text-astro-white"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Button variant="cosmic" size="sm" asChild>
              <Link to="/planos">Assinar Premium</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-astro-white hover:text-astro-cyan transition-colors"
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Enhanced Mobile Menu Overlay */}
        <div 
          ref={overlayRef}
          className={cn(
            "fixed inset-0 bg-astro-space/90 md:hidden z-40",
            !isMenuOpen && "pointer-events-none opacity-0"
          )}
          style={{ backdropFilter: isMenuOpen ? "blur(20px)" : "blur(0px)" }}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Enhanced Mobile Menu */}
        <div 
          ref={mobileMenuRef}
          className={cn(
            "fixed top-0 right-0 w-80 h-screen bg-astro-space/95 backdrop-blur-2xl border-l border-astro-purple/30 md:hidden z-50 transform translate-x-full opacity-0 shadow-2xl"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-astro-purple/10 via-astro-void/50 to-astro-cyan/10" />
          
          {/* Enhanced Close Button */}
          <div className="flex justify-end p-6 relative z-10">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-3 text-astro-light hover:text-astro-white hover:bg-astro-purple/40 rounded-full transition-all duration-300 border border-astro-purple/40 hover:border-astro-cyan/60 hover:shadow-lg hover:shadow-astro-purple/30 group"
              aria-label="Fechar menu"
            >
              <X className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
          
          <div className="px-6 py-4 relative z-10">
            <div className="flex flex-col space-y-6">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "mobile-menu-item text-astro-light hover:text-astro-white transition-all duration-300 font-medium py-4 text-lg border-b border-astro-nebula/30 hover:border-astro-purple/50 hover:bg-astro-purple/10 hover:px-4 rounded-lg hover:transform hover:translate-x-2",
                    location.pathname === item.href && "text-astro-cyan border-astro-cyan/50 bg-astro-cyan/10"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Button 
                variant="cosmic" 
                size="lg" 
                className="mobile-menu-item w-full mt-8 hover:scale-105 transition-transform duration-300" 
                asChild
              >
                <Link to="/planos" onClick={() => setIsMenuOpen(false)}>
                  Assinar Premium
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}