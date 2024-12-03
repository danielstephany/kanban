import React from 'react'
import styled from 'styled-components'
import {
    Button,
    Paper
} from '@mui/material'


interface boardHeaderInterface {
    className?: string
}

const BoardHeaderComp = ({ className }: boardHeaderInterface) => {

    return (
        <Paper className={className} variant="outlined">
            <Button variant='contained' size="small">New Task</Button>
        </Paper>
    )
}

const BoardHeader = styled(BoardHeaderComp)`
    padding: 12px 24px;
    border-radius: 0;
    border-left: none;
    border-right: none;
    border-top: none;
`

export default BoardHeader