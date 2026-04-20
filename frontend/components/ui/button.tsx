import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useReducedMotion } from "framer-motion";
import { Slot } from "radix-ui";
import { cn } from "lib/utils";

type NativeButtonProps = Omit<
  React.ComponentProps<"button">,
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
>;

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-4xl border-none border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-sky-500 text-white hover:bg-sky-600 shadow-sm shadow-sky-500/30",
        outline:
          "border-sky-500/40 bg-sky-500/10 text-sky-700 dark:text-sky-100 hover:bg-sky-500/20 hover:border-sky-500/60 hover:text-sky-900 dark:hover:text-white aria-expanded:bg-sky-500/20 aria-expanded:text-sky-900 dark:aria-expanded:text-white",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-9 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        xs: "h-6 gap-1 px-2.5 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        lg: "h-10 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-9",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: NativeButtonProps &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const shouldReduceMotion = useReducedMotion();

  if (asChild) {
    return (
      <Slot.Root
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }

  return (
    <motion.button
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      whileHover={
        shouldReduceMotion || props.disabled
          ? undefined
          : {
              y: -1,
              scale: 1.01,
              boxShadow: "0 10px 24px rgba(14, 165, 233, 0.28)",
            }
      }
      whileTap={
        shouldReduceMotion || props.disabled ? undefined : { y: 0, scale: 0.98 }
      }
      transition={
        shouldReduceMotion
          ? undefined
          : { type: "spring", stiffness: 360, damping: 24, mass: 0.6 }
      }
      {...props}
    />
  );
}

export { Button, buttonVariants };
