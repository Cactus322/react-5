import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { connect, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { initializeLogin } from './reducers/loginReducer'

import LoginForm from './components/Login/LoginForm'
import Notification from './components/common/Notification'
import UserInfo from './components/User/UserInfo'
import Users from './components/User/Users'
import BlogUserBlock from './components/Blog/BlogUserBlock'
import UserView from './components/User/view/UserView'
import BlogView from './components/Blog/view/BlogView'

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

    return (
        <div>
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
                        <UserInfo />
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
        </div>
    )
}

const mapDispatchToProps = {
    initializeBlogs,
    initializeUser,
    initializeLogin,
}

export default connect(null, mapDispatchToProps)(App)
