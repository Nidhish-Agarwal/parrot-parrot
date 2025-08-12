import { withAuth } from "@/lib/verifyJWT"
import { NextResponse } from "next/server";

export const GET = withAuth (async (req, userToken) => {
    return NextResponse.json({ message: "Protected route accessed", userToken });
})