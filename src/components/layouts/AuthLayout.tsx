import React from 'react'
import { Outlet } from "react-router-dom"

const AuthLayout: React.ElementType = () => {

    return <div>
        <Outlet />
    </div>
}

export default AuthLayout