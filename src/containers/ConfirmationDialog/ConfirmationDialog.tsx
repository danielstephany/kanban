import React from 'react'
import {
    Dialog
} from '@mui/material'
import ConfirmationDialogBody from './ConfirmationDialogBody'

interface ConfirmationDialogPropTypes {
    open: boolean,
    handleClose: () => void,
    action: () => Promise<boolean | void | undefined>,
}

const ConfirmationDialog = ({ open, handleClose, action }: ConfirmationDialogPropTypes) => {

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
            />
        </Dialog>
    )
}

export default ConfirmationDialog