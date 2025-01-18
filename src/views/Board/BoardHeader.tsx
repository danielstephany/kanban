import React from 'react'
import styled from 'styled-components'
import {
    Button,
    Paper,
    Typography
} from '@mui/material'


interface boardHeaderInterface {
    className?: string,
    handleOpenTaskModal: React.MouseEventHandler<HTMLButtonElement>,
    title?: string
}

const BoardHeaderComp = ({ className, handleOpenTaskModal, title }: boardHeaderInterface) => {

    return (
        <Paper className={className} variant="outlined">
            <Typography className="board-header__title" variant='h6' component="h2">{title}</Typography>
            <Button 
                variant='contained' 
                size="small"
                onClick={handleOpenTaskModal}
            >New Task</Button>
        </Paper>
    )
}

const BoardHeader = styled(BoardHeaderComp)`
    border-radius: 0;
    border-left: none;
    border-right: none;
    border-top: none;
    padding: 12px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .board-header__title {
        font-size: 18px;
    }
`

export default BoardHeader