import { NextResponse } from "next/server"

import { db } from "@/db/firebase"
import { getDocs, query, where, collection, or } from "firebase/firestore"
import type { room, userData } from "@/types"

export async function POST(req: Request) {
    
    const data = await req.json()
    const { search } = data
    if (typeof search === 'string' && search.length !== 0) {
        const roomsColRef = collection(db, 'rooms')
        const userColRef = collection(db, 'users')
        const rq = query(roomsColRef, 
            where('name', '==', search)
        )
        const uq = query(userColRef, 
            or(
                where('email', '==', search),
                where('name', '==', search),
                where('userName', '==', search)
            )
        )
        const roomDocs = await getDocs(rq)
        const userDocs = await getDocs(uq)        
        
        const rooms : room[] = []
        const users : userData[] = []

        roomDocs.forEach(doc => {
            const item = doc.data() as Omit<room,'id'>
            rooms.push({...item, id: doc.id})
        })
        userDocs.forEach(doc => {
            const item = doc.data() as userData
            users.push(item)
        })
        return NextResponse.json({rooms, users}, {status: 200})
    }
    
    return NextResponse.json({status: 400})
}

function getAllRooms(result:(room|userData)[]) {
    return result
}