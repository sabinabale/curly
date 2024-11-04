// utils/cron.js

import { Client } from "@upstash/qstash";

const client = new Client({
  token: process.env.QSTASH_TOKEN,
});

export async function createSchedule() {
  return client.schedules.create({
    destination: "https://sabini.io",
    cron: "*/3 * * * *",
  });
}
