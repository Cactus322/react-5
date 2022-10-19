import PropTypes from 'prop-types'

export const UserInfo = ({ user, setUser }) => {
    const handleLogout = () => {
        window.localStorage.clear()
        setUser(null)
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

UserInfo.propTypes = {
    user: PropTypes.object,
    setUser: PropTypes.func,
}
