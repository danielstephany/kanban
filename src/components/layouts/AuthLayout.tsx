import React, { Suspense } from 'react'
import { Outlet } from "react-router-dom"
import styled from "styled-components"
import LoaderView from '@src/components/modules/LoaderView.tsx'
import MainHeader from '@src/components/modules/MainHeader.tsx'

const AuthLayoutComp: React.ElementType = ({ className }) => {

    return (
        <div className={className}>
            <div className="auth-layout__header">
                <MainHeader />
            </div>
            <div className="auth-layout__body">
                <Suspense fallback={<LoaderView />}>
                    <Outlet />
                </Suspense>
            </div>
        </div>
    )
}

const AuthLayout = styled(AuthLayoutComp)`
    display: flex;
    align-items: stretch;
    min-height: 100dvh;
    flex-direction: column;
    .auth-layout__body {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }
`

export default AuthLayout