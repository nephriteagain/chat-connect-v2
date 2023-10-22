import { NextResponse } from "next/server";

import { writeBatch, doc } from 'firebase/firestore';
import { db } from "@/db/firebase";

import { generateRandomId } from "@/lib/helpers/randomIdGen";

export async function POST(req:Request) {
    const { sender, message, channelId } : {
        sender:string;
        message:string;
        channelId:string
    } = await req.json()
    if (!sender || !message || !channelId) {
        return NextResponse.json({error: 'missing data'}, {status: 400});
    }

    const id = generateRandomId(15)
    const msgRef = doc(db, `${channelId}`, id)
    const bannerRef = doc(db, 'roomBanners', channelId)
    const batch = writeBatch(db)
    const msg = {
        id,
        date: Date.now(),
        sender,
        message
    }
    batch.set(msgRef, msg)
    batch.update(bannerRef, {
        lastMessage: msg
    })
    try {
        await batch.commit()        
        return NextResponse.json({status: 201})
    } catch (error) {
        console.error(error)
        return NextResponse.json({error: 'server error'}, {status: 500})
    }
    
}