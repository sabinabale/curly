// app/api/setup-cron/route.js
import { Client } from "@upstash/qstash";

const client = new Client({
  token: process.env.QSTASH_TOKEN,
});

export async function GET() {
  try {
    console.log("Setting up cron job...");
    const schedule = await client.schedules.create({
      destination: `${process.env.NEXT_PUBLIC_APP_URL}/api/monitor`,
      cron: "*/3 * * * *",
    });

    console.log("Cron job created:", schedule);

    return Response.json({
      success: true,
      message: "Cron job scheduled successfully",
      schedule,
    });
  } catch (error) {
    console.error("Failed to setup cron:", error);
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
