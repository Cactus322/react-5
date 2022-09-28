import { Messages } from "../components/Messages";
import { UserInfo } from "../components/UserInfo";
import { BlogForm } from "../components/BlogForm";
import Blog from "../components/Blog";

export const BlogUserBlock = ({
    blogs,
    user,
    title,
    author,
    url,
    errorMessage,
    successMessage,
    setUser,
    setTitle,
    setAuthor,
    setUrl,
    setErrorMessage,
    setSuccessMessage,
}) => (
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
