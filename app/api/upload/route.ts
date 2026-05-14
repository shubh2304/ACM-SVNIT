import { NextRequest, NextResponse } from "next/server";

import { uploadImage } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const { base64, folder } = await req.json();
    if (!base64) return NextResponse.json({ error: "No image data" }, { status: 400 });
    const url = await uploadImage(base64, folder || "svnit-acm");
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
