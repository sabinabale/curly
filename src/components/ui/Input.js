import React from "react";
import { cva } from "class-variance-authority";

const sharedVariants = cva(
  "w-full block border rounded-lg mt-1 px-3 h-[36px] transition-all duration-300 ease-out bg-transparent text-sm",
  {
    variants: {
      variant: {
        general:
          "border-green-300 hover:border-green-500 focus:border-green-500 focus:outline-2 focus:outline-green-300 focus:outline-offset-2",
        error:
          "border-red-500 hover:border-red-600 focus:border-red-600 focus:outline-2 focus:outline-red-600 focus:outline-offset-2",
        success:
          "border-green-500 hover:border-green-600 focus:border-green-600 focus:outline-2 focus:outline-green-600 focus:outline-offset-2",
      },
    },
    defaultVariants: {
      variant: "general",
    },
  }
);

const Input = ({ className, variant, ...props }) => {
  return (
    <input className={sharedVariants({ variant, className })} {...props} />
  );
};

const Select = ({ className, variant, children, ...props }) => {
  return (
    <select className={sharedVariants({ variant, className })} {...props}>
      {children}
    </select>
  );
};

export { Input, Select, sharedVariants };
