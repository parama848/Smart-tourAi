import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-soft hover:shadow-elevated hover:scale-[1.02] active:scale-[0.98]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-soft",
        ghost:
          "hover:bg-muted hover:text-foreground",
        link:
          "text-primary underline-offset-4 hover:underline",
        // Custom Tamil Nadu tourism variants
        hero: 
          "bg-gradient-to-r from-temple-gold to-temple-gold-light text-deep-brown font-bold shadow-gold hover:shadow-elevated hover:scale-[1.02] active:scale-[0.98]",
        heroOutline:
          "border-2 border-temple-gold-light bg-transparent text-temple-gold-light hover:bg-temple-gold-light/20 backdrop-blur-sm",
        teal:
          "bg-gradient-to-r from-temple-teal to-temple-teal-light text-primary-foreground shadow-soft hover:shadow-elevated hover:scale-[1.02]",
        coral:
          "bg-coral text-accent-foreground shadow-soft hover:bg-coral-light hover:scale-[1.02]",
        glass:
          "bg-background/30 backdrop-blur-md border border-border/50 text-foreground hover:bg-background/50",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
