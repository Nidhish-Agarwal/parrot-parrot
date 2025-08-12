import gameRoom from "@/lib/interfaces/gameRoom";
import { Trophy } from "lucide-react";

const RecentGames = ({ games } : {games : gameRoom[]}) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
        <Trophy className="w-5 h-5 text-yellow-400" />
        <span>Recent Games</span>
      </h3>
      
      <div className="space-y-3">
        {games.map((game : gameRoom) => (
          <div key={game._id.toString()} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                {game.theme[0]}
              </div>
              <div>
                <p className="text-white font-medium">{game.players[0].score} points</p>
                <p className="text-white/60 text-sm">{game.players.length} players • {game.createdAt.toLocaleDateString()}</p>
              </div>
            </div>
            <div className="text-white/60 text-sm">
              {game.theme}
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2 text-cyan-300 hover:text-cyan-200 text-sm font-medium transition-colors">
        View All Games
      </button>
    </div>
  );
};

export default RecentGames;