import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Achievement from "@/models/Achievement";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const achievements = await Achievement.find({}).sort({ year: -1 }).lean();
    return NextResponse.json({ achievements });
  } catch {
    return NextResponse.json({ achievements: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const achievement = await Achievement.create(body);
    return NextResponse.json({ achievement }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
