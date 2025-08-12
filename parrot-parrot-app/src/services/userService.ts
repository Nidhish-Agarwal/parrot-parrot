import dbConnect from "@/lib/dbConnect";
import { REFRESH_TOKEN_SECRET } from "@/lib/env";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import userModel from "@/models/user.model";

export const getUserDetails = async (userId?: string) => {
  try {
    await dbConnect();

    if (!userId) {
      userId = (await getUserId()) || undefined;
      if (!userId) {
        throw new Error("User ID is required");
      }
    }

    // Fetching user data from the database
    const user = await userModel.findById(userId);

    return user;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching user details:", error.message);
    } else {
      console.error("Error fetching user details:", error);
    }
  }
};

export const getUserId = async () => {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("jwt")?.value;
    if (!token) {
      console.error("No JWT token found in cookies");
      return null;
    }
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET) as {
      userId: string;
    };
    return decoded.userId;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      console.error("Invalid JWT token:", error.message);
    } else {
      console.error("Error decoding JWT token:", error);
    }
    return null;
  }
};
