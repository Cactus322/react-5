import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        create(state, action) {
            return action.payload
        },
        remove() {
            return null
        },
    },
})

export const { create, remove } = userSlice.actions

export const addUser = (credential) => {
    return async (dispatch) => {
        const user = await loginService.login(credential)
        window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
        dispatch(create(user))
    }
}

export const initializeUser = () => {
    return async (dispatch) => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        const user = JSON.parse(loggedUserJSON)
        await blogService.setToken(user.token)
        dispatch(create(user))
    }
}

export const removeUserInfo = () => {
    return async (dispatch) => {
        window.localStorage.clear()
        dispatch(remove())
    }
}

export default userSlice.reducer
