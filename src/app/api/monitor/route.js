// app/api/monitor/route.js

import { verifySignature } from "@upstash/qstash/nextjs";
import { monitorUrl } from "@/utils/monitor";
import { prisma } from "@/utils/prisma";

async function handler(req) {
  try {
    const TARGET_URL = "https://sabini.io";
    const result = await monitorUrl(TARGET_URL);

    const savedCheck = await prisma.monitorCheck.create({
      data: {
        url: TARGET_URL,
        statusCode: result.statusCode,
        responseTime: result.responseTime,
        error: result.error,
      },
    });

    return Response.json({ success: true, data: savedCheck });
  } catch (error) {
    console.error("Monitor check failed:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export const POST = verifySignature(handler);
