import { configureStore } from "@reduxjs/toolkit";

import userSlice  from "./userSlice";
import roomsSlice from "./roomsSlice";
import channelSlice from "./channelSlice";
import namesSlice from "./namesSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        rooms: roomsSlice,
        channel: channelSlice,
        names: namesSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export  type AppDispatch = typeof store.dispatch