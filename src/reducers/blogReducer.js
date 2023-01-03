import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blog',
    initialState: [],
    reducers: {
        appendBlog(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload.sort((x, y) => y.likes - x.likes)
        },
        likeBlog(state, action) {
            const id = action.payload.id
            const changedBlog = action.payload

            return state.map((blog) => (blog.id !== id ? blog : changedBlog)).sort((x, y) => y.likes - x.likes)
        },
    },
})

// blogs.sort((x, y) => y.likes - x.likes)

export const { appendBlog, setBlogs, likeBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (content) => {
    console.log(content)
    return async (dispatch) => {
        const newBlog = await blogService.create({
            title: content.title,
            author: content.author,
            url: content.url,
        })
        dispatch(appendBlog(newBlog))
    }
}

export const likesIncrease = (blog) => {
    return async (dispatch) => {
        const changedLikeBlogObject = {
            ...blog,
            likes: blog.likes + 1,
        }
        await blogService.putLike(changedLikeBlogObject, blog.id)
        dispatch(likeBlog(changedLikeBlogObject))
    }
}

export default blogSlice.reducer
