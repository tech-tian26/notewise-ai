import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    return NextResponse.json({
      message: "Upload route working",
      data: body
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    )
  }
}