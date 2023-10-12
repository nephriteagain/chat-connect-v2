
import { createSlice } from "@reduxjs/toolkit";
import { room } from "@/types";

const initialState : {channel: null|room} = {channel: null}
    

const channel = createSlice({
    name: 'channel',
    initialState,
    reducers: {
        getChannel: (state, action) => {            
            state.channel = action.payload
        }   
    }
})
export const { getChannel } = channel.actions

export default channel.reducer