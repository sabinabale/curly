import { createSchedule } from "@/utils/cron";
import { prisma } from "@/utils/prisma";

export async function GET() {
  try {
    const schedule = await createSchedule();
    const savedSchedule = await prisma.monitorCheck.create({
      data: {
        url: "https://sabini.io",
        statusCode: 200,
        responseTime: 0,
        error: null,
      },
    });

    return Response.json({ success: true, schedule, savedSchedule });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
