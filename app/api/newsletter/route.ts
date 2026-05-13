import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Subscriber from "@/models/Subscriber";
import { sendNewsletterConfirmation } from "@/lib/email";

export async function GET() {
  try {
    await connectDB();
    const subscribers = await Subscriber.find({}).sort({ subscribedAt: -1 }).lean();
    return NextResponse.json({ subscribers });
  } catch {
    return NextResponse.json({ subscribers: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    // Upsert to avoid duplicates
    await Subscriber.findOneAndUpdate({ email }, { email, subscribedAt: new Date() }, { upsert: true, new: true });
    await sendNewsletterConfirmation({ to: email });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
