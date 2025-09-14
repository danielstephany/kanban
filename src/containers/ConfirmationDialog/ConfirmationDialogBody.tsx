import React, { useState } from 'react'
import {
    Box,
    Typography,
    Button,
} from '@mui/material'
import SectionActions from '@src/components/modules/SectionActions'
import LoadStateButton from '@src/components/controls/LoadStateButton'

export interface ConfirmationDialogBodyPropTypes {
    onSubmit: (e: React.FormEvent) => void,
    handleClose: () => void,
    title: string | React.ReactNode,
    description: string,
    loading: boolean,
    actionText: string,
}


const ConfirmationDialogBody = ({ 
    onSubmit, 
    description,
    handleClose, 
    title,
    loading,
    actionText
}: ConfirmationDialogBodyPropTypes) => {

    return (
        <form noValidate onSubmit={onSubmit}>
            <Box p={4}>       
                <Typography variant='h3' gutterBottom>{title}</Typography>
                <Typography variant='body2'>{description}</Typography>
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
                        >{actionText}</LoadStateButton>
                    </>
                }
            />
        </form>
    )
}

export default ConfirmationDialogBody