import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Achievement from "@/models/Achievement";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const body = await req.json();
    const achievement = await Achievement.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json({ achievement });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    await Achievement.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
