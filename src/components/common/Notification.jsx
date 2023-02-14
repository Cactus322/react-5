import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Notification = (props) => {
    const notification = props.notification

    if (Object.keys(notification).length === 0) {
        return
    }

    return (
        <p className={`message-${notification.type}`}>{notification.content}</p>
    )
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification,
    }
}

export default connect(mapStateToProps)(Notification)

Notification.propTypes = {
    props: PropTypes.any,
}
