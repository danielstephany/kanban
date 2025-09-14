import React from 'react'
import {
    Dialog
} from '@mui/material'
import DeleteColumnDialogBody from './DeleteColumnDialogBody'
import type { DeleteColumnDialogBodyPropTypes } from './DeleteColumnDialogBody'

interface DeleteColumnDialogPropTypes extends DeleteColumnDialogBodyPropTypes {
    open: boolean,
}

const DeleteColumnDialog = ({ 
    open, 
    handleClose, 
    action
}: DeleteColumnDialogPropTypes) => {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DeleteColumnDialogBody
                handleClose={handleClose}
                action={action}
            />
        </Dialog>
    )
}

export default DeleteColumnDialog