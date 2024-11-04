// utils/cron.js

import { Client } from "@upstash/qstash";

const client = new Client({
  token: process.env.QSTASH_TOKEN,
});

client.schedules.create({
  destination: "https://sabini.io",
  cron: "*/3 * * * *",
});
