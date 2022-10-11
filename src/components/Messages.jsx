import PropTypes from 'prop-types'

export const Messages = ({ errorMessage, successMessage }) => (
    <>
        {errorMessage !== null && (
            <p className="message-error">{errorMessage}</p>
        )}

        {successMessage !== null && (
            <p className="message-success">{successMessage}</p>
        )}
    </>
)

Messages.propTypes = {
    errorMessage: PropTypes.any,
    successMessage: PropTypes.any,
}