import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  // Set session cookie (simple token — you could also use JWT)
  const res = NextResponse.json({ message: "Logged in" });
  res.cookies.set("admin-auth", "authenticated", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 4, // 4 hours
  });

  return res;
}
