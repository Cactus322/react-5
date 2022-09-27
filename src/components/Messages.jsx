export const Messages = ({errorMessage, successMessage}) => (
    <>
        {errorMessage !== null && (
            <p className="message-error">{errorMessage}</p>
        )}

        {successMessage !== null && (
            <p className="message-success">{successMessage}</p>
        )}
    </>
);
