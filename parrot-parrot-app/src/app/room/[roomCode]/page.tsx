// 'use client'
// import { useSocket } from '@/hooks/useSocket'
// import React from 'react'

import { getGameStatus } from "@/services/gameService"
import { notFound, redirect } from "next/navigation";

type props = {
  params :Promise<{ roomCode: string }>
}

async function WaitingRoom({params}: props) {
  // const socket = useSocket();
  const {roomCode} = await params;
  
  const roomStatus = await getGameStatus(roomCode);

  if (!roomStatus) {
    notFound();
  }

  if(roomStatus === 'waiting'){
    return (
    <div>
      This is the waiting room for the game. Please wait for the host to start the game.
      Room Code :
      {roomCode}
    </div>
  )
  }

  if(roomStatus === "playing"){
    redirect(`/room/${roomCode}/play`);
  }

  if(roomStatus === "finished"){
    redirect(`/room/${roomCode}/results`); 
  }

  notFound();
}

export default WaitingRoom
