// app/page.tsx
"use client";
import { useEffect, useState } from "react";
import AddMonitorButton from "@/components/monitors/AddMonitorButton";
import Monitor from "@/components/monitors/Monitor";
import { supabase } from "@/utils/supabase";

import { usePathname } from "next/navigation";

export default function Home() {
  const [monitors, setMonitors] = useState([]);
  const [error, setError] = useState(null);
  const pathname = usePathname();

  const fetchMonitors = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from("Monitor")
        .select("*")
        .order("createdAt", { ascending: false });

      if (fetchError) throw fetchError;
      setMonitors(data || []);
    } catch (error) {
      console.error("Error fetching monitors:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchMonitors();
  }, [pathname]);

  return (
    <main>
      <AddMonitorButton />
      {error && <div className="text-red-500 p-4">{error}</div>}
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
