import userModel from "@/models/user.model";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { generateAccessToken } from "@/services/authService";
import dbConnect from "@/lib/dbConnect";

export async function GET(request: NextRequest) {
    try {
        await dbConnect();
    const cookieStore = cookies();
    const refreshToken = (await cookieStore).get("jwt")?.value;

    // Check if refresh token exists
    if (!refreshToken) {
        return NextResponse.json({ message: "No refresh token provided" }, { status: 401 });
    }


    // Find user with matching session token
    const user = await userModel.findOne({ "sessions.refreshToken": refreshToken });
    if (!user) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    const tokenData = await generateAccessToken(refreshToken, user);

    if (!tokenData.success) {
        return NextResponse.json({ message: "Failed to generate access token" }, { status: 403 });
    }

    return NextResponse.json({
        accessToken: tokenData.accessToken,
        userId: user._id,
        roles: user.roles,
    }, { status: 200 });

  } catch (error ) {
    if(error instanceof Error) {
        console.error("❌ Error in handleRefreshToken:", error.message);
    } else {
        console.error("❌ Error in handleRefreshToken:", error);
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}