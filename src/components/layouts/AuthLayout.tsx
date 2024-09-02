import React, { Suspense } from 'react'
import { Outlet } from "react-router-dom"
import LoaderView from '@src/components/modules/LoaderView.tsx'

const AuthLayout: React.ElementType = () => {

    return <div>
        <Suspense fallback={<LoaderView />}>
            <Outlet />
        </Suspense>
    </div>
}

export default AuthLayout