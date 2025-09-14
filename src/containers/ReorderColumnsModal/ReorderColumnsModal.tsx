import React from 'react'
import {
    Dialog
} from '@mui/material'
import ReorderColumnsModalContent from './ReorderColumnsModalContent'

export interface ReorderColumnsModalProps {
    boardId: string,
    open: boolean,
    handleClose: () => void
}

const ReorderColumnsModal = ({
    open,
    handleClose,
    boardId
}: ReorderColumnsModalProps) => {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="lg"
        >
            <ReorderColumnsModalContent
                handleClose={handleClose}
                boardId={boardId}
            />
        </Dialog>
    )
}

export default ReorderColumnsModal