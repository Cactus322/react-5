import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likesIncrease } from '../../../reducers/blogReducer'

const BlogView = ({ blogs, likesIncrease }) => {
    if (!blogs.length) {
        return null
    }

    const blogList = {
        display: 'flex',
        gap: 10,
        alignItems: 'center',
    }

    const id = useParams().blogId
    const blog = blogs.find((blog) => blog.id === id)
    const { title, author, url, likes, user } = blog

    return (
        <div>
            <h3>
                {title} {author}
            </h3>
            <a href={url}>{url}</a>
            <div style={blogList}>
                <p>{likes} likes</p>
                <button onClick={() => likesIncrease(blog)}>likes</button>{' '}
            </div>
            <p>Added by {user.username}</p>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blog,
    }
}

const mapDispatchToProps = {
    likesIncrease,
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogView)
