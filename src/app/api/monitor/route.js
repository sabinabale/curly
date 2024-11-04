// api/monitor/route.js

import { verifySignature } from "@upstash/qstash/nextjs";
import { monitorUrl } from "@/utils/monitor";
import { prisma } from "@/utils/prisma";

async function handler(req) {
  console.log("Monitor endpoint called");
  try {
    const TARGET_URL = "https://sabini.io";
    console.log("Checking URL:", TARGET_URL);

    const result = await monitorUrl(TARGET_URL);
    console.log("Monitor result:", result);

    console.log("Attempting to save to database...");
    const savedCheck = await prisma.monitorCheck.create({
      data: {
        url: TARGET_URL,
        statusCode: result.statusCode,
        responseTime: result.responseTime,
        error: result.error,
      },
    });
    console.log("Successfully saved to database:", savedCheck);

    return Response.json({ success: true, data: savedCheck });
  } catch (error) {
    console.error("Detailed error:", {
      message: error.message,
      stack: error.stack,
      prismaError: error.code,
    });

    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export const POST = verifySignature(handler);
