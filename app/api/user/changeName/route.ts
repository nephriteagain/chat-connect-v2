import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db/firebase";
import { doc, updateDoc } from "firebase/firestore";

export async function POST(req:NextRequest) {
    const { userId, newName } : {
        userId:string; 
        newName:string
    } = await req.json()
    if (!userId || !newName) {
        return NextResponse.json({error: 'missing data'}, {status: 400})
    }
    const userRef = doc(db, 'users', userId)

    try {
        await updateDoc(userRef, {
            name: newName
        })
        return NextResponse.json({name: newName})
    } catch (error) {
        console.error(error)
        return NextResponse.json({error: 'server error'}, {status: 500})
    }
    
}