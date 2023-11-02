import { NextRequest, NextResponse } from "next/server";
import { db, storage } from "@/db/firebase";
import {  doc, runTransaction } from "firebase/firestore";
import { ref, uploadString } from 'firebase/storage'
import { userData } from "@/types";

export async function POST(req: NextRequest) {
    const { name, bio = '', userName, userId, profile } : {
        name:string;
        bio:string;
        userName:string;
        userId:string;
        profile:null|{type:string;data:string};
    } = await req.json()
    if (!name || !userName || !userName || !userId) {
        console.error('missing data')
        return NextResponse.json({error: 'missing data'}, {status: 400})
    }
    const userRef = doc(db, 'users', userId)
    const profileURL =   (profile && profile.type === 'image/png')  ? `users/${userId}/profile.png` :   `users/${userId}/profile.jpg`
    const profileRef = ref(storage, profileURL)
    if (profile) {
        try {
            await uploadString(profileRef, profile.data, 'data_url')
            console.log('file upload success!')
        } catch (error) {
            console.error('file upload failed')
            return NextResponse.json({error: 'server error'}, {status: 500})
        }
    }
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
                if (profile) {
                    transaction.update(userRef, {
                        profile: profileURL
                    })
                }
                
                const data = user.data() as Omit<userData,'id'>
                const updatedData = profile ? {
                    ...data, 
                    id: user.id, 
                    name,
                    userName,
                    bio,
                    profile : profileURL
                } : {
                    ...data, 
                    id: user.id, 
                    name,
                    userName,
                    bio,
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

}