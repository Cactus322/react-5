import {
    Box,
    Button,
    FormControl,
    InputLabel,
    Link,
    List,
    ListItem,
    OutlinedInput,
    Typography,
} from '@mui/material'
import PropTypes from 'prop-types'
import { nanoid } from '@reduxjs/toolkit'
import { useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likesIncrease, createComment } from '../../../reducers/blogReducer'

const BlogView = ({ blogs, likesIncrease, createComment }) => {
    if (!blogs.length) {
        return null
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
        <Box
            sx={{
                m: 3,
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    pb: 2,
                }}
            >
                {title} {author}
            </Typography>
            <Link underline="hover" href={url}>
                {url}
            </Link>
            <Box
                sx={{
                    pt: 2,
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center',
                }}
            >
                <Typography variant="body1">{likes} likes</Typography>
                <Button
                    color="success"
                    variant="contained"
                    onClick={() => likesIncrease(blog)}
                >
                    likes
                </Button>
            </Box>

            <Typography
                variant="body1"
                sx={{
                    pt: 2,
                }}
            >
                Added by {user.username}
            </Typography>

            <Typography
                variant="h5"
                sx={{
                    py: 2,
                }}
            >
                Comments
            </Typography>
            <Box component="form" onSubmit={handleComment}>
                <FormControl>
                    <InputLabel htmlFor="blog-comment">Comment</InputLabel>
                    <OutlinedInput
                        id="blog-comment"
                        type="text"
                        label="comment"
                        value={comment}
                        onChange={({ target }) => setComment(target.value)}
                    />
                </FormControl>
                <Button
                    color="info"
                    type="submit"
                    sx={{
                        height: '56px',
                        ml: 2
                    }}
                >
                    Add comment
                </Button>
            </Box>
            <List>
                {comments.map((comment) => (
                    <ListItem key={nanoid()}>{comment.text}</ListItem>
                ))}
            </List>
        </Box>
    )
}

BlogView.propTypes = {
    likesIncrease: PropTypes.func,
    createComment: PropTypes.func,
    blogs: PropTypes.array
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blog,
    }
}

const mapDispatchToProps = {
    likesIncrease,
    createComment,
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogView)
