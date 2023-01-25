const UserList = ({ user }) => {
    const userList = {
        display: 'flex',
        gap: 10,
        justifyContent: 'space-between',
        maxWidth: 200,
    }

    return (
        <div style={userList}>
            <li>{user.username}</li>
            <li>{user.blogs.length}</li>
        </div>
    )
}

export default UserList
