import { nanoid } from '@reduxjs/toolkit'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserView = ({ users }) => {
    if (!users.length) {
        return null
    }

    const id = useParams().userId
    const user = users.find((user) => user.id === id)
    const name = user.username
    const blogs = user.blogs
    return (
        <div>
            <h3>{name}</h3>
            <h4>added blogs</h4>
            <ul>
                {blogs.map((blog) => (
                    <li key={nanoid}>{blog.title}</li>
                ))}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { users: state.user }
}

export default connect(mapStateToProps, null)(UserView)
