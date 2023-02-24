import { Alert } from '@mui/material'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Notification = ({ notification }) => {
    if (Object.keys(notification).length === 0) {
        return
    }

    return (
        <Alert
            severity={notification.type}
            sx={{ mt: 5, position: 'fixed', width: '100%' }}
        >
            {notification.content}
        </Alert>
    )
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification,
    }
}

export default connect(mapStateToProps)(Notification)

Notification.propTypes = {
    notification: PropTypes.any,
}
