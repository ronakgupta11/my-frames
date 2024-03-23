import { NextRequest, NextResponse } from "next/server";
import { cronFeed } from "@/utils/fc";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    console.log("body",body)
    const casts = await cronFeed(body.channel, body.nextPage);
    console.log("casts",casts)
    return NextResponse.json(casts);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
}