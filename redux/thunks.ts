import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/db/firebase";
import { collection, addDoc, getDoc, doc, writeBatch, } from "firebase/firestore";

import { generateRandomId } from "@/lib/helpers/randomIdGen";

export const createNewChannel = createAsyncThunk(
    'user/newChannel', 
    async ({
        makerId,
        name,
        desc = ''
    }: {
        makerId: string; 
        name: string; 
        desc?: string;}) => {
        const rId = generateRandomId(15)
        const bannerRef = doc(db,'roomBanners', rId)
        const roomRef = doc(db, 'rooms', rId)
        const now = Date.now()
        try {
            const batch = writeBatch(db)
            batch.set(bannerRef, {
                name,
                id: rId,
                createdAt: now,
                type: 'channel'
            })
            batch.set(roomRef, {
                name,
                desc,
                createdAt: now,
                makerId,
                type: 'channel',
                members: [{id:makerId, role:"admin"}],
                messages: [],
            })
            await batch.commit()
        } catch (error) {
            console.error(error)
        }        
    }
)