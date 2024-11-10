import TheContainer from "@/components/layout/TheContainer";
import CheckIcon from "@/components/icons/CheckIcon";
import React from "react";

export default function Page() {
  return (
    <TheContainer>
      <h1 className="mb-10">Status page</h1>
      <div className="border border-[#2F4C39]/60 bg-[#16201D]/80 rounded-xl w-fit">
        <div className="flex justify-between items-center p-6 border-b border-[#2F4C39]/60">
          <div className="text-base font-semibold opacity-70">
            System status
          </div>
          <div className="border border-[#2F4C39]/60 bg-[#86efac]/30 text-white/90 rounded-full pl-3 pr-4 py-1.5 leading-none text-xs flex items-center">
            <span className="h-2 w-2 rounded-full bg-green-300 inline-block mr-2"></span>
            Operational
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex gap-2 items-center">
            <CheckIcon />
            <div>Monitor name</div>
            <div className="ml-auto opacity-70">100% uptime</div>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 90 }).map((_, index) => (
              <div key={index} className="relative group">
                <div className="h-4 w-1 rounded bg-[#86efac] group-hover:-translate-y-0.5 transition-all duration-150 ease-in-out"></div>
                <div className="absolute hidden space-y-2 group-hover:block -top-12 left-1/2 -translate-x-1/2 bg-[#111113] border border-[#2F4C39]/60 text-[#86efac] px-3 py-2 rounded-xl text-xs whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <CheckIcon width={16} height={16} /> Nov 10, 2024
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <h2 className="mt-10">Status updates</h2>
    </TheContainer>
  );
}
