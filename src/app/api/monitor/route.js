// export const POST = verifySignature(handler);

import { verifySignature } from "@upstash/qstash/nextjs";
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
    const result = await monitorUrl(url, {
      timeout: monitor.timeout,
      expectedStatusCode: monitor.expectedStatusCode,
    });

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

    // Update monitor's retryCount if there was an error
    if (result.error || result.statusCode !== monitor.expectedStatusCode) {
      await prisma.Monitor.update({
        where: { id: monitor.id },
        data: {
          retryCount: monitor.retryCount + 1,
        },
      });
    } else {
      // Reset retry count if check was successful
      await prisma.Monitor.update({
        where: { id: monitor.id },
        data: {
          retryCount: 0,
        },
      });
    }

    return Response.json({ success: true, data: savedCheck });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export const POST = verifySignature(handler);
