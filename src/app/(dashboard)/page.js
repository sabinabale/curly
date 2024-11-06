import Monitor from "@/components/monitors/Monitor";
import { prisma } from "@/utils/prisma";
import AddMonitorButton from "../../components/monitors/AddMonitorButton";

export default async function Home() {
  const monitors = await prisma.Monitor.findMany();

  return (
    <main>
      <AddMonitorButton />
      <ul className="space-y-4">
        {monitors.map((monitor, index) => (
          <li key={index}>
            <Monitor monitor={monitor} />
          </li>
        ))}
      </ul>
    </main>
  );
}
