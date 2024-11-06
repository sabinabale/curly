import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client
let prisma;

// Check if we're in development or production
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // Prevent multiple instances during development
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export { prisma };
