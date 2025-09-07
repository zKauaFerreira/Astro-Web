import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'space': ['Space Grotesk', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        // AstroRhythm Cosmic Palette
        astro: {
          space: "hsl(var(--astro-space))",
          void: "hsl(var(--astro-void))",
          nebula: "hsl(var(--astro-nebula))",
          purple: "hsl(var(--astro-purple))",
          cyan: "hsl(var(--astro-cyan))",
          coral: "hsl(var(--astro-coral))",
          gold: "hsl(var(--astro-gold))",
          white: "hsl(var(--astro-white))",
          light: "hsl(var(--astro-light))",
          muted: "hsl(var(--astro-muted))",
        },
        // Standard theme mappings
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        'cosmic': '1.25rem',
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'cosmic': 'var(--shadow-cosmic)',
        'glow': 'var(--shadow-glow)',
        'card': 'var(--shadow-card)',
      },
      backdropBlur: {
        'cosmic': '20px',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "bounce-celebrate": {
          "0%, 20%, 53%, 80%, 100%": { transform: "translateY(0) scale(1)" },
          "40%, 43%": { transform: "translateY(-10px) scale(1.1)" },
          "70%": { transform: "translateY(-5px) scale(1.05)" },
          "90%": { transform: "translateY(-2px) scale(1.02)" }
        },
        "confetti": {
          "0%": { transform: "rotate(0deg) translateY(0) scale(1)", opacity: "1" },
          "100%": { transform: "rotate(360deg) translateY(-100vh) scale(0)", opacity: "0" }
        },
        "fall": {
          "0%": { 
            transform: "translateY(-20px) rotate(0deg) scale(1)", 
            opacity: "1" 
          },
          "100%": { 
            transform: "translateY(100vh) rotate(360deg) scale(0.5)", 
            opacity: "0" 
          }
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "bounce-celebrate": "bounce-celebrate 0.6s ease-out",
        "confetti": "confetti 1s ease-out forwards",
        "fall": "fall 1.5s ease-out forwards",
        "shimmer": "shimmer 2s infinite linear",
      },
      transitionTimingFunction: {
        'cosmic': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
