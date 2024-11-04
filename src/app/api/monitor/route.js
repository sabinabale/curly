import { verifySignature } from "@upstash/qstash/dist/nextjs";
import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { monitorUrl } from "@/utils/monitor";

async function handler(request) {
  try {
    // Get URL from request body that Qstash sends
    const { url } = await request.json();

    // Monitor the URL
    const result = await monitorUrl(url);

    // Save the result to database using Prisma
    const savedCheck = await prisma.monitorCheck.create({
      data: {
        url,
        statusCode: result.statusCode,
        responseTime: result.responseTime,
        error: result.error,
      },
    });

    return NextResponse.json({ success: true, data: savedCheck });
  } catch (error) {
    console.error("Monitoring failed:", error);
    return NextResponse.json(
      { success: false, error: "Monitoring failed" },
      { status: 500 }
    );
  }
}

// Wrap the handler with Qstash verification
export const POST = verifySignature(handler);

// Required for Qstash
export const runtime = "nodejs";
