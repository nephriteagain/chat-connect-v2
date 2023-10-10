
import { createSlice } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'

const initialState : {user: User|null} = {
    user: null
} 

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUser: (state, action) => {
            state.user = action.payload
        }        
    }
})
export const { getUser } = userSlice.actions

export default userSlice.reducer

