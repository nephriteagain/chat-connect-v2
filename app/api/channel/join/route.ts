import { NextResponse } from "next/server";

import { db } from "@/db/firebase";
import { doc, writeBatch, arrayUnion } from "firebase/firestore";

export async function POST(req: Request) {
    const { userId, roomId }: {
        userId:string;
        roomId: string;
    } = await req.json()
    if (!userId || !roomId) {
        return NextResponse.json({error: 'missing data'}, {status:400});        
    }
    const roomRef = doc(db, 'rooms', roomId)
    const userRef =doc(db, 'users', userId)
    const batch = writeBatch(db)

    batch.update(roomRef, {
        members: arrayUnion({id:userId, role: 'member'})
    })
    batch.update(userRef, {
        channels: arrayUnion(`public:${roomId}`)
    })
    try {
        await batch.commit()
        return NextResponse.json({roomId}, {status:200})
    } catch (error) {
        console.error(error)
        return NextResponse.json({error: 'server error'}, {status: 200})
    }
    
}