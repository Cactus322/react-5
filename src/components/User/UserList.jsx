import PropTypes from 'prop-types'
import { Link, ListItem } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

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
        <ListItem>
            <Link
                component={RouterLink}
                style={userList}
                to={`/users/${user.id}`}
            >
                {user.username} <span>{user.blogsLength}</span>
            </Link>
        </ListItem>
    )
}

UserList.propTypes = {
    user: PropTypes.object,
}

export default UserList
