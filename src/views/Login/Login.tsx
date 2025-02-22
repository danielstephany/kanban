import React from 'react'
import { Helmet } from "react-helmet"
import { useSnackbar } from 'notistack'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@src/store/hooks'
import { logInUser } from '@src/store/slices/user'
import {
    Paper,
    Grid2 as Grid,
    Typography,
    Button,
    Box
} from '@mui/material'
import TextFieldFormCtrl from '@src/components/controls/TextFieldFormCtrl.tsx'
import PasswordFieldFormCtrl from '@src/components/controls/PasswordFieldFormCtrl.tsx'
import { SIGN_UP } from '@src/Router/routes.ts'
import ActionContainer from '@src/components/modules/ActionContainer.tsx'
import useFormControl from '@src/hooks/useFormCtrl.tsx'
import useQuery from '@src/hooks/useQuery.tsx'
import { login } from '@src/endpoints/auth/index.ts'
import type { loginResult, loginPayloadInterface } from '@src/endpoints/auth/types.ts'
import { KANBAN } from '@src/Router/routes.ts'
import LoadStateButton from '@src/components/controls/LoadStateButton.tsx'
import { errorMessage } from '@src/constants/index.ts'

interface props {
    className?: string
}

const LoginComp = ({ className }: props) => {
    const dispatch = useAppDispatch()
    const { enqueueSnackbar } = useSnackbar()
    const Navigate = useNavigate()
    const { loading, call: loadingCall } = useQuery<loginResult, loginPayloadInterface>({fetchFunc: login})
    const formCtrl = useFormControl({
        initialValues: {
            email: "",
            password: ""
        }
    })

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()

        if (formCtrl.isValidatedForm()){
            loadingCall(formCtrl.values)
            .then(json => {
                dispatch(logInUser({
                    token: json.token,
                    firstName: json.user.firstName,
                    lastName: json.user.lastName,
                    email: json.user.email,
                    id: json.user._id
                }))
                Navigate(KANBAN.path)
            })
            .catch((e) => {
                enqueueSnackbar(e.message || errorMessage, { variant: "error" })
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
                                    <PasswordFieldFormCtrl
                                        name="password"
                                        label="Password"
                                        type="password"
                                        formCtrl={formCtrl}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid size={12}>
                                    <ActionContainer
                                        pt="16px"
                                        leftAction={                                      
                                            <Button
                                                variant="text"
                                                component={Link}
                                                to={SIGN_UP.path}
                                                size='small'
                                            >Go to Sign Up page</Button>
                                        }
                                        rightAction={
                                            <LoadStateButton                                            
                                                variant='contained'
                                                type="submit"
                                                loading={loading}
                                                disabled={loading}
                                            >Login</LoadStateButton>
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