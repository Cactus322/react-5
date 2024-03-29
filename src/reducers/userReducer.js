import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const userSlice = createSlice({
    name: 'user',
    initialState: [],
    reducers: {
        setUsers(state, action) {
            return action.payload
        },
        increase(state, action) {
            const id = action.payload

            return state.map((user) =>
                user.id === id
                    ? { ...user, blogsLength: user.blogsLength + 1 }
                    : { ...user }
            )
        },
        decrease(state, action) {
            const id = action.payload

            return state.map((user) =>
                user.id === id
                    ? { ...user, blogsLength: user.blogsLength - 1 }
                    : { ...user }
            )
        },
    },
})

export const { setUsers, increase, decrease } = userSlice.actions

const currentUser = JSON.parse(
    window.localStorage.getItem('loggedBlogAppUser')
)


export const initializeUser = () => {
    return async (dispatch) => {
        const users = await userService.getAll()
        const updateUsers = users.map((user) => {
            return {
                ...user,
                blogsLength: user.blogs.length,
            }
        })
        dispatch(setUsers(updateUsers))
    }
}

export const increaseBlogsLength = () => {
    return async (dispatch) => {
        dispatch(increase(currentUser.id))
    }
}

export const decreaseBlogsLength = () => {
    return async (dispatch) => {
        dispatch(decrease(currentUser.id))
    }
}

export default userSlice.reducer
