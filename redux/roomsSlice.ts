
import { createSlice } from "@reduxjs/toolkit";
import { roomBanner, room, userData } from "@/types";

import { searchChannels } from "./thunks";

const initialState : {
    rooms: roomBanner[];
    roomSearches: room[];
    userSearches: userData[]
} = {
    rooms: [],
    roomSearches: [],
    userSearches: []
}

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        getRooms: (state, action) => {
            state.rooms = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(searchChannels.fulfilled, (state, action) => {
            if (typeof action.payload === 'object') {
                state.roomSearches = action.payload.rooms
                state.userSearches = action.payload.users
            }
        })
    }
})
export const { getRooms } = roomsSlice.actions

export default roomsSlice.reducer