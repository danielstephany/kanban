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
    action,
    title,
    description
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
                action={action}
                title={title}
                description={description}
            />
        </Dialog>
    )
}

export default ConfirmationDialog