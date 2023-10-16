import { NextResponse } from "next/server"

import { db } from "@/db/firebase"
import { getDocs, query, where, collection } from "firebase/firestore"
import type { room } from "@/types"

export async function POST(req: Request) {
    
    const data = await req.json()
    const { search } = data
    if (typeof search === 'string' && search.length !== 0) {
        const colRef = collection(db, 'rooms')
        const q = query(colRef, where('name', '==', search))
        const docs = await getDocs(q)
        if (docs.empty) {
            return NextResponse.json({result: []}, {status:200})
        }
        const result : room[] = []
        docs.forEach(doc => {
            const item = doc.data() as Omit<room,'id'>
            result.push({...item, id: doc.id})
        })
        return NextResponse.json({result}, {status: 200})
    }
    
    return NextResponse.json({status: 400})
}