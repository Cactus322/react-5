import { useState, useEffect } from 'react'
import BlogUserBlock from './components/BlogUserBlock'
import LoginForm from './components/LoginForm'
// import blogService from './services/blogs'
import Notification from './components/Notification'
import { connect, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'

const App = ({ user }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUser())
    }, [dispatch])

    return (
        <div>
            <Notification />
            {user === null ? (
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
    }
}

export default connect(mapStateToProps, null)(App)
