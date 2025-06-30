import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: "admin@example.com" },
    });

    if (existingUser) {
      return NextResponse.json({ message: "Admin already exists." });
    }

    const hashedPassword = await bcrypt.hash("danpisot123", 10);

    await prisma.user.create({
      data: {
        name: "Admin",
        email: "danPisot@gmail.com",
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "✅ Admin user seeded." });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json({ error: "Failed to seed admin" }, { status: 500 });
  }
}
