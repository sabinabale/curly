import * as React from "react";
import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";
import { Slot } from "@/components/ui/Slot";

const buttonVariants = cva(
  "inline-flex w-fit items-center justify-center whitespace-nowrap rounded-2xl flex-shrink-0 text-[14px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 transition-all duration-200 ease-in-out",
  {
    variants: {
      variant: {
        primary:
          "bg-[#86efac] border-[#4ade80] text-[#052e16] hover:bg-opacity/90 w-fit",
        secondary:
          "border-transparent text-[#86efac] hover:bg-opacity/90 w-fit",
        destructive: "text-red-600 hover:opacity-70",
        link: "text-cyan-600 underline underline-offset-2 hover:text-cyan-800",
        icon: "bg-none border-none hover:opacity-40",
        table:
          "font-[500] text-black/70 hover:text-black w-full text-gray-500 text-sm text-left flex items-center group",
      },
      size: {
        default: "py-1.5 px-3",
        none: "p-0",
        small: "py-1 px-2",
        table: "py-2 px-4",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, onClick, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={onClick}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
