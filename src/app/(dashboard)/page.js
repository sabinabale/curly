// app/page.tsx
"use client";
import { useEffect, useState } from "react";
import AddMonitorButton from "@/components/monitors/AddMonitorButton";
import Monitor from "@/components/monitors/Monitor";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [monitors, setMonitors] = useState([]);
  const [error, setError] = useState(null);

  const fetchMonitors = async () => {
    const { data, error } = await supabase
      .from("Monitor")
      .select("*")
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("Error fetching monitors:", error);
      setError(error.message);
    } else {
      setMonitors(data || []);
    }
  };

  useEffect(() => {
    fetchMonitors();
  }, []);

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
