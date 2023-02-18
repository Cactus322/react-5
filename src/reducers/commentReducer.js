import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comment'

const commentSlice = createSlice({
    name: 'comment',
    initialState: [],
    reducers: {
        setComments(state, action) {
            return action.payload
        },
        appendComments(state, action) {
            state.push(action.payload)
        },
    },
})

export const { setComments, appendComments } = commentSlice.actions

export const initializeComments = (comments) => {
    return (dispatch) => {
        dispatch(setComments(comments))
    }
}

export const createComment = (content) => {
    return async (dispatch) => {
        const newComment = await commentService.create({
            text: content,
        })
        dispatch(appendComments(newComment))
    }
}

export default commentSlice.reducer
