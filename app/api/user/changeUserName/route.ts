import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db/firebase";
import { getDocs, query, collection, where, doc, updateDoc } from "firebase/firestore";
// TODO: make this one a transaction instead and the other ones too
export async function POST(req:NextRequest) {
    const { userId, newUserName } : {
        userId: string;
        newUserName: string;
    } = await req.json()
    if (!userId || !newUserName) {
        return NextResponse.json({error: 'missing data'}, {status: 400});        
    }
    const userRef = doc(db, 'users', userId)
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('userName', '==', newUserName))
    try {
        const docus = await getDocs(q)
        if (!docus.empty) {
            return NextResponse.json({error: 'username already exist'}, {status: 403})
        }
    } catch (error) {
        console.error('error')
        return NextResponse.json({error: 'server error'}, {status: 500})
    }

    try {
        await updateDoc(userRef, {
            userName: newUserName
        })
        return NextResponse.json({userName: newUserName}, {status: 200})
    } catch (error) {
        console.error('error')
        return NextResponse.json({error: 'server error'}, {status: 500})
    }
    
    


    

}