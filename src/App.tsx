import React, {useEffect} from 'react'
import {
    useNavigate,
    Outlet
} from "react-router-dom"
import {verifyToken} from "@src/endpoints/auth/index.ts"
import { login } from '@src/routes.ts'

const App = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = window.localStorage.getItem("token")
        if(token){
            verifyToken()
            .then((json) => {
                console.log(json)
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