import dbConnect from "@/lib/dbConnect";
import { withAuth } from "@/lib/verifyJWT";
import { createNewGame } from "@/services/gameService";
import { NextResponse } from "next/server";

export const POST = withAuth(async (req, user) => {
  try {
    await dbConnect();
    const roomId = await createNewGame();

    return NextResponse.json(
      { message: "Game created successfully", roomId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating game:", error);
    return NextResponse.json(
      { message: "Error creating game" },
      { status: 500 }
    );
  }
});
