import { prisma } from "@/utils/prisma";

export async function GET() {
  try {
    const records = await prisma.monitorCheck.findMany({
      take: 10,
      orderBy: {
        timestamp: "desc",
      },
    });

    return Response.json({
      success: true,
      records,
      count: records.length,
    });
  } catch (error) {
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
