import { useState } from 'react'
import PropTypes from 'prop-types'
import { likesIncrease, removeBlog } from '../reducers/blogReducer'
import { decreaseBlogsLength } from '../reducers/userReducer'
import { connect } from 'react-redux'

const BlogList = ({ blog, likesIncrease, removeBlog, decreaseBlogsLength }) => {
    const [blogDetailsShow, setBlogDetailsShow] = useState(false)

    const blogList = {
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        marginBottom: !blogDetailsShow && 10,
    }

    const titleMargin = {
        margin: 0,
    }

    const listStyles = {
        listStyleType: 'none',
        padding: 0,
        marginTop: 0,
    }

    const handleClick = () => {
        setBlogDetailsShow(!blogDetailsShow)
    }

    const handleRemoveClick = (id, title, author) => {
        if (window.confirm(`Remove blog ${title} by ${author}`)) {
            removeBlog(id)
        }

        decreaseBlogsLength()
    }

    return (
        <div className="blog-list">
            <div className="blog-list-item" style={blogList}>
                <p className="blog-short-description" style={titleMargin}>
                    {blog.title} {blog.author}
                </p>
                <button
                    className={`${
                        blogDetailsShow ? 'hide' : 'show'
                    }-description-button`}
                    onClick={handleClick}
                >
                    {blogDetailsShow ? 'Hide' : 'Show'}
                </button>
            </div>
            {blogDetailsShow && (
                <ul style={listStyles}>
                    <li>{blog.url}</li>
                    <li className="blog-likes">
                        {blog.likes}
                        <button onClick={() => likesIncrease(blog)}>
                            likes
                        </button>
                    </li>
                    <li>
                        <button
                            className="blog-remove-button"
                            onClick={() =>
                                handleRemoveClick(
                                    blog.id,
                                    blog.title,
                                    blog.author
                                )
                            }
                        >
                            Remove
                        </button>
                    </li>
                </ul>
            )}
        </div>
    )
}

BlogList.propTypes = {
    blog: PropTypes.object,
    likesIncrease: PropTypes.func,
}

const mapDispatchToProps = {
    likesIncrease,
    removeBlog,
    decreaseBlogsLength,
}

export default connect(null, mapDispatchToProps)(BlogList)
