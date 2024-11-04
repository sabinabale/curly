// app/api/setup-cron/route.js
import { Client } from "@upstash/qstash";

const client = new Client({
  token: process.env.QSTASH_TOKEN,
});

export async function GET() {
  try {
    console.log("Creating QStash schedule...");

    const schedule = await client.schedules.create({
      destination: `${process.env.NEXT_PUBLIC_APP_URL}/api/monitor`,
      cron: "*/3 * * * *",
    });

    // This will show in both browser console and Vercel logs
    console.log("Schedule created:", JSON.stringify(schedule, null, 2));

    // This will show in the browser as formatted JSON
    return Response.json(
      {
        success: true,
        schedule,
        destination: `${process.env.NEXT_PUBLIC_APP_URL}/api/monitor`,
        message:
          "QStash schedule created successfully! Check browser console for full details.",
      },
      {
        headers: {
          // Enable CORS for easier debugging
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Failed to create schedule:", error);
    return Response.json(
      {
        success: false,
        error: error.message,
        details: error.stack,
      },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
  }
}
