import { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button } from '@mui/material'

export const Togglable = ({
    showButtonLabel,
    hideButtonLabel,
    margin,
    children,
}) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibilite = () => {
        setVisible(!visible)
    }

    return (
        <Box>
            <Box
                sx={{
                    display: !visible ? 'flex' : 'none',
                    justifyContent: 'center',
                    p: 3,
                }}
            >
                <Button
                    variant="contained"
                    color="secondary"
                    className={`open-form ${
                        margin && 'togglable-button-margin'
                    }`}
                    onClick={toggleVisibilite}
                >
                    {showButtonLabel}
                </Button>
            </Box>
            <Box sx={{
                display: visible ? 'block' : 'none'
            }}>
                {children}
                <Button
                    color="error"
                    onClick={toggleVisibilite}
                    sx={{
                        display: 'block',
                        m: ' 8px auto 0',
                        width: 250,
                    }}
                >
                    {hideButtonLabel}
                </Button>
            </Box>
        </Box>
    )
}

Togglable.propTypes = {
    showButtonLabel: PropTypes.string.isRequired,
    hideButtonLabel: PropTypes.string.isRequired,
    margin: PropTypes.bool,
    children: PropTypes.node,
}
