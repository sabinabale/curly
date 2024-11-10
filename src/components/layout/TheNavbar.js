"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import GlobeIcon from "@/components/icons/GlobeIcon";
import IncidentIcon from "@/components/icons/IncidentIcon";
import StatusPageIcon from "@/components/icons/StatusPageIcon";

export default function TheNavbar() {
  const pathname = usePathname();
  const navLink = [
    {
      href: "/",
      label: "Monitors",
      svg: <GlobeIcon />,
    },
    {
      href: "/incidents",
      label: "Incidents",
      svg: <IncidentIcon />,
    },
    {
      href: "/status-page",
      label: "Status page",
      svg: <StatusPageIcon />,
    },
  ];

  return (
    <nav className="min-w-[220px] bg-[#2F4C39]/20 h-full px-5 border-r border-r-green-900/30">
      <div className="text-xl font-semibold mb-5 pt-5 text-[#86efac]">
        Curly.
      </div>
      <ul className="flex flex-col gap-2">
        {navLink.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`border border-transparent rounded-lg px-3 h-9 font-semibold flex items-center gap-2 ${
                pathname === link.href
                  ? "bg-[#2F4C39]/50"
                  : "opacity-70 hover:border-[#2F4C39]/60 transition-all duration-300 ease-in-out"
              }`}
            >
              {link.svg} {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
