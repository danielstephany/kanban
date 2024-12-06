import React from 'react'
import {
    Dialog
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
            maxWidth="md"
        >
            <TaskDialogBody handleClose={handleClose}/>
        </Dialog>
    )
}

export default TaskDialog