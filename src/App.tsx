import React, {useEffect} from 'react'
import {
    useNavigate,
    Outlet
} from "react-router-dom"
import {verifyToken} from "@src/endpoints/auth/index.ts"
import { login } from '@src/Router/routes.ts'
import { useAppDispatch } from '@src/store/hooks'
import { logInUser } from '@src/store/slices/user'

const App = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const token = window.localStorage.getItem("token")
        if(token){
            verifyToken()
            .then((json) => {
                console.log(json)
                dispatch(logInUser({
                    token: token,
                    firstName: json.user.firstName,
                    lastName: json.user.lastName,
                    email: json.user.email,
                    id: json.user._id
                }))
            })
            .catch(e => {
                console.log(e)
                navigate(login.path)
            })
        } else {
            navigate(login.path)
        }
    }, [])

    return (
        <Outlet />
    )
}

export default App