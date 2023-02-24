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
import { Box, CssBaseline, ThemeProvider, Typography } from '@mui/material'

const App = ({ initializeBlogs, initializeUser, initializeLogin, login }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        initializeBlogs()
        initializeUser()
        initializeLogin()
    }, [dispatch])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {login === null ? (
                <LoginForm
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                />
            ) : (
                <Router>
                    <Navigation />
                    <Box component="main">
                        <Notification />
                        <Typography variant="h2" align="center" sx={{ pt: 3 }}>
                            BlogsApp
                        </Typography>
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
                    </Box>
                </Router>
            )}
        </ThemeProvider>
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
    }
}

const mapDispatchToProps = {
    initializeBlogs,
    initializeUser,
    initializeLogin,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
