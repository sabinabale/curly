import React from "react";

export default function TheContainer({ children }) {
  return (
    <div className="max-w-[1040px] w-full lg:pt-20 mx-auto px-5 py-8">
      {children}
    </div>
  );
}
