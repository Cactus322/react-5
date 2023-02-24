import { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { likesIncrease } from '../../reducers/blogReducer'
import { Link as RouterLink } from 'react-router-dom'
import {
    Button,
    Link,
    List,
    ListItem,
} from '@mui/material'
import DialogForm from '../common/DialogForm'

const BlogList = ({ blog, likesIncrease }) => {
    const [blogDetailsShow, setBlogDetailsShow] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleClick = () => {
        setBlogDetailsShow(!blogDetailsShow)
    }

    const handelDialogOpen = () => {
        setDialogOpen(!dialogOpen)
    }

    return (
        <>
            <ListItem
                className="blog-list-item"
                sx={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center',
                    marginBottom: !blogDetailsShow && '10px',
                }}
            >
                <Link
                    component={RouterLink}
                    underline="hover"
                    variant="overline"
                    to={`/blogs/${blog.id}`}
                    className="blog-short-description"
                >
                    {blog.title} {blog.author}
                </Link>
                <Button
                    color="info"
                    variant="outlined"
                    className={`${
                        blogDetailsShow ? 'hide' : 'show'
                    }-description-button`}
                    onClick={handleClick}
                >
                    {blogDetailsShow ? 'Hide' : 'Show'}
                </Button>
            </ListItem>

            {blogDetailsShow && (
                <List>
                    <ListItem sx={{ pl: 3 }}>{blog.url}</ListItem>
                    <ListItem
                        className="blog-likes"
                        sx={{
                            gap: 2,
                            pl: 3,
                        }}
                    >
                        {blog.likes}
                        <Button
                            color="success"
                            variant="contained"
                            onClick={() => likesIncrease(blog)}
                        >
                            likes
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button
                            color="error"
                            className="blog-remove-button"
                            onClick={handelDialogOpen}
                        >
                            Remove
                        </Button>

                        <DialogForm
                            id={blog.id}
                            title={blog.title}
                            author={blog.author}
                            dialogOpen={dialogOpen}
                            setDialogOpen={setDialogOpen}
                        />
                    </ListItem>
                </List>
            )}
        </>
    )
}

BlogList.propTypes = {
    blog: PropTypes.object,
    likesIncrease: PropTypes.func,
}

const mapDispatchToProps = {
    likesIncrease,
}

export default connect(null, mapDispatchToProps)(BlogList)
