import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const BlogList = ({ blog, checkLikeClick }) => {
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

    const handleLikeClick = (id, likes) => {
        const blogObject = {
            likes: likes + 1,
        }

        return blogService.putLike(blogObject, id)
    }

    const handleRemoveClick = (id, title, author) => {
        if (window.confirm(`Remove blog ${title} by ${author}`)) {
            return blogService.deleteBlog(id)
        }
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
                        <button
                            onClick={
                                checkLikeClick
                                    ? () => checkLikeClick()
                                    : () => handleLikeClick(blog.id, blog.likes)
                            }
                        >
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
    checkLikeClick: PropTypes.func,
}

export default BlogList
