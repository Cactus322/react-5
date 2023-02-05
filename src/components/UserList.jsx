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
            <li>{user.blogsLength}</li>
        </div>
    )
}

export default UserList
