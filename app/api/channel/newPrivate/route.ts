import { db } from "@/db/firebase";
import { writeBatch, doc, arrayUnion } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { userId, otherUserId, userName, otherUserName } : {
        userId: string; otherUserId: string; userName:string; otherUserName: string;
    } = await req.json() 

    if (!userId || !otherUserId || !userName || !otherUserName) {
        return NextResponse.json({error: 'missing data'}, {status: 400})
    }

    const members = [
        {id: userId, role: 'admin'},
        {id: otherUserId, role: 'admin'}
    ]

    const banner1Ref = doc(db, 'roomBanners', userId)
    const banner2Ref = doc(db, 'roomBanners', otherUserId)
    const room1Ref = doc(db, 'rooms', `${userId}${otherUserId}`)
    const room2Ref = doc(db, 'rooms', `${otherUserId}${userId}`)
    const user1Ref = doc(db, 'users', userId)
    const user2Ref = doc(db, 'users', otherUserId)

    const now = Date.now()
    const batch = writeBatch(db)
    // TODO: add a batch write to the change user name endpoint
    batch.set(banner1Ref, {
        name: otherUserName,
        id: `${userId}${otherUserId}`,
        createdAt: now,
        type: 'private'
    })
    batch.set(banner2Ref, {
        name: userName,
        id: `${otherUserId}${userId}`,
        createdAt: now,
        type: 'private'
    })
    batch.set(room1Ref, {
        name: otherUserName,
        desc: '',
        createdAt: now,
        makerId: userId,
        type: 'private',
        members,
        messages: `${userId}${otherUserId}`
    })
    batch.set(room2Ref, {
        name: userName,
        desc: '',
        createdAt: now,
        makerId: otherUserId,
        type: 'private',
        members,
        messages: `${otherUserId}${userId}`
    })
    batch.update(user1Ref, {
        channels: arrayUnion(`${userId}${otherUserId}`)
    })
    batch.update(user2Ref, {
        channels: arrayUnion(`${otherUserId}${userId}`)
    })
    try {
        await batch.commit()
        return NextResponse.json({id: `${userId}${otherUserId}`}, {status: 201})
    } catch (error) {
        console.error(error)
        return NextResponse.json({error: 'server error'}, {status: 500})
    }

}