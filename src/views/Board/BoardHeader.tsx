import React from 'react'
import styled from 'styled-components'
import {
    Button,
    Paper,
    Typography,
    IconButton
} from '@mui/material'
import {Link} from 'react-router-dom'
import {Settings} from "react-feather"
import {
    PROJECT_SETTINGS
} from '@src/Router/routes'


interface boardHeaderInterface {
    className?: string,
    handleOpenTaskModal: React.MouseEventHandler<HTMLButtonElement>,
    title?: string,
    boardId?: string
}

const BoardHeaderComp = ({ className, handleOpenTaskModal, title, boardId }: boardHeaderInterface) => {

    return (
        <Paper className={className} variant="outlined">
            <Typography className="board-header__title" variant='h6' component="h2">{title}</Typography>
            <div className="board-header__actions">
                <Button
                    variant='contained'
                    size="small"
                    onClick={handleOpenTaskModal}
                >New Task</Button>
                <IconButton 
                    aria-label="Project Settings"
                    component={Link}
                    to={PROJECT_SETTINGS.base + boardId}
                ><Settings /></IconButton>
            </div>
        </Paper>
    )
}

const BoardHeader = styled(BoardHeaderComp)`
    display: flex;
    border-radius: 0;
    border-left: none;
    border-right: none;
    border-top: none;
    padding: 12px 24px;
    justify-content: space-between;
    align-items: center;
    .board-header__title {
        display: inline-block;
        font-size: 18px;
        white-space: nowrap;
        padding-right: 24px;
    }
    .board-header__actions {
        display: flex;
        flex: 1 0 auto;
        justify-content: space-between;
    }
`

export default BoardHeader