import { useState, useEffect } from 'react'
import BlogUserBlock from './components/BlogUserBlock'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    return (
        <div>
            <Notification />
            {user === null ? (
                <LoginForm
                    username={username}
                    password={password}
                    setUser={setUser}
                    setUsername={setUsername}
                    setPassword={setPassword}
                />
            ) : (
                <BlogUserBlock
                    user={user}
                    setUser={setUser}
                />
            )}
        </div>
    )
}

export default App
