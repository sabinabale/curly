import { prisma } from "@/utils/prisma";

export async function GET({ params }) {
  try {
    const { monitorId } = params;

    // Find the specific monitor
    const monitor = await prisma.Monitor.findUnique({
      where: {
        id: monitorId,
        isActive: true,
      },
    });

    if (!monitor) {
      return Response.json(
        { success: false, error: "Monitor not found or inactive" },
        { status: 404 }
      );
    }

    // Get the latest check for this monitor
    const latestCheck = await prisma.monitorCheck.findFirst({
      where: {
        monitorId: monitor.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json({
      success: true,
      data: {
        monitor,
        latestCheck,
      },
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
