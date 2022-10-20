import blogService from '../services/blogs'
import { UserInfo } from '../components/UserInfo'
import { BlogForm } from '../components/BlogForm'
import BlogList from './BlogList'
import { Togglable } from './Togglable'
import PropTypes from 'prop-types'

export const BlogUserBlock = ({
    blogs,
    user,
    setUser,
    setErrorMessage,
    setSuccessMessage,
}) => {
    blogs.sort((x, y) => y.likes - x.likes)

    const createBlog = async (blogObject) => {
        if (
            Object.values(blogObject).filter((elem) => elem === '').length > 0
        ) {
            setErrorMessage('Fill in the empty fields')
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
        } else {
            blogService.create(blogObject).catch((error) => {
                setErrorMessage(error.response.data.error)
            })
            setSuccessMessage(
                `A new blog ${blogObject.title} by ${blogObject.author}`
            )
            setTimeout(() => {
                setSuccessMessage(null)
            }, 3000)
        }
    }

    return (
        <div>
            <UserInfo user={user} setUser={setUser} />

            <Togglable
                showButtonLabel="New blog"
                hideButtonLabel="Cancel"
                margin
            >
                <BlogForm
                    createBlog={createBlog}
                />
            </Togglable>

            <h2>blogs</h2>

            {blogs.map((blog) => (
                <BlogList key={blog.id} blog={blog} />
            ))}
        </div>
    )
}

BlogUserBlock.propTypes = {
    blogs: PropTypes.array,
    user: PropTypes.object,
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    setTitle: PropTypes.func,
    setAuthor: PropTypes.func,
    setUrl: PropTypes.func,
    setErrorMessage: PropTypes.func,
    setSuccessMessage: PropTypes.func,
    errorMessage: PropTypes.any,
    successMessage: PropTypes.any,
    setUser: PropTypes.func,
}
