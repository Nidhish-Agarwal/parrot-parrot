import { getGameStatus } from "@/services/gameService";
import { notFound, redirect } from "next/navigation";

type props = {
  params :Promise<{ roomCode: string }>
}

async function ResultsPage({params} : props) {
    const {roomCode} = await params;
    const roomStatus = await getGameStatus(roomCode);
    
      if (!roomStatus) {
        notFound();
      }
    
      if(roomStatus === 'waiting'){
         redirect(`/room/${roomCode}`);
      }
    
      if(roomStatus === "playing"){
        redirect(`/room/${roomCode}/play`);
      }
    
      if(roomStatus === "finished"){
        return (
        <div>
          This is the results room for the game. Make sure to check the results correctly.
          Room Code :
          {roomCode}
        </div>
      )
      }
    
      notFound();
}

export default ResultsPage
