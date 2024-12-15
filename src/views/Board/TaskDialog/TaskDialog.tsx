import React from 'react'
import {
    Dialog
} from '@mui/material'
import TaskDialogBody from './TaskDialogBody'

interface TaskDialogProps {
    open: boolean,
    handleClose: () => void,
    statusList?: { displayName: string, value: string }[],
    boardId?: string,
    refresh: () => void
}

const TaskDialog = ({ open, handleClose, statusList, boardId, refresh }: TaskDialogProps) => {

    return (
        <Dialog 
            open={open} 
            onClose={handleClose}
            fullWidth
            maxWidth="md"
        >
            <TaskDialogBody 
                handleClose={handleClose}
                statusList={statusList}
                boardId={boardId}
                refresh={refresh}
            />
        </Dialog>
    )
}

export default TaskDialog