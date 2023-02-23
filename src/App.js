import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { connect, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { initializeLogin } from './reducers/loginReducer'

import LoginForm from './components/Login/LoginForm'
import Notification from './components/common/Notification'
import Users from './components/User/Users'
import BlogUserBlock from './components/Blog/BlogUserBlock'
import UserView from './components/User/view/UserView'
import BlogView from './components/Blog/view/BlogView'
import Navigation from './components/Navigation/Navigation'
import theme from './styles/theme'
import { ThemeProvider } from '@mui/material'

const App = ({ initializeBlogs, initializeUser, initializeLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const loggedUserJSON = JSON.parse(
        window.localStorage.getItem('loggedBlogAppUser')
    )

    useEffect(() => {
        initializeBlogs()
        initializeUser()
        initializeLogin()
    }, [dispatch])

    console.log(theme);

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Notification />
                {loggedUserJSON === null ? (
                    <LoginForm
                        username={username}
                        password={password}
                        setUsername={setUsername}
                        setPassword={setPassword}
                    />
                ) : (
                    <div>
                        <Navigation />
                        <h1>BlogsApp</h1>
                        <Routes>
                            <Route path="/" element={<BlogUserBlock />} />
                            <Route path="/users" element={<Users />} />
                            <Route
                                path="/users/:userId"
                                element={<UserView />}
                            />
                            <Route
                                path="/blogs/:blogId"
                                element={<BlogView />}
                            />
                        </Routes>
                    </div>
                )}
            </Router>
        </ThemeProvider>
    )
}

const mapDispatchToProps = {
    initializeBlogs,
    initializeUser,
    initializeLogin,
}

export default connect(null, mapDispatchToProps)(App)
