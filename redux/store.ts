import { configureStore } from "@reduxjs/toolkit";

import userSlice  from "./userSlice";
import roomsSlice from "./roomsSlice";
import channelSlice from "./channelSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        rooms: roomsSlice,
        channel: channelSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export  type AppDispatch = typeof store.dispatch