import PropTypes from 'prop-types'
import { setNotification } from '../reducers/notificationReducer'
import { addUser } from '../reducers/loginReducer'
import { connect } from 'react-redux'

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
        <form onSubmit={handleLogin}>
            <div>
                <p>username</p>
                <input
                    className="username"
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                <p>password</p>
                <input
                    className="password"
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button className="login-button" type="submit">
                login
            </button>
        </form>
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
