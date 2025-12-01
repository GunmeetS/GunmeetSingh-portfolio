import { NextResponse } from "next/server";
import { generateToken, addToken, verifyPassword } from "@/lib/auth";

export async function POST(request) {
  try {
    const { password } = await request.json();

    if (verifyPassword(password)) {
      const token = generateToken();

      addToken(token);

      return NextResponse.json({
        success: true,
        token,
      });
    }

    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  } catch (error) {
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
