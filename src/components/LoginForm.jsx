import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

export const LoginForm = ({
    username,
    password,
    setUser,
    setUsername,
    setPassword,
    setErrorMessage,
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
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
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

LoginForm.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
    setUser: PropTypes.func,
    setUsername: PropTypes.func,
    setPassword: PropTypes.func,
    setErrorMessage: PropTypes.func,
}
