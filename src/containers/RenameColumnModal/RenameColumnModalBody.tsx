import React, { useState } from 'react'
import { useSnackbar } from 'notistack'
import {
    Box,
    Typography,
    Button,
} from '@mui/material'
import SectionActions from '@src/components/modules/SectionActions'
import LoadStateButton from '@src/components/controls/LoadStateButton'
import TextFieldFormCtrl from '@src/components/controls/TextFieldFormCtrl'
import { renameColumn } from '@src/endpoints/board'
import type {
    boardDataInterface,
    renameBoardColumnInterface,
} from '@src/endpoints/board/types'
import useQuery from '@src/hooks/useQuery'
import useFormCtrl from '@src/hooks/useFormCtrl'
import { errorMessage } from '@src/constants'
import type { 
    tFormCtrlValues,
    tValidationObj
} from '@src/hooks/useFormCtrl'
import { kebabCase } from "@src/utils/stringFormaters"


export interface renameColumnModalBodyPropTypes {
    boardId: string,
    columnId?: string,
    columnName?: string,
    handleClose: () => void,
    refresh: () => void
}

const validate = (columnId?: string) => (values: tFormCtrlValues, _: tFormCtrlValues) => {
    const errors: tValidationObj = {};
    const title = values.title

    if (!title) {
        errors.title = true;
    } else if (title && columnId === kebabCase(title)) {
        errors.title = `The Column ${title} already exists`;
    }

    return errors
}

const RenameColumnModalBody = ({
    boardId,
    columnId,
    columnName,
    handleClose,
    refresh
}: renameColumnModalBodyPropTypes) => {
    const {enqueueSnackbar} = useSnackbar()
    const { loading, call: callRenameColumn } = useQuery<boardDataInterface, renameBoardColumnInterface>({ fetchFunc: renameColumn })

    const formCtrl = useFormCtrl({
        initialValues: { title: columnName || ""},
        validate: validate(columnId)
    })

    const handleOnSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formCtrl.isValidatedForm() && boardId && columnId){
            callRenameColumn({boardId, columnId, ...formCtrl.values})
            .then(() => {
                refresh()
                enqueueSnackbar(`column ${formCtrl.values.title} was updated successfully.`, {variant: "success"})
                handleClose()
            }).catch(e => {
                enqueueSnackbar(errorMessage, {variant: "error"})
            })
        }

    }

    return (
        <form noValidate onSubmit={handleOnSubmit}>
            <Box p={4}>
                <Typography variant='h3' gutterBottom>Rename Column</Typography>
                <Typography variant='body2'>Enter the desired title of the column below and submit to rename the column.</Typography>
                <Box mt={2}>
                    <TextFieldFormCtrl 
                        name="title"
                        formCtrl={formCtrl}
                        label="Column Title"
                        disabled={loading}
                    />
                </Box>
            </Box>
            <SectionActions
                leftActions={
                    <Button
                        variant='outlined'
                        onClick={handleClose}
                        disabled={loading}
                    >Cancel</Button>
                }
                rightActions={
                    <>
                        <LoadStateButton
                            loading={loading}
                            variant='contained'
                            type="submit"
                            disabled={loading}
                        >Rename Column</LoadStateButton>
                    </>
                }
            />
        </form>
    )
}

export default RenameColumnModalBody