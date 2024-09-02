import React from 'react'
import styled from 'styled-components'
import CenteredLoader from './CenteredLoader.tsx'
import { Paper } from '@mui/material'

interface props {
    className?: string
}

const LoaderViewComp = ({ className }: props) => {
    return (
        <Paper className={className} elevation={0}>
            <CenteredLoader />
        </Paper>
    )
}

const LoaderView = styled(LoaderViewComp)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height 100vh;
    min-height: 100dvh;
`

export default LoaderView