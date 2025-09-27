import React from 'react'
import {
    Dialog
} from '@mui/material'
import RenameColumnModalBody from './RenameColumnModalBody'
import type { renameColumnModalBodyPropTypes } from './RenameColumnModalBody'

interface RenameColumnModalPropTypes extends renameColumnModalBodyPropTypes {
    open: boolean,
}

const RenameColumnModal = ({
    open,
    handleClose,
    boardId,
    columnId,
    columnName,
    refresh
}: RenameColumnModalPropTypes) => {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <RenameColumnModalBody
                handleClose={handleClose}
                boardId={boardId}
                columnId={columnId}
                columnName={columnName}
                refresh={refresh}
            />
        </Dialog>
    )
}

export default RenameColumnModal