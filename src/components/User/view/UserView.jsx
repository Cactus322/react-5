import { Box, List, ListItem, Typography } from '@mui/material'
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
        <Box sx={{ m: 3 }}>
            <Typography variant="h4" color="primary" align="center">
                {name}
            </Typography>
            <Typography variant="h6">added blogs</Typography>
            <List>
                {blogs.map((blog) => (
                    <ListItem key={nanoid()}>{blog.title}</ListItem>
                ))}
            </List>
        </Box>
    )
}

const mapStateToProps = (state) => {
    return { users: state.user }
}

export default connect(mapStateToProps, null)(UserView)
