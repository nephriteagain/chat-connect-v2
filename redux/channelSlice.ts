
import { createSlice } from "@reduxjs/toolkit";
import { message, room, userData } from "@/types";
import { deleteRoom, leaveRoom } from "./thunks";

const initialState : {
    channel: null|room;
    messages: message[];
    user: null|userData
} = {
    channel: null,    
    user: null,
    messages: [],
}
    

const channel = createSlice({
    name: 'channel',
    initialState,
    reducers: {
        getChannel: (state, action) => {            
            state.channel = action.payload
        },
        getUserData: (state, action) => {
            state.user = action.payload
        },
        getMessages: (state, action) => {
            state.messages = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deleteRoom.fulfilled, (state) => {
            state.channel = null
            state.messages = []
        }),
        builder.addCase(leaveRoom.fulfilled, (state) => {
            state.channel = null
            state.messages = []
        })
    }
})
export const { getChannel, getMessages, getUserData } = channel.actions

export default channel.reducer