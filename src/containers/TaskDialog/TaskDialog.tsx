import React from 'react'
import {
    Dialog
} from '@mui/material'
import TaskDialogBody from './TaskDialogBody'

interface TaskDialogProps {
    open: boolean,
    handleClose: () => void,
    refresh: () => void,
    taskId?: string
}

const TaskDialog = ({ open, handleClose, refresh, taskId }: TaskDialogProps) => {

    return (
        <Dialog 
            open={open} 
            onClose={handleClose}
            fullWidth
            maxWidth="md"
        >
            <TaskDialogBody 
                handleClose={handleClose}
                refresh={refresh}
                taskId={taskId}
            />
        </Dialog>
    )
}

export default TaskDialog