// app/page.tsx
"use client";
import { useEffect, useState } from "react";
import AddMonitorButton from "@/components/monitors/AddMonitorButton";
import Monitor from "@/components/monitors/Monitor";
import { supabase } from "@/utils/supabase";

import { usePathname } from "next/navigation";

export default function Home() {
  const [monitors, setMonitors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetchMonitors = async () => {
      const { data } = await supabase
        .from("Monitor")
        .select("*")
        .order("createdAt", { ascending: false });

      setMonitors(data || []);
      setIsLoading(false);
    };

    fetchMonitors();
  }, [pathname]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <main>
      <AddMonitorButton />
      <ul className="space-y-4">
        {monitors.map((monitor) => (
          <li key={monitor.id}>
            <Monitor monitor={monitor} />
          </li>
        ))}
      </ul>
    </main>
  );
}
