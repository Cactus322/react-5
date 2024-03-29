import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createBlog } from '../../reducers/blogReducer'
import { initializeUser } from '../../reducers/userReducer'
import { setNotification } from '../../reducers/notificationReducer'

import BlogForm from './BlogForm'
import BlogList from './BlogList'
import { Togglable } from '../common/Togglable'
import { List, Typography } from '@mui/material'

const BlogUserBlock = ({ blogs, setNotification, createBlog }) => {
    const createBlogFunc = async (blogObject) => {
        if (
            Object.values(blogObject).filter((elem) => elem === '').length > 0
        ) {
            setNotification('Fill in the empty fields', 3, 'error')
        } else {
            createBlog(blogObject)
            setNotification(
                `A new blog ${blogObject.title} by ${blogObject.author}`,
                3,
                'success'
            )
        }
    }

    return (
        <div>
            <Togglable
                showButtonLabel="New blog"
                hideButtonLabel="Cancel"
                margin
            >
                <BlogForm createBlogFunc={createBlogFunc} />
            </Togglable>

            <Typography variant="h4">Blogs</Typography>

            <List>
                {blogs.map((blog) => (
                    <BlogList key={blog.id} blog={blog} />
                ))}
            </List>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { blogs: state.blog }
}

const mapDispatchToProps = {
    setNotification,
    createBlog,
    initializeUser,
}

BlogUserBlock.propTypes = {
    blogs: PropTypes.array,
    setNotification: PropTypes.func,
    createBlog: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogUserBlock)
