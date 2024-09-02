import React from 'react'
import {Link} from 'react-router-dom'
import {
    Button,
    Typography,
    Box
} from '@mui/material'

const NotFound404 = () => {
    return (
        <Box p={4} textAlign="center">
            <Typography variant='h1'>404</Typography>
            <Typography variant="body1">Oh no! I think you're lost.</Typography>
            <Box pt={2}>
                <Button
                    variant='contained'
                    component={Link}
                    to="/"
                >Go Home</Button>
            </Box>
        </Box>
    );
}

export default NotFound404