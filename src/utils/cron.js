// utils/cron.js

import { Client } from "@upstash/qstash";

const client = new Client({
  token: process.env.QSTASH_TOKEN,
});

// utils/cron.js
const schedule = await client.schedules.create({
  destination: `${process.env.NEXT_PUBLIC_APP_URL}/api/monitor`,
  cron: "*/3 * * * *",
});
console.log("Created schedule:", schedule);
