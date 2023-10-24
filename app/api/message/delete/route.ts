import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db/firebase";
import { doc, writeBatch } from "firebase/firestore";

export async function POST(req:NextRequest) {
    const { sender, channelId, messageId } : {
        sender:string;
        channelId:string;
        messageId:string;
    } = await req.json()

    if (!sender||!channelId||!messageId) {
        console.log('missing data', req.url)
        return NextResponse.json({error: 'missing data'}, {status:400})
    }

    const msgRef = doc(db, `${channelId}`,messageId)
    const bannerRef = doc(db, 'roomBanners', channelId)
    const batch = writeBatch(db)

    const msg = {
        id: messageId,
        date: Date.now(),
        sender,
        message: 'DELETED',
        flags: {
            deleted:true
        }
    }
    batch.set(msgRef, msg)
    batch.update(bannerRef, {
        lastMessage: msg
    })
    try {
        await batch.commit()
        return NextResponse.json({status: 200})
    } catch (error) {
        console.error(error)
        return NextResponse.json({error: 'server error'},{status:500})
    }
}