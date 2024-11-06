import Link from "next/link";
import React from "react";
import PlusIcon from "../icons/PlusIcon";

export default function AddMonitorButton() {
  return (
    <Link
      href="/monitor/add-monitor"
      className="button primary icon mb-4 ml-auto"
    >
      <PlusIcon />
      Add monitor
    </Link>
  );
}
