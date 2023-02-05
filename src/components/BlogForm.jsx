import { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { increaseBlogsLength } from '../reducers/userReducer'

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
            <h2>Create new:</h2>

            <form className="blogs-form" onSubmit={handleBlog}>
                <label>
                    title:
                    <input
                        className="blog-title"
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
                        className="blog-author"
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
                        className="blog-url"
                        type="text"
                        value={url}
                        name="Url"
                        onChange={({ target }) => setUrl(target.value)}
                        placeholder="write blog url here"
                    />
                </label>

                <button className="blog-create-button" type="submit">
                    Create
                </button>
            </form>
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
