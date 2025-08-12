import type {User} from '@/lib/interfaces/user';
import RecentGames from '@/components/RecentGames';
import LiveRooms from '@/components/LiveRooms';
import MainActions from '@/components/MainActions';
import DashboardHeader from '@/components/DashboardHeader';
import { getUserDetails } from '@/services/userService';

const mockRecentGames = [
  { id: 1, score: 850, players: 4, date: "2 hours ago", theme: "Pirate" },
  { id: 2, score: 720, players: 6, date: "1 day ago", theme: "Robot" },
  { id: 3, score: 920, players: 3, date: "2 days ago", theme: "Shakespeare" }
];

const mockLiveRooms = [
  { id: "ABC123", players: "3/6", theme: "Mystical", isPrivate: false },
  { id: "XYZ789", players: "2/4", theme: "Alien", isPrivate: false },
  { id: "DEF456", players: "5/8", theme: "Pirate", isPrivate: true }
];  

// Welcome Section Component
const WelcomeSection = ({ user } : {user : User | null}) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
        Welcome back, {user?.name.split(' ')[0]}! 👋
      </h2>
      <p className="text-xl text-white/80">Ready for some AI-powered chaos?</p>
      <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white mt-4">
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium">89 parrots online now</span>
      </div>
    </div>
  );
};


const Lobby = async () => {

  // Fetching the user details
  const rawUser = await getUserDetails();

  // Ensure only JSON-serializable data is passed
  const user: User = JSON.parse(JSON.stringify(rawUser));

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-8 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-1/3 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Parrots */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-20 left-20 text-4xl animate-bounce" style={{ animationDelay: '0s' }}>🦜</div>
        <div className="absolute top-40 right-32 text-3xl animate-bounce" style={{ animationDelay: '1s' }}>🦜</div>
        <div className="absolute bottom-32 left-40 text-5xl animate-bounce" style={{ animationDelay: '2s' }}>🦜</div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <DashboardHeader user={user} />
        
        <main className="max-w-7xl mx-auto px-6 pb-20">
          <WelcomeSection user={user} />
          <MainActions />
          
          {/* <div className="grid lg:grid-cols-2 gap-8">
            <RecentGames games={mockRecentGames} />
            <LiveRooms rooms={mockLiveRooms} />
          </div> */}
        </main>
      </div>
    </div>
  );
};

export default Lobby;