import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db/firebase"
import { doc, writeBatch } from "firebase/firestore"

export async function POST(req: NextRequest) {
    const { sender, receiver, messageId } = await req.json()

    if (!sender||!receiver||!messageId) {
        console.log('missing data', req.url)
        return NextResponse.json({error: 'missing data'}, {status: 400})
    }

    const msgRef1 = doc(db, `${sender}${receiver}`, messageId)
    const msgRef2 = doc(db, `${receiver}${sender}`, messageId)


    const batch = writeBatch(db)

    const msg = {
        message: 'DELETED',
        flags: {
            deleted: true
        }
    }
    batch.update(msgRef1, msg)
    batch.update(msgRef2, msg)

    try {
        await batch.commit()
        return NextResponse.json({status: 200})
    } catch (error) {
        console.error(error)
        return NextResponse.json({error: 'server error'},{status:500})
    }
    
}