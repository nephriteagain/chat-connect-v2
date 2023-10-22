import { db } from "@/db/firebase"
import { doc, writeBatch } from "firebase/firestore"
import { NextResponse } from "next/server";

export async  function POST(req:Request) {
    const {sender, channelId, message, messageId } : {
        sender:string;
        channelId:string;
        message:string;
        messageId:string;
    } = await req.json()
    
    if (!sender||!channelId||!message||!messageId) {
        return NextResponse.json({error: 'missing data'}, {status:400})
    }

    const msgRef = doc(db, `${channelId}`,messageId)
    const bannerRef = doc(db, 'roomBanners', channelId)
    const batch = writeBatch(db)
       
    const msg = {     
        id: messageId,
        date: Date.now(),
        sender,
        message,
        edited: true
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