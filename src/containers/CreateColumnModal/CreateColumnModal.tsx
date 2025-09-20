import React from 'react'
import {
    Dialog
} from '@mui/material'
import CreateColumnModalBody from './CreateColumnModalBody'
import type { CreateColumnModalBodyPropTypes } from './CreateColumnModalBody'

interface CreateColumnModalPropTypes extends CreateColumnModalBodyPropTypes {
    open: boolean,
}

const CreateColumnModal = ({
    open,
    handleClose,
    boardId,
    refresh
}: CreateColumnModalPropTypes) => {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <CreateColumnModalBody
                handleClose={handleClose}
                boardId={boardId}
                refresh={refresh}
            />
        </Dialog>
    )
}

export default CreateColumnModal