import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, borrower } = await req.json();

    if (!name || !borrower) {
      return NextResponse.json({ error: "Missing name or borrower" }, { status: 400 });
    }

    const item = await prisma.item.findFirst({
      where: { name },
    });

    if (!item || item.stock <= 0) {
      return NextResponse.json({ error: "Item not available" }, { status: 400 });
    }

    await prisma.borrow.create({
      data: {
        borrower,
        itemId: item.id,
      },
    });

    await prisma.item.update({
      where: { id: item.id },
      data: {
        stock: item.stock - 1,
      },
    });

    return NextResponse.json({ message: "Item borrowed successfully" });
  } catch (err) {
    console.error("Borrow Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
