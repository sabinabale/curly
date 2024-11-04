import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function POST(request) {
  try {
    const { url } = await request.json();

    const latestCheck = await prisma.monitorCheck.findFirst({
      where: { url },
      orderBy: { timestamp: "desc" },
    });

    return NextResponse.json({
      success: true,
      check: latestCheck,
    });
  } catch (error) {
    console.error("Failed to fetch latest check:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch latest check" },
      { status: 500 }
    );
  }
}
