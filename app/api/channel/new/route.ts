import { NextResponse } from "next/server"
import { db } from "@/db/firebase"
import { generateRandomId } from "@/lib/helpers/randomIdGen";
import { doc, writeBatch, arrayUnion } from "firebase/firestore";

export async function POST(req: Request) {

    const {
        makerId,
        name,
        desc = '',
        type,
        members = []
    }: {
        makerId: string;
        name: string;
        type: 'channel'|'group'|'private';
        desc: string;
        members: {id:string;role:'admin'|'mod'|'member'}[]
    } = await req.json()

    if (!makerId || !name || !type || !members) {
        return NextResponse.json({error: 'missing data'},{status:400})        
    }
    members.push({id:makerId, role: 'admin'})
    console.log(members)
    const rId = generateRandomId(15)
    const bannerRef = doc(db,'roomBanners', rId)
    const roomRef = doc(db, 'rooms', rId)
    const userRef = doc(db, 'users', makerId)
    const now = Date.now()
    const batch = writeBatch(db)

    batch.set(bannerRef, {
        name,
        id: rId,
        createdAt: now,
        type,
    })
    batch.set(roomRef, {
        name,
        desc,
        createdAt: now,
        makerId,
        type,
        members,
        messages: rId,
    })
    batch.update(userRef, {
        channels: arrayUnion(rId)
    })
    members.forEach(m => {
        const memberRef =doc(db, 'users', m.id)
        batch.update(memberRef, {
            channels: arrayUnion(rId)
        })
    })
    try {            
        await batch.commit()        
        return NextResponse.json({id: rId}, {status:201})
    } catch (error) {
        console.error(error)
        return NextResponse.json({error: 'server error'},{status:500});
    }    

}