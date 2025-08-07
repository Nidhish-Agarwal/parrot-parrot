'use client';
import useLogout from "@/hooks/useLogout";
import { useRouter } from "next/navigation";
import React from 'react'

function dashboard() {
  const logout = useLogout();
  const router = useRouter();
  return (
    <div>
      Dashboard is here
      <button onClick={()=>{
        logout()
        router.push("/");
        }} className="bg-amber-50 text-black">Logout</button>
    </div>
  )
}

export default dashboard
