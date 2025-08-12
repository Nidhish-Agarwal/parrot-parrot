'use client'

import {Play,  Users } from "lucide-react";
import { useState } from "react";

const MainActions = () => {
  const [joinCode, setJoinCode] = useState('');
  const [selectedGameType, setSelectedGameType] = useState<'create' | 'join'>('join');

  return (
    <div className="mb-12">
      <div className="flex justify-center flex-wrap gap-6 mb-8">
        <button onClick={()=>setSelectedGameType('create')} className="group p-8 bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-3xl border border-green-400/30 hover:from-green-500/30 hover:to-emerald-500/30 transition-all duration-300 transform hover:-translate-y-2">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Play className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Create Game</h3>
          <p className="text-white/70 text-sm">Start a new room with your settings</p>
        </button>

        <button onClick={()=>setSelectedGameType('join')} className="group p-8 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-lg rounded-3xl border border-blue-400/30 hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-300 transform hover:-translate-y-2">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Users className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Join Game</h3>
          <p className="text-white/70 text-sm">Enter a room code to join friends</p>
        </button>


      </div>

      {/* Join Code Input */}
      { selectedGameType == 'join' && <div className="max-w-md mx-auto mb-6">
        <div className="flex space-x-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Enter room code (e.g., ABC123)"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50"
              maxLength={6}
            />
          </div>
          <button 
            disabled={joinCode.length !== 6}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Join
          </button>
        </div>
      </div>}
    </div>
  );
};

export default MainActions;