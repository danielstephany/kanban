import React from 'react'
import { Helmet } from "react-helmet"
import styled from 'styled-components'
import {
    Box,
    Paper,
    Grid2 as Grid,
    Typography,
    TextField,
    Button
} from '@mui/material'
import ActionContainer from "@src/components/modules/ActionContainer.tsx"

interface props {
    className?: string
}

const SignUpComp = ({ className }: props) => {

    return (
        <>
            <Helmet><title>Sign Up</title></Helmet>
            <div className={className}>
                <Paper elevation={3}>
                    <Box p={3}>
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <Typography align='center' variant='h2' gutterBottom>Sign up</Typography>
                            </Grid>
                            <Grid size={12}>
                                <TextField fullWidth variant="outlined" />
                            </Grid>
                            <Grid size={12}>
                                <TextField fullWidth variant="outlined" />
                            </Grid>
                            <Grid size={12}>
                                <ActionContainer
                                    pt="16px"
                                    rightAction={
                                        <Button
                                            variant='contained'
                                            type="submit"
                                        >Submit</Button>
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </div>
        </>
    )
}

const SignUp = styled(SignUpComp)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex-grow: 1;
    max-width: 500px;
    padding: 24px;
    margin: 0 auto;
`

export default SignUp