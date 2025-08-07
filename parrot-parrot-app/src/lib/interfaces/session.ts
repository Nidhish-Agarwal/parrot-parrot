import mongoose from "mongoose";

export interface Session  {
        _id: mongoose.Schema.Types.ObjectId,
        refreshToken: String,
        deviceInfo: String,
        ipAddress: String,
        userAgent: String,
        createdAt: Date,
        lastUsed:Date,
      }