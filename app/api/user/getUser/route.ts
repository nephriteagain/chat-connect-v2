import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/firebase";
import { doc, getDoc } from "firebase/firestore";
import { userData } from "@/types";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const user = searchParams.get('search')

    if (typeof user !== 'string' || user.length === 0 || user.length > 50) {
        return NextResponse.json({error: 'invalid data'}, {status: 400})
    }

    const userRef = doc(db, 'users', user)
    try {
        const document = await getDoc(userRef)
        if (!document.exists()) {
            return NextResponse.json({error: 'user not found'}, {status: 404})
        }
        const userData = document.data() as userData
        return NextResponse.json({user: userData}, {status: 200})
    } catch (error) {
        console.error(error)   
        return NextResponse.json({error: 'server error'}, {status: 500})
    }
}