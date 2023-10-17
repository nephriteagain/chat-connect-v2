import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/db/firebase";
import {  doc, writeBatch, arrayUnion } from "firebase/firestore";

import { generateRandomId } from "@/lib/helpers/randomIdGen";

export const createNewChannel = createAsyncThunk(
    'user/newChannel', 
    async ({
        makerId,
        name,
        desc = '',
        type,
        members = []
    }: {
        makerId: string; 
        name: string; 
        type: 'channel'|'group'|'private';
        desc?: string;
        members?: {id:string; role:string}[]
    }) => {
        members.push({id: makerId, role: 'admin'})
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
        try {            
            await batch.commit()
            return rId
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
        const id = generateRandomId(15)
        const msgRef = doc(db, channelId, id)
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
        } catch (error) {
            console.error(error)
        }
    }
)

export const searchChannels = createAsyncThunk(
    'rooms/search',
    async (q: string) => {
        if (q.length === 0) {
            return
        }
        const response = await fetch('/api/search', {
            method: 'POST',
            body: JSON.stringify({search: q}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()        
        return data.result
    }
)

export const joinRoom = createAsyncThunk(
    'room/join',
    async ({userId, roomId}: {userId: string; roomId:string}) => {
        const roomRef = doc(db, 'rooms', roomId)
        const userRef =doc(db, 'users', userId)
        const batch = writeBatch(db)

        batch.update(roomRef, {
            members: arrayUnion({id:userId, role: 'member'})
        })
        batch.update(userRef, {
            channels: arrayUnion(roomId)
        })
        try {
            await batch.commit()
            return roomId
        } catch (error) {
            console.error(error)
        }
    }
)