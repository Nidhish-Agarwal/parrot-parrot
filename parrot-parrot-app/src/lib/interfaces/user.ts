import mongoose from 'mongoose';

export interface User
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: string,
    email: string,
    password: string,

    roles: number[],

    profileImage: string,
    bio: string,

    sessions: [
      {
        _id: mongoose.Schema.Types.ObjectId,
        refreshToken: string,
        deviceInfo: string,
        ipAddress: string,
        userAgent: string,
        createdAt: Date,
        lastUsed: Date,
      },
    ],

    totalGamesPlayed: number,

    totalScore: number,

    badges: string[],

    currentRoomId: string,
    createdAt: Date,
  };

