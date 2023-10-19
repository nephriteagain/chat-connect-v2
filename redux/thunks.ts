import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/db/firebase";
import {  doc, writeBatch, arrayUnion, getDoc, arrayRemove } from "firebase/firestore";

import { generateRandomId } from "@/lib/helpers/randomIdGen";
import type { room, userData } from "@/types";

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
        try {
            const response = await fetch('/api/channel/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({makerId, name, desc, type, members})
            })
            const data = await response.json() as Awaited<{id:string}>
            return data.id
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
        const msgRef = doc(db, `public:${channelId}`, id)
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
        const data = await response.json() as Awaited<{rooms: room[]; users:userData[]}>
        return data
    }
)

export const joinRoom = createAsyncThunk(
    'room/join',
    async ({userId, roomId}: {userId: string; roomId:string}) => {
        try {
            const response = await fetch('/api/channel/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userId, roomId})
            })
            const data = await response.json() as Awaited<{roomId:string}>
            return data.roomId
        } catch (error) {
            console.error(error)
        }
        
    }
)

export const deleteRoom = createAsyncThunk(
    'room/delete',
    async ({userId, roomId}: {userId: string; roomId:string}) => {
        try {
            const response = await fetch('/api/channel/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userId, roomId})
            })
            const data = await response.json() as Awaited<{roomId:string}>
            return data.roomId

        } catch (error) {
            console.error(error)
        }
    }
)

export const leaveRoom =  createAsyncThunk(
    'room/leaveRoom',
    async ({userId, roomId}: {userId: string; roomId: string}) => {
        try {
            const response = await fetch('api/channel/leave', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({userId, roomId})
            })
            const data = await response.json() as Awaited<{roomId:string}>
            return data.roomId
        } catch (error) {
            console.error(error)
        }
    }
)