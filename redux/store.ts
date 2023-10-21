import { configureStore } from "@reduxjs/toolkit";

import userSlice  from "./userSlice";
import roomsSlice from "./roomsSlice";
import channelSlice from "./channelSlice";
import namesSlice from "./namesSlice";
import userChannelSlice from "./userChannelSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        rooms: roomsSlice,
        channel: channelSlice,
        names: namesSlice,
        userChannel: userChannelSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export  type AppDispatch = typeof store.dispatch