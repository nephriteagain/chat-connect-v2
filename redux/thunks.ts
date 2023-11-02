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

export const createNewPrivateChat = createAsyncThunk(
    'user/newPrivateChat',
    async ({userId, otherUserId, userName, otherUserName}: {
        userId: string; otherUserId: string; userName:string; otherUserName: string;
    }) => {
        if (!userId || !otherUserId || !userName || !otherUserName) {
            return
        }
        try {
            const response = await fetch('/api/channel/newPrivate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',                    
                },
                body: JSON.stringify({userId, otherUserId, userName, otherUserName})
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
    async ({q,id}:{q:string;id:string}) => {
        if (q.length === 0) {
            return
        }
        const response = await fetch(`/api/search?search=${q}`)
        const data = await response.json() as Awaited<{rooms: room[]; users:userData[]}>
        const filtered = data.users.filter(u => u.id !== id)
        return {rooms: data.rooms, users: filtered}
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
            const response = await fetch('/api/channel/leave', {
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
    async ({userId, roomId, message, newMessage, sender
    } : {
        userId: string;
        roomId: string;
        message: string;
        newMessage:string;
        sender: string
    }) => {
        // editing msg that's not yours?
        if (sender !== userId) return

        try {
            const payload = {
                sender: userId,
                channelId: roomId,
                message : newMessage,
                messageId: message
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

export const deleteMessage = createAsyncThunk(
    'channel/deleteMessage',
    async ({sender, channelId, messageId}: {
        sender: string;
        channelId: string;
        messageId: string
    }) => {
        if (!sender||!channelId||!messageId) {
            return
        }
        try {
            const response = await fetch('/api/message/delete',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({sender,channelId,messageId})
            })
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error)
        }
        
    }
)

export const deletePrivateMessage = createAsyncThunk(
    'channel/deletePrivateMessage',
    async ({sender, receiver, messageId}: {
        sender:string;
        receiver:string;
        messageId:string;
    }) => {
        if (!sender||!receiver||!messageId) {
            return
        }
        try {
            const response = await fetch('/api/message/deletePrivate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',                    
                },
                body: JSON.stringify({sender,receiver, messageId})
            })
            const data = await response.json()
        } catch (error) {
            
        }
    }
)

export const editPrivateMessage = createAsyncThunk(
    'channel/editPrivateMessage',
    async ({ sender, receiver, message, messageId, senderId } : {
        sender: string;
        receiver: string;
        message: string;
        messageId: string;
        senderId: string;
    }) => {
        if (message.length === 0) return
        if (sender !== senderId) return

        try {
            const response = await fetch('/api/message/editPrivate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',                    
                },
                body: JSON.stringify({sender, receiver, message, messageId})                
            })
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error)   
        }
    }
)

export const searchUsers = createAsyncThunk(
    'rooms/userSearch',
    async ({q, id}: {q:string, id:string}) => {
        if (q.length === 0 || q.length > 150) return
        try {
            const response = await fetch(`/api/search/user?search=${q}`)
            const data = await response.json() as Awaited<{users:userData[]}>            
            const filtered = data.users.filter(u => u.id !== id)
            return filtered
        } catch (error) {
            console.error(error)
        }
    }
)

export const getUser = createAsyncThunk(
    'user/getUserData',
    async (id:string) => {
        if (!id) return
        try {
            const response = await fetch(`/api/user/getUser?search=${id}`)
            const data = await response.json() as Awaited<{user: {name:string;userName:string;id:string}}>
            return data.user
        } catch (error) {
            console.error('error')
        }       
    }
)

export const sendPrivateMessage = createAsyncThunk(
    'userChannel/sendMessage',
    async ({senderId, receiverId, message}: {
        senderId:string; receiverId:string; message:string
    }) => {
        if (message.length === 0) return
        try {
            const response = await fetch('/api/message/sendPrivate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({senderId, receiverId, message})
            })
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error)
        }

    }
)

export const updateUserData = createAsyncThunk(
    'user/update',
    async ({name, bio = '', userName, userId, authId, profile}: {
        name:string;
        bio:string;
        userName:string;
        userId:string;
        authId:string;
        profile:null|{type:string; data:string};
    }) => {
        if (authId !== userId) {
            console.error('unauthorized')
            return
        }
        try {
            const response = await fetch('/api/user/updateData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',                    
                },
                body: JSON.stringify({name, bio, userName, userId, profile})
            })
            const data = await response.json() as Awaited<{userData: userData}>
            return data
        } catch (error) {
            console.error(error)
        }
    }
)

