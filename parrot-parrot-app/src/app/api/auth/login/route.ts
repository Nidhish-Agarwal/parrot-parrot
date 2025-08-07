import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/user.model";
import { checkTokenExists, loginUser } from "@/services/authService";
import bcrypt from "bcryptjs";
import { cookies } from "next/dist/server/request/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function POST (request : NextRequest){
    try {
        await dbConnect();
        const { email, password } = await request.json();

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        // Check if refresh token cookie exists
       const cookieStore = cookies(); // returns a read-only object of cookies
        const existingToken = (await cookieStore).get('jwt')?.value;
        if (existingToken) {
            const tokenCheckResult = await checkTokenExists(existingToken, user);

            if (tokenCheckResult.success) {
                // If token is valid, return new access token
                return NextResponse.json({
                    message: "User already logged in",
                }, {status: 200});
            }
        }

        const userAgent = request.headers.get("user-agent") || "unknown";
        const ipAddress = request.headers.get("x-forwarded-for") || "0.0.0.0";

        const refreshToken = await loginUser(user, userAgent, ipAddress);
        

        // Creating a response object
        const response = NextResponse.json({
            message: "User logged in successfully",
        }, { status: 200 });

        // Set cookie on the response
        response.cookies.set("jwt", refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            path: "/",
        });

        return response;
  }catch(error){
    console.error("Error in login route:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}