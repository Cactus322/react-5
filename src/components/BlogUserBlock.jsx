import { UserInfo } from '../components/UserInfo'
import { BlogForm } from '../components/BlogForm'
import BlogList from './BlogList'
import { Togglable } from './Togglable'
import PropTypes from 'prop-types'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogUserBlock = ({
    blogs,
    user,
    setUser,
    setNotification,
    createBlog,
}) => {

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
            <UserInfo user={user} setUser={setUser} />

            <Togglable
                showButtonLabel="New blog"
                hideButtonLabel="Cancel"
                margin
            >
                <BlogForm createBlogFunc={createBlogFunc} />
            </Togglable>

            <h2>blogs</h2>

            {blogs.map((blog) => (
                <BlogList key={blog.id} blog={blog} />
            ))}
        </div>
    )
}

const mapStateToProps = (state) => {
    return { blogs: state.blog }
}

const mapDispatchToProps = {
    setNotification,
    createBlog,
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
    createBlog: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogUserBlock)
