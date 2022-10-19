import { useState } from 'react'
import PropTypes from 'prop-types'

export const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const handleBlog = (e) => {
        e.preventDefault()

        createBlog({
            title: title,
            author: author,
            url: url,
        })
    }

    return (
        <>
            <h2>Create new:</h2>

            <form className="blogs-form" onSubmit={handleBlog}>
                <label>
                    title:
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                        placeholder="write blog title here"
                    />
                </label>
                <label>
                    author:
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                        placeholder="write blog author here"
                    />
                </label>

                <label>
                    url:
                    <input
                        type="text"
                        value={url}
                        name="Url"
                        onChange={({ target }) => setUrl(target.value)}
                        placeholder="write blog url here"
                    />
                </label>

                <button type="submit">Create</button>
            </form>
        </>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func,
    // setErrorMessage: PropTypes.func,
    // setSuccessMessage: PropTypes.func,
}