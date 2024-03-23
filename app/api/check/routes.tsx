import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    console.log("body",body)
    const response = await fetch(body.url);
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('text/html')) {
      console.log(true)
    } else {
      console.log(false)
    }
    console.log("res",contentType)
    return NextResponse.json(true);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
}