import React, {useEffect, useState} from 'react'
import { useAppDispatch } from '@src/store/hooks'
import { setBoard } from '@src/store/slices/board'
import {
    Typography,
    Box,
    Paper,
    Grid2 as Grid,
    Button
} from "@mui/material"
import LoadingWrapper from '@src/components/modules/LoadingWrapper.tsx'
import TextFieldFormCtrl from '@src/components/controls/TextFieldFormCtrl'
import SectionActions from '@src/components/modules/SectionActions'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import Helmet from 'react-helmet'
import { getBoard } from '@src/endpoints/board'
import type { boardDataInterface } from '@src/endpoints/board/types.ts'
import useQuery from '@src/hooks/useQuery.tsx'
import DeleteBoardModal from '@src/containers/DeleteBoardModal'
import { errorMessage } from '@src/constants'
import useFormCtrl from '@src/hooks/useFormCtrl'
import { Description } from '@mui/icons-material'
import ReorderColumnsModal from '@src/containers/ReorderColumnsModal'

const DELETE_BOARD_MODAL = "deleteBoardModal",
    REORDER_COLUMNS_MODAL = "reorderColumnsModal"

const initialModalStates = {
    [DELETE_BOARD_MODAL]: false,
    [REORDER_COLUMNS_MODAL]: false
} as const

type modalName = keyof typeof initialModalStates;

export default function ProjectSettings(){
    const dispatch = useAppDispatch()
    const {enqueueSnackbar} = useSnackbar()
    const {id} = useParams()
    const { loading, call:callGetBoard, result:boardData } = useQuery<boardDataInterface, string>({fetchFunc: getBoard})
    const [modalOpen, setModalOpen] = useState(initialModalStates)

    const formCtrl = useFormCtrl({
        initialValues: {
            title: ""
        }
    })
    console.log(boardData)
    const loadBoardData = (id?: string) => {
        if (id) {
            callGetBoard(id)
            .then(json => {
                if(json?.title){
                    formCtrl.setValues({title: json.title})
                }
                dispatch(setBoard(json))
            })
            .catch(e => {
                enqueueSnackbar(errorMessage, {variant: "error"})
            })
        }
    }

    useEffect(() => {
        loadBoardData(id)
    }, [id])

    const handleOpenModal = (modalName: modalName) => () => {
        setModalOpen({...initialModalStates, [modalName]: true})
    }

    const handleCloseModals = () => {
        setModalOpen(initialModalStates)
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
                                        <Grid container spacing={4}>
                                            <Grid size={12}>
                                                <TextFieldFormCtrl 
                                                    label="Title"
                                                    name="title"
                                                    formCtrl={formCtrl}
                                                />                                                
                                            </Grid>                                         
                                            <Grid size={12}>
                                                <Typography variant='h4' component="h3" gutterBottom >Modify Board Columns</Typography> 
                                                <Typography variant='body2' gutterBottom >This action will allow you to update existing coluns and add new columns.</Typography>                                           
                                                <Button 
                                                    sx={{marginTop: "8px"}}
                                                    variant="outlined" 
                                                    size="small"
                                                    onClick={handleOpenModal(REORDER_COLUMNS_MODAL)}
                                                >Reorder columns</Button>
                                            </Grid>
                                            <Grid size={12}>
                                                <Typography variant='h4' component="h3" gutterBottom>Board access</Typography>                                            
                                                <Button 
                                                    sx={{ marginTop: "8px" }}
                                                    variant="outlined" 
                                                    size="small"
                                                >Manage users</Button>
                                            </Grid>
                                        </Grid>                                      
                                    </Box>
                                    <SectionActions
                                        leftActions={
                                            <Button
                                                onClick={handleOpenModal(DELETE_BOARD_MODAL)}
                                            >Delete Board</Button>
                                        }
                                        rightActions={
                                            <Button
                                                variant='contained'

                                            >Edit Board</Button>
                                        }
                                    />
                                </Paper>
                            </Box>
                        : null
                    }
                </LoadingWrapper>
            </Box>
            <DeleteBoardModal 
                open={modalOpen[DELETE_BOARD_MODAL]}
                boardId={id}
                boardTitle={boardData?.title}
                handleClose={handleCloseModals}
            />
            <ReorderColumnsModal
                open={modalOpen[REORDER_COLUMNS_MODAL]}
                handleClose={handleCloseModals}
            />
        </>
    )
}

// Edit project name
// Edit project description
// add users to project
