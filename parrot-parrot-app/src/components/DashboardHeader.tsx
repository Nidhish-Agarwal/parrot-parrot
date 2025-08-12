"use client";
import { useState } from "react";
import {User} from "@/lib/interfaces/user";
import ProfileOverlay from "./ProfileOverlay";

const DashboardHeader = ({ user } : {user : User | null}) => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="flex items-center justify-between p-6 relative">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full flex items-center justify-center text-2xl animate-pulse shadow-lg">
          🦜
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Parrot Parrot</h1>
          <p className="text-xs text-white/70">Dashboard</p>
        </div>
      </div>
      
      <div className="relative">
         <button
          onMouseEnter={() => setShowProfile(true)}
          onMouseLeave={() => setShowProfile(false)}
          className="flex items-center space-x-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-red-500 p-0.5">
            <img
              src={user?.profileImage}
              alt={user?.name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <span className="text-white font-medium">{user?.name.split(' ')[0]}</span>
        </button>
        
         <div
          onMouseEnter={() => setShowProfile(true)}
          onMouseLeave={() => setShowProfile(false)}
        >
          <ProfileOverlay user={user} isOpen={showProfile} />
        </div>
       </div>
    </header>
  );
};


export default DashboardHeader;