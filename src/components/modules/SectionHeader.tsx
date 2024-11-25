import React from 'react'
import styled from 'styled-components'
import { Typography } from '@mui/material'

interface SectionHeaderProps  {
    className?: string,
    title: string
}

const SectionHeaderComp = ({ title, className}: SectionHeaderProps) => {
    
    return (
        <div className={className}>
            <Typography variant='h2'>{title}</Typography>
        </div>
    )
}

const SectionHeader = styled(SectionHeaderComp)`
    display: flex;
    background-color: ${({ theme }) => theme.palette.primaryBackground};
    padding: 16px 24px;
    h2 {
        font-size: 24px;
        margin: 0;
        color: #fff;
        font-weight: 500;
    }
`

export default SectionHeader