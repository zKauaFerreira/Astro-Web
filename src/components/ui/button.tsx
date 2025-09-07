import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-cosmic text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-astro-purple focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-astro-nebula bg-transparent text-astro-light hover:bg-astro-nebula hover:text-astro-white",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        cosmic: "bg-cosmic-gradient text-astro-white font-semibold hover:shadow-glow hover:scale-105 active:scale-98",
        premium: "bg-premium-gradient text-astro-space font-bold hover:shadow-glow hover:scale-105 active:scale-98",
        glass: "glass text-astro-white border-astro-purple/30 hover:bg-astro-purple/20 hover:border-astro-purple/50",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-cosmic px-4 py-2",
        lg: "h-14 rounded-cosmic px-8 py-4 text-base",
        icon: "h-10 w-10",
        hero: "h-16 rounded-cosmic px-12 py-4 text-lg font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
