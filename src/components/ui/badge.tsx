import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Custom crowd level badges
        crowdLow:
          "border-emerald-200 bg-emerald-100 text-emerald-700",
        crowdMedium:
          "border-amber-200 bg-amber-100 text-amber-700",
        crowdHigh:
          "border-red-200 bg-red-100 text-red-700",
        // Tourism type badges
        temple:
          "border-temple-gold/30 bg-temple-gold/10 text-temple-gold",
        heritage:
          "border-temple-teal/30 bg-temple-teal/10 text-temple-teal",
        nature:
          "border-emerald-300 bg-emerald-50 text-emerald-700",
        beach:
          "border-sky-300 bg-sky-50 text-sky-700",
        hillStation:
          "border-violet-300 bg-violet-50 text-violet-700",
        food:
          "border-coral/30 bg-coral/10 text-coral",
        // Rating badge
        rating:
          "border-temple-gold/50 bg-temple-gold text-deep-brown font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
