import React from 'react'
import { Helmet } from "react-helmet"
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import {
    Paper,
    Grid2 as Grid,
    Typography,
    Button,
    Box
} from '@mui/material'
import TextFieldFormCtrl from '@src/components/controls/TextFieldFormCtrl.tsx'
import { signUp } from '@src/routes.ts'
import ActionContainer from '@src/components/modules/ActionContainer.tsx'
import useFormControl from '@src/hooks/useFormCtrl.tsx'
import type { tValidationObj, tFormCtrlValues } from '@src/hooks/useFormCtrl.tsx'
import { login } from '@src/endpoints/auth/index.ts'
import { kanban } from '@src/routes.ts'

interface props {
    className?: string
}

const validate = (values: tFormCtrlValues, _: tFormCtrlValues) => {
    const errors: tValidationObj = {}

    Object.entries(values).forEach(([key, value]) => {
        if(!value){
            errors[key] = true
        }
    })

    return errors
}

const LoginComp = ({ className }: props) => {
    const Navigate = useNavigate()
    const formCtrl = useFormControl({
        initialValues: {
            email: "",
            password: ""
        },
        validate
    })

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()

        if (formCtrl.isValidatedForm()){
            login(formCtrl.values)
            .then(json => {
                console.log(json)
                window.localStorage.setItem("token", json?.token)
                Navigate(kanban.path)
            })
            .catch((e) => {
                console.log(e.message)
            })
        }
    }

    return (
        <>
            <Helmet><title>Login</title></Helmet>
            <div className={className}>
                <Paper elevation={3}>
                    <Box p={3}>
                        <form noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid size={12}>
                                    <Typography variant="h2"  align='center'>Log In</Typography>
                                </Grid>
                                <Grid size={12}>
                                    <TextFieldFormCtrl 
                                        name="email"
                                        label="Email"
                                        formCtrl={formCtrl}
                                    />
                                </Grid>
                                <Grid size={12}>
                                    <TextFieldFormCtrl
                                        name="password"
                                        label="Password"
                                        type="password"
                                        formCtrl={formCtrl}
                                    />
                                </Grid>
                                <Grid size={12}>
                                    <ActionContainer
                                        pt="16px"
                                        leftAction={                                      
                                            <Button
                                                variant="text"
                                                component={Link}
                                                to={signUp.path}
                                                size='small'
                                            >Go to Sign Up page</Button>
                                        }
                                        rightAction={
                                            <Button                                            
                                                variant='contained'
                                                type="submit"
                                            >Login</Button>
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