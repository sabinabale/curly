// app/page.tsx
import AddMonitorButton from "@/components/monitors/AddMonitorButton";
import Monitor from "@/components/monitors/Monitor";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function Home() {
  const { data: monitors, error } = await supabase
    .from("Monitor")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) {
    console.error("Error fetching monitors:", error);
  }

  return (
    <main>
      <AddMonitorButton />
      <ul className="space-y-4">
        {monitors?.map((monitor) => (
          <li key={monitor.id}>
            <Monitor monitor={monitor} />
          </li>
        ))}
      </ul>
    </main>
  );
}
