import { createTheme } from '@mui/material'

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#5893df',
        },
        secondary: {
            main: '#3f54c9',
        },
        background: {
            default: '#2b3548',
            paper: '#24344d',
        },
    },
})

export default theme
