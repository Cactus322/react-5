import { useState, useEffect } from 'react'
import { BlogUserBlock } from './components/BlogUserBlock'
import { LoginForm } from './components/LoginForm'
import blogService from './services/blogs'
import { Messages } from './components/Messages'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
    }, [])

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
            <Messages
                errorMessage={errorMessage}
                successMessage={successMessage}
            />
            {user === null ? (
                <LoginForm
                    username={username}
                    password={password}
                    setUser={setUser}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    setErrorMessage={setErrorMessage}
                />
            ) : (
                <BlogUserBlock
                    blogs={blogs}
                    user={user}
                    errorMessage={errorMessage}
                    successMessage={successMessage}
                    setUser={setUser}
                    setErrorMessage={setErrorMessage}
                    setSuccessMessage={setSuccessMessage}
                />
            )}
        </div>
    )
}

export default App
