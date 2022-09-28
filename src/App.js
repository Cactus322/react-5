import { useState, useEffect } from "react";
import { BlogUserBlock } from "./components/BlogUserBlock";
import { LoginForm } from "./components/LoginForm";
import blogService from "./services/blogs";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');
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

    return (
        <div>
            {user === null ? (
                <LoginForm
                    username={username}
                    password={password}
                    setUser={setUser}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    setErrorMessage={setErrorMessage}
                />
            ) : (
                <BlogUserBlock
                    blogs={blogs}
                    user={user}
                    title={title}
                    author={author}
                    url={url}
                    errorMessage={errorMessage}
                    successMessage={successMessage}
                    setUser={setUser}
                    setTitle={setTitle}
                    setAuthor={setAuthor}
                    setUrl={setUrl}
                    setErrorMessage={setErrorMessage}
                    setSuccessMessage={setSuccessMessage}
                />
            )}
        </div>
    );
};

export default App;
