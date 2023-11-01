import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/firebase";
import { runTransaction, doc, arrayUnion } from "firebase/firestore";

export async function POST(req: NextRequest) {

    const { userId, otherUserId, userName, otherUserName } : {
        userId: string; otherUserId: string; userName:string; otherUserName: string;
    } = await req.json()

    if (!userId || !otherUserId || !userName || !otherUserName) {
        return NextResponse.json({error: 'missing data'}, {status: 400})
    }

    const userRef = doc(db, 'users', userId)
    const otherUserRef = doc(db, 'users', otherUserId)
    const roomRef = doc(db, 'rooms', `${userId}${otherUserId}`)

    try {
        const transac = await runTransaction(db, async (transaction) => {
            const values = await Promise.all([
                transaction.get(userRef),
                transaction.get(otherUserRef),
                transaction.get(roomRef)
            ])
            const [ user, other, room ] = values
            if (!user.exists()) {
                console.error('user does not exist')
                return NextResponse.json({error: 'user does not exist'}, {status: 400})
            }
            if (!other.exists()) {
                console.error('otheruser does not exist')
                return NextResponse.json({error: 'otheruser does not exist'}, {status: 400})
            }
            if (room.exists()) {
                console.log('chat already exist')
                return NextResponse.json({},{status:302})
            }

            const members = [
                {id: userId, role: 'admin'},
                {id: otherUserId, role: 'admin'}
            ]

            const banner1Ref = doc(db, 'roomBanners', `${userId}${otherUserId}`)
            const banner2Ref = doc(db, 'roomBanners', `${otherUserId}${userId}`)
            const room1Ref = doc(db, 'rooms', `${userId}${otherUserId}`)
            const room2Ref = doc(db, 'rooms', `${otherUserId}${userId}`)
            const user1Ref = doc(db, 'users', userId)
            const user2Ref = doc(db, 'users', otherUserId)

            const now = Date.now()

            transaction.set(banner1Ref, {
                name: otherUserName,
                id: `${userId}${otherUserId}`,
                createdAt: now,
                type: 'private'
            })
            transaction.set(banner2Ref, {
                name: userName,
                id: `${otherUserId}${userId}`,
                createdAt: now,
                type: 'private'
            })
            transaction.set(room1Ref, {
                name: otherUserName,
                desc: '',
                createdAt: now,
                makerId: userId,
                type: 'private',
                members,
                messages: `${userId}${otherUserId}`
            })
            transaction.set(room2Ref, {
                name: userName,
                desc: '',
                createdAt: now,
                makerId: otherUserId,
                type: 'private',
                members,
                messages: `${otherUserId}${userId}`
            })
            transaction.update(user1Ref, {
                channels: arrayUnion(`${userId}${otherUserId}`)
            })
            transaction.update(user2Ref, {
                channels: arrayUnion(`${otherUserId}${userId}`)
            })
            console.log('private chat created')
            return NextResponse.json({},{status: 302})
        })

        return transac
    } catch (error) {
        console.error(error)   
        return NextResponse.json({error: 'server error'}, {status: 500})
    }
}