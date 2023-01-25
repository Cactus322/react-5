import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import loginReducer from './reducers/loginReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import thunk from 'redux-thunk'

import './index.css'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blog: blogReducer,
        login: loginReducer,
        user: userReducer,
    },
    middleware: [thunk],
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)
