import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/user.model";
import { createUser } from "@/services/authService";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {

    try{
        // Connecting to the database
        await dbConnect();

        const { name, email, password } = await request.json();

        if(!name || !email || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        // Validate and create user logic here
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
        return NextResponse.json({ message: "User already exists" }, {status : 409});
        }

        const userAgent = request.headers.get("user-agent") || "unknown";
        const ipAddress = request.headers.get("x-forwarded-for") || "0.0.0.0";

        // Call the createUser function to handle user creation
        const refreshToken  = await createUser(name, email, password, userAgent, ipAddress);

        // Creating a response object
        const response = NextResponse.json({
            message: "User registered successfully",
        }, { status: 201 });

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
        console.error("Error in signup route:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}