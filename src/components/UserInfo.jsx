import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { removeUserInfo } from '../reducers/loginReducer'

const UserInfo = ({ login, removeUserInfo }) => {
    const handleLogout = () => {
        removeUserInfo()
    }

    return (
        <>
            <h2>{login.name} logged in</h2>
            <button className="logount-button" onClick={handleLogout}>
                logout
            </button>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
    }
}

const mapDispatchToProps = {
    removeUserInfo,
}

UserInfo.propTypes = {
    login: PropTypes.object,
    removeUserInfo: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
