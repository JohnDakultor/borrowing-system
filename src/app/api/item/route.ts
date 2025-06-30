import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, category, stock } = await req.json();

    if (!name || !category || isNaN(stock)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    await prisma.item.create({
      data: {
        name,
        category,
        stock,
        available: stock > 0,
      },
    });

    return NextResponse.json({ message: "Item added" });
  } catch (err) {
    console.error("Add Item Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const items = await prisma.item.findMany({
      orderBy: { name: "asc" },
      include: {
        borrows: {
          where: { returnedAt: null },
          orderBy: { borrowedAt: "desc" },
          take: 1,
        },
      },
    });

    return NextResponse.json(
  items.map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    stock: item.stock,
    available: item.available,
    latestBorrower: item.borrows[0]?.borrower || null,
    borrowedAt: item.borrows[0]?.borrowedAt || null,
  }))
);

  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}
