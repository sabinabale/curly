import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const monitors = await prisma.Monitor.findMany();
  return NextResponse.json(monitors);
}
