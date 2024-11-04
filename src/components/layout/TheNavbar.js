"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function TheNavbar() {
  const pathname = usePathname();
  const navLink = [
    {
      href: "/",
      label: "Monitors",
    },
    {
      href: "/incidents",
      label: "Incidents",
    },
    {
      href: "/status-page",
      label: "Status page",
    },
  ];

  return (
    <nav className="py-16">
      <ul className="flex gap-20">
        {navLink.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`border border-transparent rounded-full px-6 py-3 font-semibold ${
                pathname === link.href
                  ? "bg-[#2F4C39]/90 text-white/90 transition-all duration-500 ease-in-out"
                  : "text-white/40 hover:text-white/90 hover:border-[#2F4C39]/60 transition-all duration-300 ease-in-out"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
