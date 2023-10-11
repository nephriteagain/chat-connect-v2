import { configureStore } from "@reduxjs/toolkit";

import userSlice  from "./userSlice";
import roomsSlice from "./roomsSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        rooms: roomsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export  type AppDispatch = typeof store.dispatch