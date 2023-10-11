
import { createSlice } from "@reduxjs/toolkit";
import { roomBanner } from "@/types";

const initialState : {rooms: roomBanner[]} = {
    rooms: []
}

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        getRooms: (state, action) => {
            state.rooms = action.payload
        }
    }
})
export const { getRooms } = roomsSlice.actions

export default roomsSlice.reducer