import { NextResponse } from "next/server";
import { db } from "@/db/firebase";
import { doc, arrayRemove, runTransaction } from "firebase/firestore";

import type { room } from "@/types";

export async function POST(req:Request) {
    const { userId, roomId } : {userId:string; roomId:string} = await req.json()

    if (!userId || !roomId) {
        return NextResponse.json({error:'missing data'}, {status: 400})
    }

    const roomRef = doc(db, 'rooms', roomId)
    const userRef = doc(db, 'users', userId)

    try {
        const transaction = await runTransaction(db, async transaction => {
            const document = await transaction.get(roomRef)
            if (!document.exists()) {
                return NextResponse.json({error: 'document does not exist'}, {status: 404})
            }
            const data = document.data() as room;
            const members = data.members;
            const user = members.find(u => u.id === userId)

            if (!user) {
                return NextResponse.json({error: 'user not a member'}, {status:404})
            }

            const membersUpdated = members.filter(m => m.id !== userId)
            transaction.update(roomRef, {
                members: membersUpdated
            })
            transaction.update(userRef, {
                channels: arrayRemove(roomId)
            })
            return NextResponse.json({roomId}, {status:202})
        })
        return transaction
    } catch (error) {
        console.error('error')
        return NextResponse.json({error: 'server error'}, {status: 500})
    }    
}