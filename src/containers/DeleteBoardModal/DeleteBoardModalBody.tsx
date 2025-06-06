import React, { FormEvent } from 'react'
import styled from 'styled-components'
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

const HighlightedText = styled.span`
    color: ${({theme}) => theme.palette.secondary.main};
    font-weight: 500;
`

const DeleteBoardModalBody = () => {

    const formCtrl = useFormCtrl({
        initialValues: {boardName: ""}
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    }

    return (
        <form noValidate onSubmit={handleSubmit}>
            <Box p={4}>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <Typography align='center' variant='h3' gutterBottom>Delete Board</Typography>
                        <Typography align='center' variant="body1">This action will permanently delete the board and all associated tasks. To proceed, please type the name of your board: <HighlightedText>[{"boardName"}]</HighlightedText></Typography>
                    </Grid>
                    <Grid size={12}>
                        <TextFieldFormCtrl
                            label="Board Name"
                            name="boardName"
                            placeholder={""}
                            formCtrl={formCtrl}
                        />
                    </Grid>
                </Grid>
            </Box>
            <SectionActions
                leftActions={
                    <Button
                        variant='outlined'
                    >Cancel</Button>
                }
                rightActions={
                    <LoadStateButton
                        variant='contained'
                    >Delete Board</LoadStateButton>
                }
            />
        </form>
    )
}

export default DeleteBoardModalBody