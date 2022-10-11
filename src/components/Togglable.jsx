import { useState } from 'react'
import PropTypes from 'prop-types'

export const Togglable = ({
    showButtonLabel,
    hideButtonLabel,
    margin,
    children,
}) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible && 'none' }
    const showWhenVisible = { display: !visible && 'none' }

    const toggleVisibilite = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <button
                    className={margin && 'togglable-button-margin'}
                    onClick={toggleVisibilite}
                >
                    {showButtonLabel}
                </button>
            </div>
            <div style={showWhenVisible}>
                {children}
                <button
                    className={margin && 'togglable-button-margin'}
                    onClick={toggleVisibilite}
                >
                    {hideButtonLabel}
                </button>
            </div>
        </div>
    )
}

Togglable.propTypes = {
    showButtonLabel: PropTypes.string.isRequired,
    hideButtonLabel: PropTypes.string.isRequired,
    margin: PropTypes.bool,
    children: PropTypes.node,
}