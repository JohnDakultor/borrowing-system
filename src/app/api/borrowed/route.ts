import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const borrows = await prisma.borrow.findMany({
      where: { returnedAt: null },
      include: {
        item: true,
      },
      orderBy: {
        borrowedAt: "desc",
      },
    });

    const formatted = borrows.map((borrow) => ({
      id: borrow.id,
      name: borrow.item.name,
      borrower: borrow.borrower,
      dateBorrowed: borrow.borrowedAt.toISOString().split("T")[0],
      status: "Borrowed",
    }));

    return NextResponse.json(formatted);
  } catch (err) {
    console.error("Fetch Borrowed Error:", err);
    return NextResponse.json({ error: "Failed to fetch borrowed items" }, { status: 500 });
  }
}
