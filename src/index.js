import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import thunk from 'redux-thunk'

import './index.css'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blog: blogReducer,
    },
    middleware: [thunk]
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)
