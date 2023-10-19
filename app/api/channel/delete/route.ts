import { NextResponse } from 'next/server';
import { db } from '@/db/firebase';
import { doc, writeBatch, getDoc, arrayRemove } from 'firebase/firestore';

import type { room } from '@/types';

export async function POST(req: Request) {
    const { userId, roomId } : {userId:string; roomId:string} = await req.json()
    if (!userId || !roomId) {
        return NextResponse.json({error: 'missing data'}, {status:400})
    }
    const roomRef = doc(db, 'rooms', roomId)
    const bannerRef = doc(db, 'roomBanners', roomId)
    const userRef = doc(db, 'users', userId)

    const document = await getDoc(roomRef)
    if (!document.exists()) {
        return NextResponse.json({error: 'document does not exist'}, {status: 404})
    }
    const data = document.data() as room    
    if (data.makerId !== userId) {
        return NextResponse.json({error: 'user not admin'}, {status: 403})
    }
    const batch = writeBatch(db)
    batch.delete(roomRef)
    batch.delete(bannerRef)
    batch.update(userRef, {
        channels: arrayRemove(`public${roomId}`)
    })
    // delete the room record for each user
    data.members.forEach(m => {
        const userRef = doc(db, 'users', m.id)
        batch.update(userRef, {
            channels: arrayRemove(`public:${roomId}`)
        })
    })
    try {
        await batch.commit()
        return NextResponse.json({roomId}, {status:202})
    } catch (error) {
        console.error(error)
        return NextResponse.json({error: 'server error'}, {status:500})
    }

}