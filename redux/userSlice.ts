
import { createSlice } from '@reduxjs/toolkit'
import { userData } from '@/types'

const initialState : {user: userData|null} = {
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

