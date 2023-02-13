import { Link } from 'react-router-dom'

const UserList = ({ user }) => {
    const userList = {
        display: 'flex',
        gap: 10,
        justifyContent: 'space-between',
        maxWidth: 150,
        maxHeight: 20,
        cursor: 'pointer',
    }

    return (
        <li>
            <Link style={userList} to={`/users/${user.id}`}>
                {user.username} <span>{user.blogsLength}</span>
            </Link>
        </li>
    )
}

export default UserList
