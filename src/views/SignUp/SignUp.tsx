import React from 'react'
import styled from 'styled-components'
import {
    Paper,
    Grid
} from '@mui/material'

interface props {
    className?: string
}

const SignUpComp = ({ className }: props) => {

    return (
        <div className={className}>
            <Paper>
                <Grid container spacing={2}>
                    {/* <Grid size={12}></Grid> */}
                </Grid>
            </Paper>
        </div>
    )
}

const SignUp = styled(SignUpComp)`
`

export default SignUp