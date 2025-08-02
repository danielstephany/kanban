import React from 'react'
import {
    Dialog
} from '@mui/material'
import ReorderColumnsModalContent from './ReorderColumnsModalContent'

export interface ReorderColumnsModalProps {
    open: boolean,
    handleClose: () => void
}

const ReorderColumnsModal = ({
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
                handleClose={handleClose}
            />
        </Dialog>
    )
}

export default ReorderColumnsModal