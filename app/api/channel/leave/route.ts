import { NextResponse } from "next/server";
import { db } from "@/db/firebase";
import { doc, getDoc, writeBatch, arrayRemove } from "firebase/firestore";

import type { room } from "@/types";

export async function POST(req:Request) {
    const { userId, roomId } : {userId:string; roomId:string} = await req.json()

    if (!userId || !roomId) {
        return NextResponse.json({error:'missing data'}, {status: 400})
    }

    const roomRef = doc(db, 'rooms', roomId)
    const userRef = doc(db, 'users', userId)

    const document = await getDoc(roomRef)
    if (!document.exists()) {
        return NextResponse.json({error: 'document does not exist'}, {status: 404})
    }
    const data = document.data() as room
    const members = data.members

    const user = members.find(u => u.id === userId)
    if (!user) {
        return NextResponse.json({error: 'user not a member'}, {status: 403})
    }

    const batch = writeBatch(db)
    const membersUpdated = members.filter(m => m.id !== userId)

    batch.update(roomRef, {
        members: membersUpdated
    })
    batch.update(userRef, {
        channels: arrayRemove(`${roomId}`)
    })
    try {
        await batch.commit()
        return NextResponse.json({roomId}, {status: 202})
    } catch (error) {
        console.error(error)
        return NextResponse.json({error: 'server error'}, {status: 500})
    }

}