import { validateCredentials } from "@/auth.config";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password, action } = body;

  if (action === "signin") {
    const user = await validateCredentials(email, password);
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Set user cookie
    const cookieStore = await cookies();
    cookieStore.set("user", encodeURIComponent(JSON.stringify(user)), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({ user });
  }

  if (action === "signout") {
    const cookieStore = await cookies();
    cookieStore.delete("user");
    return NextResponse.json({ message: "Signed out" });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
