
import { createSlice } from '@reduxjs/toolkit'
import { userData } from '@/types'
import { createNewChannel } from './thunks'

const initialState : {user: userData|null} = {
    user: null
} 

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUser: (state, action) => {
            state.user = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createNewChannel.fulfilled, (state, action) => {
            if (typeof action.payload === 'string') {
                const id = action.payload
                if (state.user?.channels) {
                    const channels = state.user.channels
                    state.user.channels = [...channels, id]
                }
            }
        })        
    
    }
})
export const { getUser } = userSlice.actions

export default userSlice.reducer

