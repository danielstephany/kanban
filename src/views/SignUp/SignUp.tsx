import React from 'react'
import { Helmet } from "react-helmet"
import { useNavigate } from "react-router-dom"
import { useSnackbar } from 'notistack'
import styled from 'styled-components'
import {
    Box,
    Paper,
    Grid2 as Grid,
    Typography,
    Button,
} from '@mui/material'
import ActionContainer from "@src/components/modules/ActionContainer.tsx"
import TextFieldFormCtrl from "@src/components/controls/TextFieldFormCtrl.tsx"
import useFormCtrl from '@src/hooks/useFormCtrl.tsx'
import type { tValidationObj, tFormCtrlValues } from '@src/hooks/useFormCtrl.tsx'
import validator from 'validator'
import { signup } from "@src/endpoints/auth/index.ts"
import {errorMessage} from '@src/constants/intex.ts'

interface props {
    className?: string
}

const validate = (values: tFormCtrlValues, storedValues: tFormCtrlValues) => {
    const errors: tValidationObj = {}

    Object.entries(values).forEach(([key, value]) => {        
        if(!value){
            errors[key] = true
        } else {
            const isInvalidEmail = key === "email" && !validator.isEmail(value)
            const validationOptions = { minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1 }
            const noPasswordMatch = "Passwords do not match."
            const passwordNotValid = "Must be 8 characters long with an uppercase letter, a number and a special character."
            if (key === "password"){
                if (!validator.isStrongPassword(value, validationOptions)){
                    errors[key] = passwordNotValid
                } else if (storedValues.password2 && value !== storedValues.password2){
                    errors[key] = noPasswordMatch
                }
            }
            if (key === "password2"){
                if (!validator.isStrongPassword(value, validationOptions)) {
                    errors[key] = passwordNotValid
                } else if (storedValues.password && value !== storedValues.password) {
                    errors[key] = noPasswordMatch
                }
            }
            if (isInvalidEmail) {
                errors[key] = "A valid email is required."
            }
        }
    })

    return errors
}

const SignUpComp = ({ className }: props) => {
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()

    const formCtrl = useFormCtrl({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            password2: ""
        },
        validate
    })

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()

        if(formCtrl.isValidatedForm()){
            signup(formCtrl.values)
            .then((json) => {
                navigate("/dashboard/")
            })
            .catch(error => {
                enqueueSnackbar(errorMessage, {variant: "error"})
            })
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
                                    <TextFieldFormCtrl 
                                        variant="outlined"
                                        name="firstName" 
                                        label="First Name"
                                        formCtrl={formCtrl}
                                    />                                    
                                </Grid>
                                <Grid size={12}>
                                    <TextFieldFormCtrl
                                        fullWidth
                                        variant="outlined"
                                        name="lastName"
                                        label="Last Name"
                                        formCtrl={formCtrl}
                                    />
                                </Grid>
                                <Grid size={12}>
                                    <TextFieldFormCtrl 
                                        variant="outlined"
                                        name="email" 
                                        label="Email"
                                        formCtrl={formCtrl}
                                    />                                    
                                </Grid>
                                <Grid size={12}>
                                    <TextFieldFormCtrl
                                        fullWidth
                                        variant="outlined"
                                        name="password"
                                        label="Password"
                                        formCtrl={formCtrl}
                                        type="password"
                                    />
                                </Grid>
                                <Grid size={12}>
                                    <TextFieldFormCtrl
                                        fullWidth
                                        variant="outlined"
                                        name="password2"
                                        label="Re-enter Password"
                                        formCtrl={formCtrl}
                                        type="password"
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