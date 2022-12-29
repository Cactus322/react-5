import { useState, useEffect } from 'react'
import BlogUserBlock from './components/BlogUserBlock'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import Notification from './components/Notification'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
    })

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
                    blogs={blogs}
                    user={user}
                    setUser={setUser}
                />
            )}
        </div>
    )
}

export default App
