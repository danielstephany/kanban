import React, {useEffect} from 'react'
import {
    useNavigate,
    Outlet
} from "react-router-dom"
import {verifyToken} from "@src/endpoints/auth/index.ts"
import type { verifyTokenResult } from "@src/endpoints/auth/types.ts"
import { LOGIN } from '@src/Router/routes.ts'
import { useAppDispatch } from '@src/store/hooks'
import { logInUser } from '@src/store/slices/user'
import useQuery from './hooks/useQuery'
import LoaderView from '@src/components/modules/LoaderView.tsx'

const App = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {loading, call: callVerifyToken, setLoading} = useQuery<verifyTokenResult>({ 
        fetchFunc: verifyToken,
        loading: true,
    })

    useEffect(() => {
        const token = window.localStorage.getItem("token")
        if(token){
            callVerifyToken()
            .then((json) => {
                dispatch(logInUser({
                    token: token,
                    firstName: json.user.firstName,
                    lastName: json.user.lastName,
                    email: json.user.email,
                    id: json.user._id
                }))
            })
            .catch(e => {
                navigate(LOGIN.path)
            })
        } else {
            setLoading(false)
            navigate(LOGIN.path)
        }
    }, [])

    if(loading){
        return <LoaderView />
    } else {
        return <Outlet />
    }
}

export default App