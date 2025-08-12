import { withAuth } from "@/lib/verifyJWT";
import { getGameStatus } from "@/services/gameService";
import { NextResponse } from "next/server";

export const GET = withAuth(async (req, user) => {
  try {
    const { searchParams } = new URL(req.url);
    const roomCode = searchParams.get("roomCode");
    if (!roomCode) {
      return NextResponse.json(
        { message: "Room code is required" },
        {
          status: 400,
        }
      );
    }

    const status = await getGameStatus(roomCode);
    if (!status) {
      return NextResponse.json(
        { message: "Game room not found" },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(
      { status },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error checking game status:", error);
    return NextResponse.json(
      { message: "Error checking game status" },
      {
        status: 500,
      }
    );
  }
});
