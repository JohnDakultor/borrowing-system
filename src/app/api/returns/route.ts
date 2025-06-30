import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { borrowId } = await req.json();

    if (!borrowId) {
      return NextResponse.json({ error: "Missing borrowId" }, { status: 400 });
    }

    const borrow = await prisma.borrow.findUnique({
      where: { id: borrowId },
    });

    if (!borrow || borrow.returnedAt) {
      return NextResponse.json({ error: "Borrow record not found or already returned" }, { status: 404 });
    }

    await prisma.borrow.update({
      where: { id: borrowId },
      data: { returnedAt: new Date() },
    });

    await prisma.item.update({
      where: { id: borrow.itemId },
      data: {
        stock: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ message: "Item returned successfully" });
  } catch (err) {
    console.error("Return Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
