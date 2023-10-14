
import { createSlice } from "@reduxjs/toolkit";
import { message, room } from "@/types";

const initialState : {
    channel: null|room;
    messages: message[]
} = {
    channel: null,
    messages: []
}
    

const channel = createSlice({
    name: 'channel',
    initialState,
    reducers: {
        getChannel: (state, action) => {            
            state.channel = action.payload
        },
        getMessages: (state, action) => {
            state.messages = action.payload
        }
    }
})
export const { getChannel, getMessages } = channel.actions

export default channel.reducer