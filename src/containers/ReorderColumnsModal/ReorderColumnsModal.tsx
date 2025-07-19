import React from 'react'
import {
    Dialog
} from '@mui/material'
import ReorderColumnsModalContent from './ReorderColumnsModalContent'

export interface ReorderColumnsModalProps {
    boardId?: string,
    boardTitle?: string,
    open: boolean,
    handleClose: () => void
}

const ReorderColumnsModal = ({
    boardId,
    boardTitle,
    open,
    handleClose
}: ReorderColumnsModalProps) => {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <ReorderColumnsModalContent
                boardId={boardId}
                boardTitle={boardTitle}
                handleClose={handleClose}
            />
        </Dialog>
    )
}

export default ReorderColumnsModal