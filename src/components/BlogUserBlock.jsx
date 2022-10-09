import { Messages } from "../components/Messages";
import { UserInfo } from "../components/UserInfo";
import { BlogForm } from "../components/BlogForm";
import BlogList from "./BlogList";
import { Togglable } from "./Togglable";

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
}) => {
    blogs.sort((x, y) => x.likes - y.likes);

    return (
        <div>
            <Messages
                errorMessage={errorMessage}
                successMessage={successMessage}
            />

            <UserInfo user={user} setUser={setUser} />

            <Togglable
                showButtonLabel="New note"
                hideButtonLabel="Cancel"
                margin
            >
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
            </Togglable>

            <h2>blogs</h2>

            {blogs.map((blog) => (
                <BlogList key={blog.id} blog={blog} />
            ))}
        </div>
    );
};
