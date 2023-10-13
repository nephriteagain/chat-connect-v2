import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/db/firebase";
import { collection, addDoc, getDoc, doc, writeBatch, arrayUnion } from "firebase/firestore";

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
        try {            
            await batch.commit()
        } catch (error) {
            console.error(error)
        }        
    }
)

export const sendMessage = createAsyncThunk(
    'channel/sendMessage',
    async ({
        sender, 
        message,
        channelId
    }: {
        sender: string; 
        message:string;
        channelId: string
    }) => {
        if (message.length === 0) return;
        const roomRef = doc(db, 'rooms', channelId)
        const bannerRef = doc(db, 'roomBanners', channelId)
        const batch = writeBatch(db)
        const msg = {
            id: generateRandomId(15),
            date: Date.now(),
            sender,
            message
        }
        batch.update(roomRef, {
            messages: arrayUnion(msg)
        })
        batch.update(bannerRef, {
            lastMessage: msg
        })
        try {
            await batch.commit()        
        } catch (error) {
            console.error(error)
        }
    }
)