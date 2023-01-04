import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { removeUserInfo } from '../reducers/userReducer'

const UserInfo = ({ user, removeUserInfo }) => {
    const handleLogout = () => {
        removeUserInfo()
    }

    return (
        <>
            <h2>{user.name} logged in</h2>
            <button className="logount-button" onClick={handleLogout}>
                logout
            </button>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = {
    removeUserInfo,
}

UserInfo.propTypes = {
    user: PropTypes.object,
    removeUserInfo: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
