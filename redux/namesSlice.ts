import { createSlice } from "@reduxjs/toolkit";

const initialState : {names: Record<string,string>, profiles: Record<string,string>} = {names: {}, profiles: {}}

const namesSlice = createSlice({
    name: 'names',
    initialState,
    reducers: {
        addNames: (state, action) => {
            const key = action.payload.key
            const value = action.payload.value
            state.names[key] = value
        },
        addProfiles: (state, action) => {
            const key = action.payload.key;
            const value = action.payload.value;
            state.profiles[key] = value
        }
    }
})

export const { addNames, addProfiles } = namesSlice.actions

export default namesSlice.reducer