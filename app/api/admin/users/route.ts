import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import AdminUser from "@/models/AdminUser";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await connectDB();
    const users = await AdminUser.find({}).select("-passwordHash").lean();
    return NextResponse.json({ users });
  } catch {
    return NextResponse.json({ users: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password, role } = await req.json();
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await AdminUser.create({ email, passwordHash, role });
    return NextResponse.json({ user: { ...user.toObject(), passwordHash: undefined } }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
