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
import { createColumn } from '@src/endpoints/board'
import type {
    boardDataInterface,
    createBoardColumnInterface,
} from '@src/endpoints/board/types'
import useQuery from '@src/hooks/useQuery'
import useFormCtrl from '@src/hooks/useFormCtrl'
import { errorMessage } from '@src/constants'
import type { 
    tFormCtrlValues,
    tValidationObj
} from '@src/hooks/useFormCtrl'
import { kebabCase } from "@src/utils/stringFormaters"


export interface CreateColumnModalBodyPropTypes {
    boardId: string,
    columnKeys?: string[],
    handleClose: () => void,
    refresh: () => void
}

const validate = (columnkeys?: string[]) => (values: tFormCtrlValues, _: tFormCtrlValues) => {
    const errors: tValidationObj = {};
    const title = values.title

    if (!title) {
        errors.title = true;
    } else if (title && columnkeys?.includes(kebabCase(title))) {
        errors.title = `The Column ${title} already exists`;
    }

    return errors
}

const CreateColumnModalBody = ({
    boardId,
    columnKeys,
    handleClose,
    refresh
}: CreateColumnModalBodyPropTypes) => {
    const {enqueueSnackbar} = useSnackbar()
    const { loading, call: callCreateColumn } = useQuery<boardDataInterface, createBoardColumnInterface>({ fetchFunc: createColumn})

    const formCtrl = useFormCtrl({
        initialValues: { title: ""},
        validate: validate(columnKeys)
    })

    const handleOnSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(formCtrl.isValidatedForm()){
            callCreateColumn({boardId, ...formCtrl.values})
            .then(() => {
                // debugger
                refresh()
                enqueueSnackbar(`column ${formCtrl.values.title} was added successfully.`, {variant: "success"})
                handleClose()
            }).catch(e => {
                enqueueSnackbar(errorMessage, {variant: "error"})
            })
        }

    }

    return (
        <form noValidate onSubmit={handleOnSubmit}>
            <Box p={4}>
                <Typography variant='h3' gutterBottom>Create New Column</Typography>
                <Typography variant='body2'>Enter the desired title of the new column below and submit to create a new column.</Typography>
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
                        >Create Column</LoadStateButton>
                    </>
                }
            />
        </form>
    )
}

export default CreateColumnModalBody