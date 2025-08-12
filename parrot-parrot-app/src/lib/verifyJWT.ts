import { verifyToken } from "./auth";
import { NextRequest, NextResponse } from "next/server";

export function withAuth(handler: (req: NextRequest, user: any) => Promise<NextResponse>) {
  return async function (req: NextRequest) {
    const token = req.cookies.get("jwt")?.value;
    const user = await verifyToken(token || "");

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return handler(req, user.userId);
  };
}
