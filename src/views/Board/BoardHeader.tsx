import React from 'react'
import styled from 'styled-components'
import {
    Button,
    Paper
} from '@mui/material'


interface boardHeaderInterface {
    className?: string,
    handleOpenTaskModal: React.MouseEventHandler<HTMLButtonElement>
}

const BoardHeaderComp = ({ className, handleOpenTaskModal }: boardHeaderInterface) => {

    return (
        <Paper className={className} variant="outlined">
            <Button 
                variant='contained' 
                size="small"
                onClick={handleOpenTaskModal}
            >New Task</Button>
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