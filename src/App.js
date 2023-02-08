import { useState, useEffect } from 'react'
import BlogUserBlock from './components/Blog/BlogUserBlock'
import LoginForm from './components/Login/LoginForm'
import Notification from './components/common/Notification'
import { connect, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { initializeLogin } from './reducers/loginReducer'

const App = ({ initializeLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const loggedUserJSON = JSON.parse(
        window.localStorage.getItem('loggedBlogAppUser')
    )

    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUser())
        initializeLogin()
    }, [dispatch])

    return (
        <div>
            <Notification />
            {loggedUserJSON === null ? (
                <LoginForm
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                />
            ) : (
                <BlogUserBlock />
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        login: state.login,
    }
}

const mapDispatchToProps = {
    initializeLogin,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
