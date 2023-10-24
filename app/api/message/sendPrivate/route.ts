import { NextRequest, NextResponse } from "next/server";
import { generateRandomId } from "@/lib/helpers/randomIdGen";
import { db } from "@/db/firebase";
import { writeBatch, doc, } from "firebase/firestore";

export async function POST(req:NextRequest) {
    const { message, senderId, receiverId } : {
        message:string; senderId:string; receiverId:string
    } = await req.json()

    console.log({
        message,
        senderId,
        receiverId
    })
    if (!message || !senderId || !receiverId) {
        return NextResponse.json({error: 'missing data'}, {status: 400})
    }
    const id = generateRandomId(15)
    const msg1Ref = doc(db, `${senderId}${receiverId}`, id)
    const msg2Ref = doc(db, `${receiverId}${senderId}`, id)
    const banner1Ref = doc(db, 'roomBanners', `${senderId}${receiverId}`)
    const banner2Ref = doc(db, 'roomBanners', `${receiverId}${senderId}`)



    const batch = writeBatch(db)
    const msg = {
        id,
        date: Date.now(),
        sender: senderId,
        message
    }
    batch.set(msg1Ref, msg)
    batch.set(msg2Ref, msg)
    batch.update(banner1Ref, {
        lastMessage: msg
    })
    batch.update(banner2Ref, {
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