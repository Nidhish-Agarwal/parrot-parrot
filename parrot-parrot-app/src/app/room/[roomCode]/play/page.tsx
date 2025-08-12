import { getGameStatus } from "@/services/gameService";
import { notFound, redirect } from "next/navigation";

type props = {
  params :Promise<{ roomCode: string }>
}

async function PlayRoom({params} : props) {
    const {roomCode} = await params;
    const roomStatus = await getGameStatus(roomCode);
    
      if (!roomStatus) {
        notFound();
      }
    
      if(roomStatus === 'waiting'){
        redirect(`/room/${roomCode}`)
        
      }
    
      if(roomStatus === "playing"){
       return (
        <div>
          This is the playing room for the game. Enjoy your game.
          Room Code :
          {roomCode}
        </div>
      )
      }
    
      if(roomStatus === "finished"){
        redirect(`/room/${roomCode}/results`); 
      }
    
      notFound();
}

export default PlayRoom;
