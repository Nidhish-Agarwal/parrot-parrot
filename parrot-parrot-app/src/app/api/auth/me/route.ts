import { withAuth } from "@/lib/verifyJWT";
import { getUserDetails } from "@/services/userService";
import { NextResponse } from "next/server";

export const GET = withAuth(async (req, userId) => {
    try{
        
        const user = await getUserDetails(userId);

        return NextResponse.json({ message: "User profile accessed", user }, {status: 200});

    }catch(error){
        if(error instanceof Error) {
            console.error("❌ Error in GET /api/user/me:", error.message);
        }else{
            console.error("❌ Error in GET /api/user/me:", error);
        }

        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
});