import { nanoid } from '@reduxjs/toolkit'
import { useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likesIncrease, createComment } from '../../../reducers/blogReducer'

const BlogView = ({ blogs, likesIncrease, createComment }) => {
    if (!blogs.length) {
        return null
    }

    const blogList = {
        display: 'flex',
        gap: 10,
        alignItems: 'center',
    }

    const [comment, setComment] = useState('')
    const id = useParams().blogId
    const blog = blogs.find((blog) => blog.id === id)
    const { title, author, url, likes, user, comments } = blog

    const handleComment = (e) => {
        e.preventDefault()

        createComment({
            text: comment,
            blogId: id,
        })
    }

    return (
        <div>
            <h2>
                {title} {author}
            </h2>
            <a href={url}>{url}</a>
            <div style={blogList}>
                <p>{likes} likes</p>
                <button onClick={() => likesIncrease(blog)}>likes</button>{' '}
            </div>
            <p>Added by {user.username}</p>

            <h3>comments</h3>
            <form onSubmit={handleComment}>
                <input
                    type="text"
                    name="comment"
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                />
                <button type="submit">add comment</button>
            </form>
            <ul>
                {comments.map((comment) => (
                    <li key={nanoid()}>{comment.text}</li>
                ))}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blog,
        commentss: state.comment,
    }
}

const mapDispatchToProps = {
    likesIncrease,
    createComment,
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogView)
