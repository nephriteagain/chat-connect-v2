import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const check = searchParams.get('check')

    if (!check) {
        console.error('missing search params')
        return NextResponse.json({error: 'missing search param'}, {status: 500})
    }

    const colRef = collection(db, 'users')
    const q = query(colRef, where('userName', '==', check))
    try {
        const docs = await getDocs(q)
        if (docs.empty) {
            return NextResponse.json({check:true},{status:200})
        }
        return NextResponse.json({check:false},{status:200})        
    } catch (error) {
        console.error('server error')
        return NextResponse.json({error: 'server error'}, {status: 500})
    }


}