// utils/cron.js

import { Client } from "@upstash/qstash";

const client = new Client({
  token: process.env.QSTASH_TOKEN,
});

export async function createSchedule(frequency, monitorUrl, monitorId) {
  if (!frequency || !monitorUrl || !monitorId) {
    throw new Error("Frequency, monitor URL, and monitor ID are required");
  }

  // Convert frequency from seconds back to minutes for the cron expression
  const frequencyInMinutes = frequency / 60;

  return client.schedules.create({
    destination: `${process.env.NEXT_PUBLIC_APP_URL}/api/monitor`,
    cron: `*/${frequencyInMinutes} * * * *`,
    body: JSON.stringify({
      monitorId,
      url: monitorUrl,
      frequency,
    }),
  });
}
