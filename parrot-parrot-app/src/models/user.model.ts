import ROLES_LIST from "@/constants/roles";

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    roles: {
      type: [Number],
      enum: Object.values(ROLES_LIST),
      default: [ROLES_LIST.User],
    },

    profileImage: String,
    bio: String,

    sessions: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          default: () => new mongoose.Types.ObjectId(),
        },
        refreshToken: String,
        deviceInfo: String,
        ipAddress: String,
        userAgent: String,
        createdAt: { type: Date, default: Date.now },
        lastUsed: { type: Date, default: Date.now },
      },
    ],

    resetPasswordIssuedAt: {
      type: Date,
      default: null,
    },

    totalGamesPlayed: {
      type: Number,
      default: 0,
    },

    totalScore: {
      type: Number,
      default: 0,
    },

    badges: {
      type: [String],
      default: [],
    },

    currentRoomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GameRoom",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);

