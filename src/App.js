import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [title, setTitle] = useState(null);
    const [author, setAuthor] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
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
            setUser(user);
            setUsername("");
            setPassword("");
        } catch (exception) {
            setErrorMessage("Wrong credentials");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    const handleLogout = (e) => {
        window.localStorage.clear();
        setUser(null);
    };

    const handleBlog = async (e) => {
        e.preventDefault();

        const blogObject = {
            title: title,
            author: author,
            url: url
        }
        
        if (Object.values(blogObject).filter( elem => elem === '').length > 0) {
            setErrorMessage('Fill in the empty fields')
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
            <div>
                <p>{errorMessage}</p>
            </div>

            <h2>{user.name} logged in</h2>
            <button onClick={handleLogout}>logout</button>

            <form onSubmit={handleBlog}>
                <div>
                    <p>title:</p>
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    <p>author:</p>
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    <p>url:</p>
                    <input
                        type="text"
                        value={url}
                        name="Url"
                        pattern="https://.*"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">Create</button>
            </form>

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
