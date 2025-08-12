import mongoose from "mongoose";

export default interface gameRoom {
  _id: mongoose.Schema.Types.ObjectId;
  roomCode: string;
  hostUserId: mongoose.Schema.Types.ObjectId;

  players: [
    {
      userId: mongoose.Schema.Types.ObjectId;
      username: string;
      avatar: string;
      score: number;
      connected: boolean;
    }
  ];

  status: "waiting" | "playing" | "finished";

  currentRound: number;

  totalRounds: number;

  theme: string;

  parrotType: string;

  maxPlayers: number;
  roundTimeLimit: number; // in seconds
  language: string;
  allowMidGameJoin: boolean;
  privateRoom: boolean;
  scoreMode: "normal" | "double" | "sudden-death";

  rounds: [
    {
      roundNumber: number;
      originalSentence: string;
      transformedSentence: string;
      guesses: [
        {
          userId: mongoose.Schema.Types.ObjectId;
          guess: string;
          score: number;
        }
      ];
      commentary: string;
    }
  ];

  createdAt: Date;

  expiresAt: Date;
}
