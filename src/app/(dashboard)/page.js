"use client";
import { useEffect, useState, Suspense } from "react";
import CreateMonitorButton from "@/components/monitors/CreateMonitorButton";
import TheContainer from "@/components/layout/TheContainer";
import { SkeletonMonitor } from "@/components/ui/Skeleton";
import Monitor from "@/components/monitors/Monitor";
import { supabase } from "@/utils/supabase";
import { usePathname } from "next/navigation";

export default function Home() {
  const [monitors, setMonitors] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchMonitors = async () => {
      const { data } = await supabase
        .from("Monitor")
        .select("*")
        .order("createdAt", { ascending: false });

      setMonitors(data || []);
    };

    fetchMonitors();
  }, [pathname]);

  return (
    <TheContainer>
      <main className="flex flex-col">
        <CreateMonitorButton />
        {monitors === null ? (
          <SkeletonMonitor />
        ) : monitors.length === 0 ? (
          <p className="self-center text-green-200/50 mt-10">
            No monitors set up yet!
          </p>
        ) : (
          <ul className="space-y-4">
            {monitors.map((monitor) => (
              <li key={monitor.id}>
                <Monitor monitor={monitor} />
              </li>
            ))}
          </ul>
        )}
      </main>
    </TheContainer>
  );
}
