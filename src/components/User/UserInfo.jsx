import { Box, Button, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { removeUserInfo } from '../../reducers/loginReducer'

const UserInfo = ({ login, removeUserInfo }) => {
    const handleLogout = () => {
        removeUserInfo()
    }

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 2,
            }}
        >
            <Typography
                variant="body2"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textTransform: 'uppercase',
                }}
            >
                {login.name} logged in
            </Typography>
            <Button color='error' onClick={handleLogout}>
                logout
            </Button>
        </Box>
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
    }
}

const mapDispatchToProps = {
    removeUserInfo,
}

UserInfo.propTypes = {
    login: PropTypes.object,
    removeUserInfo: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
