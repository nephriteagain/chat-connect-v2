import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db/firebase";
import { collection, query, where, or, getDocs } from "firebase/firestore";
import type { userData } from "@/types";

export async function GET(req:NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const search = searchParams.get('search')
    if (typeof search !== 'string' || search.length === 0 || search.length > 300) {
        return NextResponse.json({error: 'missing query'}, {status: 400})
    }

    const userColRef = collection(db, 'users')    
    const nameQ = query(userColRef, or(
        where('name', '==', search),
        where('userName', '==', search )
    ))
    const emailQ = query(userColRef, where('email', '==', search))
    const atQ = query(userColRef, where('userName', '==', search.substring(1)))

    const matcher = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

    
    const users : userData[] = []

    if (search[0] === '@') {
        const documents = await getDocs(atQ)
        documents.forEach(doc => {
            const item = doc.data() as Omit<userData,'id'>
            users.push({...item, id: doc.id})
        })
    }
    if (search.length < 320 && matcher.test(search)) {
        const documents = await getDocs(emailQ)
        documents.forEach(doc => {
            const item = doc.data() as Omit<userData,'id'>
            users.push({...item, id: doc.id})
        })
    } else {
        const documents = await getDocs(nameQ)
        documents.forEach(doc => {
            const item = doc.data() as Omit<userData,'id'>
            users.push({...item, id: doc.id})
        })
    }
    return NextResponse.json({users}, {status: 200})
}