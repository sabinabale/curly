import TheContainer from "@/components/layout/TheContainer";
import React from "react";

export default function Page() {
  return (
    <TheContainer>
      <h1 className="mb-10">Status page</h1>
      <div className="border border-[#2F4C39]/60 bg-[#16201D]/50 rounded-lg p-6 space-y-3 w-fit">
        <div className="flex justify-between mb-6 items-center">
          <div>Monitor 1</div>
          <div className="border border-[#2F4C39]/60 bg-[#86efac]/30 text-white/90 rounded-full pl-3 pr-4 py-1.5 leading-none text-xs flex items-center">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 inline-block mr-2"></span>
            Operational
          </div>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 90 }).map((_, index) => (
            <div className="h-5 w-1 rounded bg-[#86efac]" key={index}></div>
          ))}
        </div>
      </div>
      <h2 className="mt-10">Status updates</h2>
    </TheContainer>
  );
}
