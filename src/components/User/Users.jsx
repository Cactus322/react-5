import { Box, List, Typography } from '@mui/material'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import UserList from './UserList'

const Users = ({ users }) => (
    <Box
        sx={{
            m: 3,
        }}
    >
        <Typography variant="h4">Users</Typography>
        <List>
            {users.map((user) => (
                <UserList key={user.id} user={user} />
            ))}
        </List>
    </Box>
)

Users.propTypes = {
    users: PropTypes.array,
}

const mapStateToProps = (state) => {
    return { users: state.user }
}

export default connect(mapStateToProps, null)(Users)
