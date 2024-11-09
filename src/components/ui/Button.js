import * as React from "react";
import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";
import { Slot } from "@/components/ui/Slot";

const buttonVariants = cva(
  "inline-flex w-fit px-4 font-semibold py-2 items-center justify-center whitespace-nowrap rounded-full flex-shrink-0 text-[14px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 transition-all duration-200 ease-in-out",
  {
    variants: {
      variant: {
        primary:
          "bg-[#86efac] border-[#4ade80] text-[#052e16] hover:bg-opacity-80 w-fit",
        secondary:
          "border-transparent text-[#86efac] hover:bg-opacity-80 w-fit",
        destructive: "text-red-600 hover:opacity-70",
        link: "bg-[#86efac] border-[#4ade80] text-[#052e16] hover:bg-opacity-90 w-fit",
        icon: "bg-none border-none hover:opacity-40",
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
