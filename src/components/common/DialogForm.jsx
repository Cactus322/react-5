import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material'
import PropTypes from 'prop-types'
import { removeBlog } from '../../reducers/blogReducer'
import { decreaseBlogsLength } from '../../reducers/userReducer'
import { connect } from 'react-redux'

const DialogForm = ({
    id,
    title,
    author,
    removeBlog,
    decreaseBlogsLength,
    dialogOpen,
    setDialogOpen,
}) => {
    const handelDialogClose = () => {
        setDialogOpen(!dialogOpen)
    }

    const handleRemoveClick = (id) => {
        removeBlog(id)

        decreaseBlogsLength()
    }

    return (
        <Dialog open={dialogOpen} onClose={handelDialogClose}>
            <DialogTitle id="alert-dialog-title">Remove blog</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {`Remove blog ${title} by ${author}`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handelDialogClose}>Cancel</Button>
                <Button onClick={() => handleRemoveClick(id)}>Agree</Button>
            </DialogActions>
        </Dialog>
    )
}

DialogForm.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    likesIncrease: PropTypes.func,
    decreaseBlogsLength: PropTypes.func,
    dialogOpen: PropTypes.bool,
    setDialogOpen: PropTypes.func,
}

const mapDispatchToProps = {
    removeBlog,
    decreaseBlogsLength,
}

export default connect(null, mapDispatchToProps)(DialogForm)
