import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/firebase";
import {  doc, runTransaction } from "firebase/firestore";
import { userData } from "@/types";

export async function POST(req: NextRequest) {
    const { name, bio = '', userName, userId } : {
        name:string;
        bio:string;
        userName:string;
        userId:string;
    } = await req.json()
    if (!name || !userName || !userName || !userId) {
        console.error('missing data')
        return NextResponse.json({error: 'missing data'}, {status: 400})
    }
    const userRef = doc(db, 'users', userId)
    try {
        const userData = await runTransaction(db, async transaction => {
            try {
                const user = await transaction.get(userRef)
                if (!user.exists()) {
                    throw new Error('user does not exist')
                }
                transaction.update(userRef, {
                    name,
                    bio,
                    userName
                })
                const data = user.data() as Omit<userData,'id'>
                const updatedData = {
                    ...data, 
                    id: user.id, 
                    name,
                    userName,
                    bio
                }
                return updatedData
            } catch (error) {
                throw new Error('transaction error')
            }
        })
        console.log('user update success')
        return NextResponse.json({userData}, {status: 200})
    } catch (error) {
        console.error(error)
        return NextResponse.json({error: 'server error'}, {status: 500})
    }

    return NextResponse.json({'deez nuts': 'deez'})
}