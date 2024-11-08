// import { verifySignature } from "@upstash/qstash/nextjs";
import { monitorUrl } from "@/utils/monitor";
import { prisma } from "@/utils/prisma";

async function handler(req) {
  try {
    const { url } = await req.json(); // Expect URL in the request body

    // Find the corresponding monitor
    const monitor = await prisma.Monitor.findUnique({
      where: { url },
    });

    if (!monitor) {
      return Response.json(
        { success: false, error: "Monitor not found" },
        { status: 404 }
      );
    }

    // Perform the check with monitor-specific settings
    const result = await monitorUrl(url);

    // Save the check result
    const savedCheck = await prisma.monitorCheck.create({
      data: {
        url,
        statusCode: result.statusCode,
        responseTime: result.responseTime,
        error: result.error,
        monitorId: monitor.id, // Associate with the monitor
      },
    });

    return Response.json({ success: true, data: savedCheck });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// export const POST = verifySignature(handler);

export const POST = handler;
