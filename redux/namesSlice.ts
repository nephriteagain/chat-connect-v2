import { createSlice } from "@reduxjs/toolkit";

const initialState : {names: Record<string,string>} = {names: {}}

const namesSlice = createSlice({
    name: 'names',
    initialState,
    reducers: {
        addNames: (state, action) => {
            const key = action.payload.key
            const value = action.payload.value
            state.names[key] = value
        }
    }
})

export const { addNames } = namesSlice.actions

export default namesSlice.reducer