import { get } from "http";
import { getUserId } from "./userService";
import gameRoomModel from "@/models/gameRoom.model";

import crypto from "crypto";
import gameRoom from "@/lib/interfaces/gameRoom";
import dbConnect from "@/lib/dbConnect";

async function generateUniqueRoomCode() {
  const length = 6;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let code;
  let exists = true;

  while (exists) {
    // Generate random code
    code = Array.from(crypto.randomFillSync(new Uint8Array(length)))
      .map((x) => chars[x % chars.length])
      .join("");

    // Check uniqueness in DB
    exists = !!(await gameRoomModel.exists({ code }));
  }

  return code;
}

export const createNewGame = async () => {
  try {
    const userId = await getUserId();
    if (!userId) {
      throw new Error("User ID is required to create a game");
    }

    const roomCode = await generateUniqueRoomCode();

    const newGame = new gameRoomModel({
      hostUserId: userId,
      roomCode,
    });

    await newGame.save();

    return newGame.roomCode;
  } catch (error) {
    console.error("Error creating new game:", error);
    throw error;
  }
};

export const getGameStatus = async (roomCode: string) => {
  try {
    dbConnect();
    const room: gameRoom | null = await gameRoomModel.findOne({ roomCode });
    if (!room) {
      return null;
    }

    return room.status;
  } catch (error) {
    console.error("Error fetching game status:", error);
    return null;
  }
};
