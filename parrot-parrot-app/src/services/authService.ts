import userModel from "@/models/user.model";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "@/lib/env";
import { Session } from "@/lib/interfaces/session";
import { cookies } from "next/dist/server/request/cookies";

// Helper function to get device info
const getDeviceInfo = (userAgent : string) => {
  // Simple device detection - you might want to use a library like 'ua-parser-js'
  if (/Mobile|Android|iPhone|iPad/.test(userAgent)) {
    return "Mobile Device";
  } else if (/Windows/.test(userAgent)) {
    return "Windows Computer";
  } else if (/Mac/.test(userAgent)) {
    return "Mac Computer";
  } else if (/Linux/.test(userAgent)) {
    return "Linux Computer";
  }
  return "Unknown Device";
};

export async function createUser(name: string, email: string, password: string, userAgent: string,
  ipAddress: string) : Promise<string> {

    try{
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new userModel({
        name,
        email,
        password: hashedPassword,
        });

        // Save user to DB
        await newUser.save();

        // Generating Refresh Token
        const refreshToken : string = jwt.sign(
        { userId: newUser._id },
        REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
        );

        // Add new session
        const newSession = {
            refreshToken,
            deviceInfo: getDeviceInfo(userAgent),
            ipAddress,
            userAgent,
            createdAt: new Date(),
            lastUsed: new Date(),
        };

        newUser.sessions = [...(newUser.sessions || []), newSession];   
        await newUser.save();

        return refreshToken
    }catch(error){
        console.error("Error in createUser:", error);
        throw new Error("Internal Server Error");
    }
    

}

type CheckTokenResult = 
  | { success: true; accessToken: string; userId: string; roles: string[] }
  | { success: false; reason: string };

export async function checkTokenExists(existingToken: string, user: typeof userModel.prototype) : Promise<CheckTokenResult> { 
      try {
        const decoded = jwt.verify(existingToken, REFRESH_TOKEN_SECRET) as { userId: string };

        if (decoded.userId !== user._id.toString()) {
            // Token's userId does not match
            // Optional: remove stale token from other user's session list
            const previousUser = await userModel.findById(decoded.userId);
            if (previousUser) {
                previousUser.sessions = previousUser.sessions.filter(
                (s : Session) => s.refreshToken !== existingToken);
                await previousUser.save();
            }

            return { success: false, reason: "Refresh token user mismatch" };
        }

        // Check if session exists
        const sessionExists = user.sessions?.some(
            (session : Session) => session.refreshToken === existingToken
        );

        if (!sessionExists) {
            return { success: false, reason: "Valid token but session not found" };
        }

        // Generate a new access token
        const accessToken = jwt.sign(
            { userId: user._id, roles: user.roles },
            ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        return {
            success: true,
            accessToken,
            userId: user._id.toString(),
            roles: user.roles,
        };
      } catch (err) {
        console.warn(
          "Invalid or expired refresh token in login. Continuing fresh login."
        );
        return { success: false, reason: "Invalid or expired refresh token" };
      }
}



export async function loginUser(user: typeof userModel.prototype, userAgent: string, ipAddress: string) : Promise<string> {
    try{
        // Create new refresh token
        const refreshToken = jwt.sign(
        { userId: user._id },
        REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
        );

        // Clean up expired sessions
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        user.sessions =
        user.sessions?.filter((session : Session) => session.createdAt > sevenDaysAgo) ||
        [];

        // Add new session
        const newSession = {
        refreshToken,
        deviceInfo: getDeviceInfo(userAgent),
        ipAddress,
        userAgent,
        createdAt: new Date(),
        lastUsed: new Date(),
        };

        user.sessions.push(newSession);

        // Keep only the latest 5 sessions
        if (user.sessions.length > 5) {
        user.sessions = user.sessions.slice(-5);
        }

        await user.save();

        return refreshToken;
        

    }catch(error){
        console.error("Error in loginUser:", error);
        throw new Error("Internal Server Error");
    }
    
}

type GenerateAccessTokenResponse = {
  success: boolean;
  accessToken?: string;
};

export async function generateAccessToken(refreshToken : string, user: typeof userModel.prototype) : Promise<GenerateAccessTokenResponse> {
    try {
    const session = user.sessions.find((s: Session) => s.refreshToken === refreshToken);

    if (!session) {
      console.warn("here")
      return { success: false };
    }

    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as JwtPayload;

    if (decoded.userId !== user._id.toString()) {
      console.error("User ID mismatch in JWT");
      return { success: false };
    }

    // Update session usage
    session.lastUsed = new Date();
    await user.save();

    const accessToken = jwt.sign(
      { userId: user._id, roles: user.roles },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    return { success: true, accessToken };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in generateAccessToken:", error.message);
    } else {
      console.error("Unknown error in generateAccessToken:", error);
    }
    return { success: false };
  }

}

export async function logoutUser() : Promise<void> {
  try{
    const cookieStore = cookies();
    const refreshToken = (await cookieStore).get("jwt")?.value;

    if(!refreshToken){
      return;
    }

    // Checking the refresh token in DB
    const user = await userModel.findOne({ "sessions.refreshToken": refreshToken });
    if (!user) {
      // Delete the refresh token cookie
      (await cookieStore).delete("jwt");
    
      return;
    }

    // Remove the session with the matching refresh token
    user.sessions = user.sessions.filter(
    (session : Session) => session.refreshToken !== refreshToken
    );

    await user.save();

    // Delete the refresh token cookie
    (await cookieStore).delete("jwt");
  }catch(error){
    if (error instanceof Error) {
      console.error("Error in logoutUser:", error.message);
    } else {
      console.error("Unknown error in logoutUser:", error);
    }
    throw new Error("Internal Server Error");
  }

  
}