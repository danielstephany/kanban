import React from 'react'
import {
    Dialog
} from '@mui/material'
import ConfirmationDialogBody from './ConfirmationDialogBody'
import type { ConfirmationDialogBodyPropTypes } from './ConfirmationDialogBody'

interface ConfirmationDialogPropTypes extends ConfirmationDialogBodyPropTypes {
    open: boolean,
}

const ConfirmationDialog = ({ 
    open, 
    handleClose, 
    onSubmit,
    loading,
    title,
    description,
    actionText
}: ConfirmationDialogPropTypes) => {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <ConfirmationDialogBody
                handleClose={handleClose}
                onSubmit={onSubmit}
                loading={loading}
                title={title}
                description={description}
                actionText={actionText}
            />
        </Dialog>
    )
}

export default ConfirmationDialog