import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, SessionData } from "@/lib/session";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // Demo user hardcode
  if (username === "admin" && password === "admin") {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    session.user = { id: 1, name: username };
    await session.save();

    return NextResponse.json({ ok: true, user: session.user });
  }

  return NextResponse.json(
    { ok: false, message: "Invalid credentials" },
    { status: 401 }
  );
}
