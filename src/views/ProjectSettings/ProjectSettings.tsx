import React, {useEffect, useState} from 'react'
import {
    Typography,
    Box,
    Paper,
    Grid2 as Grid,
    Button
} from "@mui/material"
import LoadingWrapper from '@src/components/modules/LoadingWrapper.tsx'
import SectionActions from '@src/components/modules/SectionActions'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import Helmet from 'react-helmet'
import { getBoard } from '@src/endpoints/board'
import type { boardDataInterface } from '@src/endpoints/board/types.ts'
import useQuery from '@src/hooks/useQuery.tsx'
import DeleteBoardModal from '@src/containers/DeleteBoardModal'
import { errorMessage } from '@src/constants'

export default function ProjectSettings(){
    const {enqueueSnackbar} = useSnackbar()
    const {id} = useParams()
    const { loading, call:callGetBoard, result:boardData } = useQuery<boardDataInterface, string>({fetchFunc: getBoard})
    const [deleteBoardModalOpen, setDeleteBoardModalOpen] = useState(false)

    const loadBoardData = (id?: string) => {
        if (id) {
            callGetBoard(id)
            .catch(e => {
                enqueueSnackbar(errorMessage, {variant: "error"})
            })
        }
    }

    useEffect(() => {
        loadBoardData(id)
    }, [id])

    const handleOpenDeleteBoardModal = () => {
        setDeleteBoardModalOpen(true)
    }

    const handleCloseDeleteBoardModal = () => {
        setDeleteBoardModalOpen(false)
    }

    return (
        <>
            <Helmet title="Project Settings" />
            <Box p={4}>
                <Typography variant='h3' gutterBottom>Project Settings</Typography>
                <LoadingWrapper loading={loading}>
                    {
                        boardData?
                            <Box mt={4}>
                                <Paper elevation={3}>
                                    <Box p={3}>
                                        <Grid container spacing={2}>
                                            <Grid size={{ sm: 12, lg: 6 }}>
                                                <Typography variant='h3' component="h2">{boardData.title}</Typography>
                                            </Grid>
                                            <Grid size={12}>
                                                
                                            </Grid>
                                        </Grid>
                                        <Box m={-3} mt={0}>
                                            <SectionActions
                                                leftActions={
                                                    <Button
                                                        onClick={handleOpenDeleteBoardModal}
                                                    >Delete Board</Button>
                                                }
                                                rightActions={
                                                    <Button
                                                        variant='contained'
                                                        
                                                    >Edit Board</Button>
                                                }
                                            />
                                        </Box>
                                    </Box>
                                </Paper>
                            </Box>
                        : null
                    }
                </LoadingWrapper>
            </Box>
            <DeleteBoardModal 
                open={deleteBoardModalOpen}
                boardId={id}
                boardTitle={boardData?.title}
                handleClose={handleCloseDeleteBoardModal}
            />
        </>
    )
}

// Edit project name
// Edit project description
// add users to project
