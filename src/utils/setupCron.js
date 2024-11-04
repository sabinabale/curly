import { Client } from "@upstash/qstash";

const qstash = new Client({
  token: process.env.QSTASH_TOKEN,
});

export async function scheduleMonitoring(url) {
  await qstash.publishJSON({
    url: "https://curly-seven.vercel.app/api/monitor", // API endpoint
    body: { url: url }, // URL to monitor
    cron: "*/3 * * * *", // Every 5 minutes
  });
}
