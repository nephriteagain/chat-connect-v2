import { createAsyncThunk } from "@reduxjs/toolkit";

import type { message, room, userData } from "@/types";

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
        try {
            const response = await fetch('/api/message/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({sender, message, channelId})
            })
            const data = await response.json()            
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
        const response = await fetch(`/api/search?search=${q}`)
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

export const editMessage = createAsyncThunk(
    'channel/editMessage',
    async ({userId, roomId, message, newMessage
    } : {
        userId: string;
        roomId: string;
        message: message;
        newMessage:string;
    }) => {
        // editing msg that's not yours?
        if (message.id !== userId) return

        try {
            const payload = {
                sender: userId,
                channelId: roomId,
                message : newMessage,
                messageId: message.id
            }
            const response = await fetch('/api/message/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            const data = await response.json()            
        } catch (error) {
            console.error(error)           
        }
    }
)

export const searchUsers = createAsyncThunk(
    'rooms/userSearch',
    async (q:string) => {
        if (q.length === 0 || q.length > 150) return
        try {
            const response = await fetch(`/api/search/user?search=${q}`)
            const data = await response.json() as Awaited<{users:userData[]}>
            return data.users
        } catch (error) {
            console.error(error)
        }
    }
)