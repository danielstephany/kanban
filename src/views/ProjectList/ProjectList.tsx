import React from 'react'
import Helmet from 'react-helmet'
import {
    Typography,
    Box
} from "@mui/material"

const ProjectList = () => {

    return (
        <>
            <Helmet title="Project List"/>
            <Box p={4}>

                <Typography variant='h3'>Project list</Typography>
            </Box>
        </>
    )
}

export default ProjectList