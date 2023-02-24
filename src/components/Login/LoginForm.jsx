import PropTypes from 'prop-types'
import { setNotification } from '../../reducers/notificationReducer'
import { addUser } from '../../reducers/loginReducer'
import { connect } from 'react-redux'
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
} from '@mui/material'

const LoginForm = ({
    username,
    password,
    setUsername,
    setPassword,
    setNotification,
    addUser,
}) => {
    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            addUser({ username, password })
        } catch (exception) {
            setNotification('Wrong credentials', 3, 'error')
        }
    }

    return (
        <Box
            component="form"
            onSubmit={handleLogin}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                width: 250,
                m: '0 auto',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}
            autoComplete
        >
            <FormControl>
                <InputLabel htmlFor="login-username">Username</InputLabel>
                <OutlinedInput
                    id="login-username"
                    className="username"
                    type="text"
                    value={username}
                    label="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="login-password">Password</InputLabel>
                <OutlinedInput
                    id="login-password"
                    className="password"
                    type="password"
                    value={password}
                    label="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </FormControl>
            <Button className="login-button" type="submit">
                Login
            </Button>
        </Box>
    )
}

const mapDispatchToProps = {
    setNotification,
    addUser,
}

LoginForm.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
    setUsername: PropTypes.func,
    setPassword: PropTypes.func,
    setNotification: PropTypes.func,
    addUser: PropTypes.func,
}

export default connect(null, mapDispatchToProps)(LoginForm)
