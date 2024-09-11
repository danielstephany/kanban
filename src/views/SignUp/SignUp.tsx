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
import useFormCtrl from '@src/hooks/useFormCtrl.tsx'
import type { tValidationObj, tFormCtrlValues } from '@src/hooks/useFormCtrl.tsx'

interface props {
    className?: string
}

const validate = (values: tFormCtrlValues) => {
    const errors: tValidationObj = {}

    Object.entries(values).forEach(([key, value]) => {
        if(!value) errors[key] = true
    })

    return errors
}

const SignUpComp = ({ className }: props) => {

    const formCtrl = useFormCtrl({
        initialValues: {
            email: "",
            password: "",
            password2: ""
        },
        validate
    })

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()

        if(formCtrl.isValidatedForm()){
            alert("valid")
        }
    }

    return (
        <>
            <Helmet><title>Sign Up</title></Helmet>
            <div className={className}>
                <Paper elevation={3}>
                    <Box p={3}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid size={12}>
                                    <Typography align='center' variant='h2' gutterBottom>Sign up</Typography>
                                </Grid>
                                <Grid size={12}>
                                    <TextField 
                                        fullWidth 
                                        variant="outlined"
                                        name="email" 
                                        label="Email"
                                        multiline
                                        onChange={formCtrl.handleChange}
                                        onBlur={formCtrl.handleBlure}
                                        error={formCtrl.errors["email"]}
                                    />
                                </Grid>
                                <Grid size={12}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        name="password"
                                        label="Password"
                                        onChange={formCtrl.handleChange}
                                        onBlur={formCtrl.handleBlure}
                                        error={formCtrl.errors["password"]}
                                    />
                                </Grid>
                                <Grid size={12}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        name="password2"
                                        label="Re-enter Password"
                                        onChange={formCtrl.handleChange}
                                        onBlur={formCtrl.handleBlure}
                                        error={formCtrl.errors["password2"]}
                                    />
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
                        </form>
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