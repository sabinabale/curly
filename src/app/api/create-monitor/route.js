import { prisma } from "@/utils/prisma";
import { createSchedule } from "@/utils/cron";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, url, frequency, description } = body;

    // Create the monitor
    const monitor = await prisma.Monitor.create({
      data: {
        name,
        url,
        frequency,
        description,

        isActive: true,
      },
    });

    // Create cron schedule for the new monitor
    const schedule = await createSchedule(frequency, url, monitor.id);

    // Create initial check
    const initialCheck = await prisma.monitorCheck.create({
      data: {
        url: monitor.url,
        statusCode: 200,
        responseTime: 0,
        error: null,
        monitorId: monitor.id,
      },
    });

    return Response.json({
      success: true,
      data: {
        monitor,
        schedule,
        initialCheck,
      },
    });
  } catch (error) {
    if (error.code === "P2002") {
      return Response.json(
        { success: false, error: "URL already being monitored" },
        { status: 400 }
      );
    }
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
