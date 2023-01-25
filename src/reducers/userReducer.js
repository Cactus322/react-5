import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const userSlice = createSlice({
    name: 'user',
    initialState: [],
    reducers: {
        setUsers(state, action) {
            console.log(action.payload)
            return action.payload
        },
    },
})

export const { setUsers } = userSlice.actions

export const initializeUser = () => {
    return async (dispatch) => {
        const users = await userService.getAll()
        dispatch(setUsers(users))
    }
}

export default userSlice.reducer
