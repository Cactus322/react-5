import { connect } from 'react-redux'
import UserList from './UserList'

const Users = ({ users }) => {
    return (
        <div>
            <h2>Users</h2>
            {users.map((user) => (
                <UserList key={user.id} user={user} />
            ))}
        </div>
    )
}

const mapStateToProps = (state) => {
    return { users: state.user }
}

export default connect(mapStateToProps, null)(Users)
