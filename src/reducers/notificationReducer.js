import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {},
    reducers: {
        createNotification(state, action) {
            return action.payload
        },
        removeNotification() {
            return ''
        },
    },
})

export const { removeNotification, createNotification } =
    notificationSlice.actions

export const setNotification = (notification, removeTimeout, type) => {
    return async (dispatch) => {
        const removeTimeoutMsec = removeTimeout * 1000

        window.clearTimeout()
        dispatch(createNotification({ content: notification, type: type }))
        setTimeout(() => dispatch(removeNotification()), removeTimeoutMsec)
    }
}

export default notificationSlice.reducer
