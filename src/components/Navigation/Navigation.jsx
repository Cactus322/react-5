import { AppBar, Toolbar, Tabs, Tab } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import UserInfo from '../User/UserInfo'

const Navigation = () => {
    const [tabValue, setTabValue] = useState(0)

    const handleChange = (event, newValue) => {
        setTabValue(newValue)
    }

    return (
        <AppBar position="sticky" color="primary">
            <Toolbar
                sx={{
                    justifyContent: 'space-between',
                }}
            >
                <Tabs value={tabValue} onChange={handleChange}>
                    <Tab label="Blogs" component={Link} to="/"></Tab>
                    <Tab label="Users" component={Link} to="/users"></Tab>
                </Tabs>
                <UserInfo />
            </Toolbar>
        </AppBar>
    )
}

export default Navigation
