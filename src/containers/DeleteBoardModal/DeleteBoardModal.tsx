import React from 'react'
import {
    Dialog
} from '@mui/material'
import DeleteBoardModalBody from './DeleteBoardModalBody'

export interface DeleteBoardModalProps {
    boardId?: string,
    boardTitle?: string,
    open: boolean,
    handleClose: () => void
}

const DeleteBoardModal = ({ 
    boardId,
    boardTitle,
    open, 
    handleClose 
}: DeleteBoardModalProps) => {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DeleteBoardModalBody
                boardId={boardId}
                boardTitle={boardTitle}
                handleClose={handleClose}
            />
        </Dialog>
    )
}

export default DeleteBoardModal