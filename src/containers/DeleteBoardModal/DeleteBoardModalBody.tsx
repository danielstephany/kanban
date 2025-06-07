import React, { FormEvent, useEffect } from 'react'
import styled from 'styled-components'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@src/store/hooks'
import {
    Box,
    Typography,
    Button,
    Grid2 as Grid
} from '@mui/material'
import LoadStateButton from '@src/components/controls/LoadStateButton'
import SectionActions from '@src/components/modules/SectionActions'
import TextFieldFormCtrl from '@src/components/controls/TextFieldFormCtrl'
import useFormCtrl from '@src/hooks/useFormCtrl'
import type { DeleteBoardModalProps } from './DeleteBoardModal'
import { errorMessage } from '@src/constants'
import type { tValidationObj, tFormCtrlValues } from '@src/hooks/useFormCtrl.tsx'
import { deleteBoard } from '@src/endpoints/board'
import useQuery from '@src/hooks/useQuery'
import { PROJECT_LIST } from '@src/Router/routes'
import { fetchBoardNavList } from "@src/store/slices/boardNav.ts"

type DeleteBoardModalBodyProps = Omit<DeleteBoardModalProps, 'open'>

const HighlightedText = styled.span`
    color: ${({theme}) => theme.palette.secondary.main};
    font-weight: 500;
`

const DeleteBoardModalBody = ({
    boardId,
    boardTitle,
    handleClose,
}: DeleteBoardModalBodyProps) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { loading, call: callDeleteBoard } = useQuery<null, string>({fetchFunc: deleteBoard})
    const {enqueueSnackbar} = useSnackbar()

    useEffect(() => {        
        if(!boardId || !boardTitle){
            enqueueSnackbar(errorMessage, {variant: 'error'})
            handleClose()
        }
    }, [])

    const formCtrl = useFormCtrl({
        initialValues: { boardTitle: ""},
        validate: (values: tFormCtrlValues, _: tFormCtrlValues) => {
            const errors: tValidationObj = {}

            if (!values?.boardTitle?.trim() || !boardTitle?.trim()){
                errors.boardTitle = true
            } else if (values?.boardTitle?.trim() !== boardTitle?.trim()){
                errors.boardTitle = "Ensure the title matches, and uses correct letter casing."
            }

            return errors
        }
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(formCtrl.isValidatedForm() && boardId){
            callDeleteBoard(boardId)
            .then(() => {
                dispatch(fetchBoardNavList())
                enqueueSnackbar("The project has been deleted successfully", { variant: 'success' })
                navigate(PROJECT_LIST.path)
            })
            .catch(e => {
                enqueueSnackbar(errorMessage, {variant: 'error'})
            })
        }
    }

    return (
        <form noValidate onSubmit={handleSubmit}>
            <Box p={4}>
                <Grid container spacing={3}>
                    <Grid size={12}>
                        <Typography align='center' variant='h3' gutterBottom>Delete Board</Typography>
                        <Typography align='center' variant="body1">This action will permanently delete the board and all associated tasks. To proceed, please type the title of your board: <HighlightedText>[{boardTitle}]</HighlightedText></Typography>
                    </Grid>
                    <Grid size={12}>
                        <TextFieldFormCtrl
                            size='small'
                            label="Board Title"
                            name="boardTitle"
                            placeholder={boardTitle}
                            formCtrl={formCtrl}
                            focused                            
                            slotProps={{input: {autoFocus: true}}}
                        />
                    </Grid>
                </Grid>
            </Box>
            <SectionActions
                leftActions={
                    <Button
                        onClick={handleClose}
                        variant='outlined'
                    >Cancel</Button>
                }
                rightActions={
                    <LoadStateButton
                        loading={loading}
                        disabled={loading}
                        variant='contained'
                        type="submit"
                    >Delete Board</LoadStateButton>
                }
            />
        </form>
    )
}

export default DeleteBoardModalBody