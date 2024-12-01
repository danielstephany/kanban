import React from 'react'
import styled from 'styled-components'
import { 
    LinearProgress,
} from '@mui/material'

interface props {
    $minHeight?: string
}

const CenteredLoaderBase = styled.div< props>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: ${({ $minHeight }) => $minHeight || "auto"};
    max-height: 100%;
    padding: 24px;
    .centered-loader__content {
        width: 100%;
        max-width: 500px;
    }
`

const CenteredLoaderContent = styled.div`
    width: 100%;
    max-width: 500px;
`

interface centeredLoaderTypes {
    minHeight?: string
}

const CenteredLoader = ({ minHeight, ...others }: centeredLoaderTypes) => {
    return (
        <CenteredLoaderBase $minHeight={minHeight} {...others}>
            <CenteredLoaderContent className="centered-loader__content">
                <LinearProgress/>
            </CenteredLoaderContent>
        </CenteredLoaderBase>
    )
}

export default CenteredLoader