
import { createSlice } from "@reduxjs/toolkit";
import { roomBanner, room } from "@/types";

import { searchChannels } from "./thunks";

const initialState : {rooms: roomBanner[]; searches: room[]} = {
    rooms: [],
    searches: []
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
            state.searches = action.payload
        })
    }
})
export const { getRooms } = roomsSlice.actions

export default roomsSlice.reducer