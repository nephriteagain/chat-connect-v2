import { NextResponse } from 'next/server';
import { db } from '@/db/firebase';
import { doc,  arrayRemove, runTransaction } from 'firebase/firestore';

import type { room } from '@/types';

export async function POST(req: Request) {
    const { userId, roomId } : {userId:string; roomId:string} = await req.json()
    if (!userId || !roomId) {
        return NextResponse.json({error: 'missing data'}, {status:400})
    }
    const roomRef = doc(db, 'rooms', roomId)
    const bannerRef = doc(db, 'roomBanners', roomId)
    const userRef = doc(db, 'users', userId)

    try {
        const transaction = await runTransaction(db, async (transaction) => {
            const document = await transaction.get(roomRef)
            if (!document.exists()) {
                return NextResponse.json({error: 'document does not exist'}, {status: 404})
            }
            const data = document.data() as room
            if (data.makerId !== userId) {
                return NextResponse.json({error: 'user not admin'}, {status: 403})
            }
            transaction.delete(roomRef)
            transaction.delete(bannerRef)
            transaction.update(userRef, {
                channels: arrayRemove(roomId)
            })
            data.members.forEach(m => {
                const userRef = doc(db, 'users', m.id)
                transaction.update(userRef, {
                    channels: arrayRemove(roomId)
                })
            })
            return NextResponse.json({roomId}, {status:202})
        })
        return transaction
    } catch (error) {
        console.error('error')
        return NextResponse.json({error: 'server error'}, {status: 500})
    }    
}