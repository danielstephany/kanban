import React from 'react'
import {
    Dialog
} from '@mui/material'
import DeleteBoardModalBody from './DeleteBoardModalBody'

interface TaskDialogProps {
    open: boolean,
    handleClose: () => void
}

const DeleteBoardModal = ({ open, handleClose }: TaskDialogProps) => {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DeleteBoardModalBody
                
            />
        </Dialog>
    )
}

export default DeleteBoardModal