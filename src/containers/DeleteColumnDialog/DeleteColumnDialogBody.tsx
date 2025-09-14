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

export interface DeleteColumnDialogBodyPropTypes {
    action: () => Promise<successResultInterface>,
    handleClose: () => void
}


const DeleteColumnDialogBody = ({ 
    action, 
    handleClose, 
}: DeleteColumnDialogBodyPropTypes) => {
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
            enqueueSnackbar(e.message || errorMessage, {variant: 'error'})
        }).finally(() => {
            handleClose()
        })
    }

    return (
        <form noValidate onSubmit={handleSubmit}>
            <Box p={4}>       
                <Typography variant='h3' gutterBottom>Delete the selected column</Typography>
                <Typography variant='body2'>Warning any tasks within the selected column will be deleted and can not be undone. Remove any tasks you do not wish to delete.</Typography>
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
                        >Delete Column</LoadStateButton>
                    </>
                }
            />
        </form>
    )
}

export default DeleteColumnDialogBody