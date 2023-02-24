import { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { increaseBlogsLength } from '../../reducers/userReducer'
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    Typography,
} from '@mui/material'

const BlogForm = ({ createBlogFunc, increaseBlogsLength }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const handleBlog = (e) => {
        e.preventDefault()

        createBlogFunc({
            title: title,
            author: author,
            url: url,
        })

        increaseBlogsLength()
    }

    return (
        <>
            <Box
                component="form"
                onSubmit={handleBlog}
                variant="filled"
                color="error"
                sx={{
                    display: 'flex',
                    gap: 2,
                    flexDirection: 'column',
                    width: 250,
                    mx: 'auto'
                }}
            >
                <Typography
                    component="fieldset"
                    variant="h4"
                    sx={{ border: 'none' }}
                >
                    Create new:
                </Typography>

                <FormControl>
                    <InputLabel htmlFor="blog-title">Title</InputLabel>
                    <OutlinedInput
                        id="blog-title"
                        type="text"
                        value={title}
                        label="Title"
                        onChange={({ target }) => setTitle(target.value)}
                        placeholder="Write blog title here"
                    />
                </FormControl>

                <FormControl>
                    <InputLabel htmlFor="blog-author">Author</InputLabel>
                    <OutlinedInput
                        id="blog-author"
                        type="text"
                        value={author}
                        label="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                        placeholder="Write blog author here"
                    />
                </FormControl>

                <FormControl>
                    <InputLabel htmlFor="blog-url">Url</InputLabel>
                    <OutlinedInput
                        id="blog-url"
                        type="text"
                        value={url}
                        label="Url"
                        onChange={({ target }) => setUrl(target.value)}
                        placeholder="write blog url here"
                    />
                </FormControl>

                <Button variant="contained" type="submit">
                    Create
                </Button>
            </Box>
        </>
    )
}

const mapDispatchToProps = {
    increaseBlogsLength,
}

BlogForm.propTypes = {
    createBlogFunc: PropTypes.func,
}

export default connect(null, mapDispatchToProps)(BlogForm)
