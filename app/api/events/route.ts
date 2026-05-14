import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Event from "@/models/Event";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const isPast = searchParams.get("isPast");
    const domain = searchParams.get("domain");

    const query: Record<string, unknown> = {};
    if (type) query.type = type;
    if (isPast !== null) query.isPast = isPast === "true";
    if (domain) query.domains = { $in: [domain] };

    const events = await Event.find(query).sort({ date: -1 }).limit(50).lean();
    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    console.error("GET /api/events error:", error);
    return NextResponse.json({ events: [] }, { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const event = await Event.create(body);
    return NextResponse.json({ event }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
