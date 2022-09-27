export const UserInfo = ({ user, setUser }) => {
    const handleLogout = () => {
        window.localStorage.clear();
        setUser(null);
    };

    return (
        <>
            <h2>{user.name} logged in</h2>
            <button onClick={handleLogout}>logout</button>
        </>
    );
};
