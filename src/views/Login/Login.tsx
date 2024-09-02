import React from 'react'
import { Helmet } from "react-helmet"
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {
    Paper,
    Grid2 as Grid,
    Typography,
    TextField,
    Button,
    Box
} from '@mui/material'
import { signUp } from '@src/routes.ts'

interface props {
    className?: string
}

const LoginComp = ({ className }: props) => {

    return (
        <>
            <Helmet><title>Login</title></Helmet>
            <div className={className}>
                <Paper elevation={3}>
                    <Box p={3}>
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <Typography component="h2" variant='h4' align='center'>Log In</Typography>
                            </Grid>
                            <Grid size={12}>
                                <TextField fullWidth variant="outlined" />
                            </Grid>
                            <Grid size={12}>
                                <TextField fullWidth variant="outlined" />
                            </Grid>
                            <Grid size={12}>
                                <Button variant="contained">Submit</Button>
                                <Button 
                                    variant="contained" 
                                    component={Link} 
                                    to={signUp.path}
                                >Sign up</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </div>
        </>
    )
}

const Login = styled(LoginComp)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex-grow: 1;
    padding: 24px;
    max-width: 500px;
    margin: 0 auto;
`

export default Login