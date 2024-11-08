import React from "react";
import { cva } from "class-variance-authority";

const labelVariants = cva("block ml-1 font-normal", {
  variants: {
    variant: {
      auth: "text-white/60 text-[13px]",
      general: "text-white/80 text-sm",
    },
  },
  defaultVariants: {
    variant: "auth",
  },
});

function InputLabel({ children, variant, className, ...props }) {
  return (
    <label className={labelVariants({ variant, className })} {...props}>
      {children}
    </label>
  );
}

export { InputLabel, labelVariants };
export default InputLabel;
