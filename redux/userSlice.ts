
import { createSlice } from '@reduxjs/toolkit'
import { userData } from '@/types'
import { createNewChannel, joinRoom, deleteRoom, leaveRoom } from './thunks'

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
        }),
        builder.addCase(joinRoom.fulfilled, (state, action) => {
            if (typeof action.payload === 'string') {
                const id = action.payload
                if (state.user?.channels) {
                    const channels = state.user.channels
                    state.user.channels = [...channels, id]
                }
            }
        }),
        builder.addCase(deleteRoom.fulfilled, (state, action) => {
            if (typeof action.payload === 'string') {
                const id = action.payload
                if (state.user?.channels) {
                    state.user.channels = state.user.channels.filter(c => {
                        return c !== id
                    })
                }
            }
        }),
        builder.addCase(leaveRoom.fulfilled, (state, action) => {
            if (typeof action.payload === 'string') {
                const id = action.payload
                if (state.user?.channels) {
                    state.user.channels = state.user.channels.filter(c => {
                        return c !== id
                    })
                }
            }
        })
    
    }
})
export const { getUser } = userSlice.actions

export default userSlice.reducer

