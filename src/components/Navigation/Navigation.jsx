import { Link } from 'react-router-dom'
import UserInfo from '../User/UserInfo'

const Navigation = () => {
    const navigationStyles = {
        display: 'flex',
        gap: 10,
        backgroundColor: '#ccc',
        padding: '10px 0',
    }

    return (
        <div style={navigationStyles}>
            <Link to="/">blogs</Link>
            <Link to="/users">users</Link>
            <UserInfo />
        </div>
    )
}

export default Navigation
