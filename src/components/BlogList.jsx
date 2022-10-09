import { useState } from "react";
import blogService from "../services/blogs";

const BlogList = ({ blog }) => {
    const [blogDetailsShow, setBlogDetailsShow] = useState(false);

    const blogList = {
        display: "flex",
        gap: 10,
        alignItems: "center",
        marginBottom: !blogDetailsShow && 10,
    };

    const titleMargin = {
        margin: 0,
    };

    const listStyles = {
        listStyleType: "none",
        padding: 0,
        marginTop: 0,
    };

    const handleClick = () => {
        setBlogDetailsShow(!blogDetailsShow);
    };

    const handleLikeClick = (id, likes) => {
        const blogObject = {
            likes: likes + 1,
        };

        return blogService.putLike(blogObject, id);
    };

    const handleRemoveClick = (id, title, author) => {
        if (window.confirm(`Remove blog ${title} by ${author}`)) {
            return blogService.deleteBlog(id);
        }
    };

    return (
        <>
            <div style={blogList}>
                <p style={titleMargin}>{blog.title}</p>
                <button onClick={handleClick}>
                    {blogDetailsShow ? "Hide" : "Show"}
                </button>
            </div>
            {blogDetailsShow && (
                <ul style={listStyles}>
                    <li>{blog.url}</li>
                    <li>
                        {blog.likes}
                        <button
                            onClick={() => handleLikeClick(blog.id, blog.likes)}
                        >
                            likes
                        </button>
                    </li>
                    <li>{blog.author}</li>
                    <li>
                        <button onClick={() => handleRemoveClick(blog.id, blog.title, blog.author)}>Remove</button>
                    </li>
                </ul>
            )}
        </>
    );
};

export default BlogList;
