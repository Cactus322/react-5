import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import { BlogForm } from "./components/BlogForm";
import { Messages } from "./components/Messages";
import { UserInfo } from "./components/UserInfo";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [title, setTitle] = useState(null);
    const [author, setAuthor] = useState(null);
    const [url, setUrl] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const user = await loginService.login({
                username,
                password,
            });
            window.localStorage.setItem(
                "loggedBlogAppUser",
                JSON.stringify(user)
            );
            blogService.setToken(user.token);
            setUser(user);
            setUsername("");
            setPassword("");
        } catch (exception) {
            setErrorMessage("Wrong credentials");
            setTimeout(() => {
                setErrorMessage(null);
            }, 3000);
        }
    };

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                <p>username</p>
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                <p>password</p>
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    );

    const userBlock = () => (
        <div>
            <Messages errorMessage={errorMessage} successMessage={successMessage} />

            <UserInfo user={user} setUser={setUser} />

            <BlogForm
                title={title}
                author={author}
                url={url}
                setTitle={setTitle}
                setAuthor={setAuthor}
                setUrl={setUrl}
                setErrorMessage={setErrorMessage}
                setSuccessMessage={setSuccessMessage}
            />

            <h2>blogs</h2>

            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );

    return (
        <div>
            {user === null && loginForm()}
            {user !== null && userBlock()}
        </div>
    );
};

export default App;
