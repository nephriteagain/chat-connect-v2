import { NextResponse, NextRequest } from "next/server"

import { db } from "@/db/firebase"
import { getDocs, query, where, collection, or } from "firebase/firestore"
import type { room, userData } from "@/types"

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const search = searchParams.get('search')
    if (typeof search !== 'string' || search.length === 0) {
        return NextResponse.json({error: 'missing query'}, {status: 400})
    }

    const roomsColRef = collection(db, 'rooms')
    const userColRef = collection(db, 'users')
    const rq = query(roomsColRef, 
        where('name', '==', search)
    )
    // checks is a string is email-like
    const matcher = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

    // search with the '@' symbol
    const uq = search[0] === '@' ? 
        query(userColRef, where(`userName`, '==', `${search.substring(1)}`)) : 
        (search.length < 320 && matcher.test(search)) ?
        query(userColRef, where('email', '==', search)) :
        query(userColRef, 
            or(
                where('name', '==', search),
                where('userName', '==', search),
            )
    )

    const rooms : room[] = []
    const users : userData[] = []

    try {
        const roomDocs = await getDocs(rq)
        const userDocs = await getDocs(uq)      
        roomDocs.forEach(doc => {
            const item = doc.data() as Omit<room,'id'>
            rooms.push({...item, id: doc.id})
        })
        userDocs.forEach(doc => {
            const item = doc.data() as Omit<userData,'id'>
            users.push({...item, id: doc.id})
        })
        return NextResponse.json({rooms, users}, {status: 200})
    } catch (error) {
        console.error(error)
        return NextResponse.json({error: 'server error'}, {status: 500})
    }
          
    


    
    
    
}

