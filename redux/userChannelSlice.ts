
import { message, userData } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "./thunks";

const initialState : {
    userData: null|{name:string;userName:string;id:string};
    messages: message[];
} = {
    userData: null,
    messages: []
}

const userChannel = createSlice({
    name: 'userChannel',
    initialState,
    reducers: {
        getMessages: (state, action) => {
            state.messages = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUser.fulfilled, (state, action) => {
            if (typeof action.payload === 'object')   {
                state.userData = action.payload
            }
        })
    }
})

export const { getMessages } = userChannel.actions

export default userChannel.reducer