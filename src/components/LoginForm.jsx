import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const LoginForm = ({
    username,
    password,
    setUser,
    setUsername,
    setPassword,
    setNotification,
}) => {
    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const user = await loginService.login({
                username,
                password,
            })
            window.localStorage.setItem(
                'loggedBlogAppUser',
                JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
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
}

LoginForm.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
    setUser: PropTypes.func,
    setUsername: PropTypes.func,
    setPassword: PropTypes.func,
    setErrorMessage: PropTypes.func,
    setNotification: PropTypes.func,
}

export default connect(null, mapDispatchToProps)(LoginForm)
