import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '@src/store/hooks'
import { getUser } from '@src/store/selectors/userSelector'
import { login } from '@src/Router/routes'

interface loginGardProps {
    component: any
}

const LoginGard = ({ component, ...others }: loginGardProps) => {
    const Component = component
    const user = useAppSelector(getUser)

    if (!user.loggedIn) {
        return <Navigate to={login.path} />
    } else {
        return <Component {...others}/>
    }
}

export default LoginGard