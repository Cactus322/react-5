import blogService from '../services/blogs'
import { UserInfo } from '../components/UserInfo'
import { BlogForm } from '../components/BlogForm'
import BlogList from './BlogList'
import { Togglable } from './Togglable'
import PropTypes from 'prop-types'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const BlogUserBlock = ({
    blogs,
    user,
    setUser,
    setNotification,
}) => {
    blogs.sort((x, y) => y.likes - x.likes)

    const createBlog = async (blogObject) => {
        if (
            Object.values(blogObject).filter((elem) => elem === '').length > 0
        ) {
            setNotification('Fill in the empty fields', 3, 'error')
        } else {
            blogService.create(blogObject).catch((error) => {
                setNotification(error.response.data.error, 3, 'error')
            })
            setNotification(`A new blog ${blogObject.title} by ${blogObject.author}`, 3, 'success')
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

const mapDispatchToProps = {
    setNotification,
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
    setUser: PropTypes.func,
    setNotification: PropTypes.func,
}

export default connect(null, mapDispatchToProps)(BlogUserBlock)