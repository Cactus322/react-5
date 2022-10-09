import blogService from "../services/blogs";

export const BlogForm = ({
    title,
    author,
    url,
    setTitle,
    setAuthor,
    setUrl,
    setErrorMessage,
    setSuccessMessage,
}) => {
    const handleBlog = async (e) => {
        e.preventDefault();

        const blogObject = {
            title: title,
            author: author,
            url: url,
        };

        if (
            Object.values(blogObject).filter((elem) => elem === "").length > 0
        ) {
            setErrorMessage("Fill in the empty fields");
            setTimeout(() => {
                setErrorMessage(null);
            }, 3000);
        } else {
            blogService.create(blogObject).catch((error) => {
                setErrorMessage(error.response.data.error);
            });
            setSuccessMessage(
                `A new blog ${blogObject.title} by ${blogObject.author}`
            );
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        }
    };

    return (
        <>
            <h2>Create new:</h2>

            <form className="blogs-form" onSubmit={handleBlog}>
                <label>
                    title:
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </label>
                <label>
                    author:
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </label>

                <label>
                    url:
                    <input
                        type="text"
                        value={url}
                        name="Url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </label>

                <button type="submit">Create</button>
            </form>
        </>
    );
};
