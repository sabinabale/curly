import Link from "next/link";
import React from "react";
import PlusIcon from "../icons/PlusIcon";

export default function CreateMonitorButton() {
  return (
    <Link
      href="/monitor/create-monitor"
      className="button-primary icon mb-4 ml-auto"
    >
      <PlusIcon />
      Create monitor
    </Link>
  );
}
