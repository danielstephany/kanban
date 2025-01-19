import React, { useState } from 'react'
import {
    Box,
    Typography,
    Button,
} from '@mui/material'
import { useSnackbar } from 'notistack'
import SectionActions from '@src/components/modules/SectionActions'
import LoadStateButton from '@src/components/controls/LoadStateButton'
import { errorMessage } from '@src/constants'

interface successResultInterface {
    message?: string
}

export interface ConfirmationDialogBodyPropTypes {
    handleClose: () => void,
    action: () => Promise<successResultInterface>,
}


const ConfirmationDialogBody = ({ handleClose, action }: ConfirmationDialogBodyPropTypes) => {
    const {enqueueSnackbar} = useSnackbar()
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        action()
        .then((res) => {
            setLoading(false)
            if(res.message){
                enqueueSnackbar(res.message, { variant: 'success'})
            }
        }, (res) => {
            setLoading(false)
            if(res.message){
                enqueueSnackbar(res.message, { variant: 'error' })
            }
        }).catch(e => {
            debugger
            enqueueSnackbar(e.message || errorMessage, {variant: 'error'})
        })
    }

    return (
        <form noValidate onSubmit={handleSubmit}>
            <Box p={4}>       
                <Typography variant='h3' gutterBottom>Delete Item?</Typography>
                <Typography variant='body2'>Are you sure you would like to delete this item from your project?</Typography>
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
                        >Delete Task</LoadStateButton>
                    </>
                }
            />
        </form>
    )
}

export default ConfirmationDialogBody