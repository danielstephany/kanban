import React from 'react'
import {
    Dialog,
    Paper,
    Box,
    Grid2 as Grid
} from '@mui/material'
import TaskDialogBody from './TaskDialogBody'

interface TaskDialogProps {
    open: boolean,
    handleClose: () => void
}

const TaskDialog = ({ open, handleClose }: TaskDialogProps) => {

    return (
        <Dialog 
            open={open} 
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <TaskDialogBody />
        </Dialog>
    )
}

export default TaskDialog