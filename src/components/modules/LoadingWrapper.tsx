import React from 'react'
import styled from 'styled-components'
import CenteredLoader from './CenteredLoader.tsx'

interface props {
    className?: string,
    loading: boolean,
    children: React.ReactNode
}

const LoadingWrapperComp = ({ children, className, loading }: props) => {
    return (
        <>
            {
                loading ?
                <div className={className}>
                    <CenteredLoader />
                </div>
                :
                children
            }
        </>
    )
}

const LoadingWrapper = styled(LoadingWrapperComp)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height 100vh;
    min-height: 100dvh;
`

export default LoadingWrapper