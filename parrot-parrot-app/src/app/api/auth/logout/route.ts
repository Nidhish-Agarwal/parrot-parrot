import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { logoutUser } from "@/services/authService";
import dbConnect from "@/lib/dbConnect";

export async function GET(request: NextRequest) {
    try {
        await dbConnect();
    
    // Call the logout function
    await logoutUser();

    return NextResponse.json({ message: "Logged out successfully" }, {status: 200});


    } catch (error) {
        if (error instanceof Error) {
            console.error("❌ Error in handleRefreshToken:", error.message);
        } else {
            console.error("❌ Error in handleRefreshToken:", error);
        }
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}