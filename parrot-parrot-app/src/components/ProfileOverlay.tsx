import useLogout from "@/hooks/useLogout";
import {User} from "@/lib/interfaces/user";
import { Clock, Crown, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const ProfileOverlay = ({ user, isOpen } : {user : User | null , isOpen : boolean }) => {
  if (!isOpen) return null;

  const logout = useLogout();

  const router = useRouter();

  const handleLogout = () => {
    // Implement logout logic here
    logout();
    router.push('/'); // Redirect to login page after logout


   
  };

  return (
    <div className="absolute  right-0 w-80 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl z-50">
      <div className="text-center mb-4">
        <div className="w-20 h-20 rounded-full mx-auto mb-3 bg-gradient-to-br from-yellow-400 to-red-500 p-1">
          <img
            src={user?.profileImage}
            alt={user?.name}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <h3 className="text-xl font-bold text-white mb-1">{user?.name}</h3>
        <p className="text-white/70 text-sm mb-3">{user?.email}</p>
        
      </div>

      <div className="flex justify-center  mb-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-white">{user?.totalGamesPlayed}</p>
          <p className="text-white/70 text-xs">Games</p>
        </div>
        {/* <div className="text-center">
          <p className="text-2xl font-bold text-white">{user.}</p>
          <p className="text-white/70 text-xs">Best Score</p>
        </div> */}
      </div>

      <div className="text-center text-white/60 text-xs mb-4">
        <Clock className="w-3 h-3 inline mr-1" />
        Member since { 
          user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ""
          }
      </div>

      <button onClick={handleLogout} className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg transition-colors">
        <LogOut className="w-4 h-4" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default ProfileOverlay;