import mongoose from "mongoose";
const gameRoomSchema = new mongoose.Schema(
  {
    roomCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    hostUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    players: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        username: String,
        avatar: String,
        score: { type: Number, default: 0 },
        connected: { type: Boolean, default: true },
      },
    ],

    status: {
      type: String,
      enum: ["waiting", "playing", "finished"],
      default: "waiting",
    },

    currentRound: {
      type: Number,
      default: 0,
    },

    totalRounds: {
      type: Number,
      default: 3,
    },

    theme: {
      type: String,
      default: "default", // e.g., pirate, sci-fi
    },

    parrotType: {
      type: String,
      default: "classic",
    },

    rounds: [
      {
        roundNumber: Number,
        originalSentence: String,
        transformedSentence: String,
        guesses: [
          {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            guess: String,
            score: Number,
          },
        ],
        commentary: String,
      },
    ],

    createdAt: {
      type: Date,
      default: Date.now,
    },

    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
      index: { expires: 0 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.GameRoom || mongoose.model("GameRoom", gameRoomSchema);
