import gameRoom from "@/lib/interfaces/gameRoom";
import { Hash, Users } from "lucide-react";

const LiveRooms = ({ rooms } : {rooms : gameRoom[]}) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
        <Users className="w-5 h-5 text-green-400" />
        <span>Live Rooms</span>
      </h3>
      
      <div className="space-y-3">
        {rooms.map((room) => (
          <div key={room._id.toString()} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Hash className="w-4 h-4 text-green-400" />
                <span className="text-white font-mono font-medium">{room.roomCode}</span>
              </div>
              <div>
                <p className="text-white/60 text-sm">{room.theme} theme</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-white/60 text-sm">{room.players.length}</span>
              <button className="px-3 py-1 bg-green-500/20 text-green-300 rounded-md text-sm hover:bg-green-500/30 transition-colors opacity-0 group-hover:opacity-100">
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2 text-green-300 hover:text-green-200 text-sm font-medium transition-colors">
        Refresh Rooms
      </button>
    </div>
  );
};

export default LiveRooms;