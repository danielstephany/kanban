import React, { useRef, useState, useEffect } from 'react'
import Helmet from 'react-helmet'
import { useSnackbar } from 'notistack'
import {
    Typography,
    Box,
    Card,
    Grid2 as Grid,
    Button,
    TextField,
    InputAdornment,
    IconButton,
    Chip,
    CircularProgress
} from "@mui/material"
import SectionHeader from '@src/components/modules/SectionHeader'
import CenteredLoader from '@src/components/modules/CenteredLoader.tsx'
import SectionActions from '@src/components/modules/SectionActions'
import { Plus, Edit2 } from 'react-feather'
import { deleteColumn } from "@src/endpoints/board"
import useQuery from "@src/hooks/useQuery"
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import type { OnDragEndResponder, DropResult } from '@hello-pangea/dnd'
import ColumnOrderDragItem from '@src/components/modules/ColumnOrderDragItem'
import ColumnOrderDropContainer from '@src/components/modules/ColumnOrderDropContainer'
import type {ReorderColumnsModalProps} from './ReorderColumnsModal'
import ConfirmationDialog from '@src/containers/ConfirmationDialog'
import DeleteColumnDialog from '@src/containers/DeleteColumnDialog'
import type successResultInterface from '@src/containers/ConfirmationDialog'
import { 
    getBoard,
    moveColumn
} from '@src/endpoints/board'
import type { 
    boardDataInterface, 
    deleteBoardColumnInterface, 
    moveBoardColumnInterface
} from '@src/endpoints/board/types'
import { errorMessage } from "@src/constants"

interface ReorderColumnsModalContentProps extends Omit<ReorderColumnsModalProps, "open"> {}

interface valuesTypes { 
    [key: string]: { 
        title: string, 
        columnId: string
    }
}


const parseColumnValues = (boardData: boardDataInterface) => {
    const res: valuesTypes = {}

    boardData.columnOrder.forEach((item, index) => {
        res[item + "_" + index] = {
            title: boardData.columns[item].title,
            columnId: item,
        }
    })
    
    return res
}

const resizeValue = 1100


const ReorderColumnsModalContent = ({ 
    handleClose,
    boardId
}: ReorderColumnsModalContentProps) => {
    const {enqueueSnackbar} = useSnackbar()
    const columnsKey = useRef(5)
    const cachedHorizontalLayout = useRef(true)
    const [horizontalLayout, setHorizontalLayout] = useState(true);
    const [openDeleteColumnModal, setOpenDeleteColumnModal] = useState({
        open: false,
        column: ""
    })
    const { loading: loadingBoard, call: callGetBoard, result: boardData } = useQuery<boardDataInterface, string>({ fetchFunc: getBoard })
    const [values, setValues] = useState<valuesTypes>({})
    const { loading: deleteColumnLoading, call: deleteColumnCall } = useQuery<boardDataInterface, deleteBoardColumnInterface>({ fetchFunc: deleteColumn })
    const { loading: moveColumnLoading, call: moveColumnCall } = useQuery<boardDataInterface, moveBoardColumnInterface>({ fetchFunc: moveColumn })

    type valueKeys = keyof typeof values

    const loadBoardData = (id?: string) => {
        if (id) {
            callGetBoard(id)
            .then(json => {
                if(json){
                    setValues(parseColumnValues(json))
                }
            })
            .catch(e => {
                enqueueSnackbar(errorMessage, {variant: "error"})
            })
        }
    }

    const handleOpenDeleteColumnModal = (name: string ) => () => {
        setOpenDeleteColumnModal({
            open: true,
            column: name
        })
    }

    const handleCloseDeleteColumnModal = () => {
        setOpenDeleteColumnModal({
            open: false,
            column: ""
        })
    }

    const handleResize = () => {
        if (window.innerWidth <= resizeValue && cachedHorizontalLayout.current) {
            cachedHorizontalLayout.current = false
            setHorizontalLayout(false)
        } else if (window.innerWidth > resizeValue && !cachedHorizontalLayout.current) {
            cachedHorizontalLayout.current = true
            setHorizontalLayout(true)
        }
    }

    useEffect(() => {
        loadBoardData(boardId)
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    const validateNumberOfColumns = () => {
        if (Object.keys(values).length < 3) {
            enqueueSnackbar("A Project Board requires at least 3 columns.", { variant: "error" })
            return false
        }
        return true
    }

    const handleRemoveColumn = (columnId: string) => (e: React.FormEvent) => {
        e.preventDefault()

        if (boardData && values[columnId].columnId){

            const data = {
                boardId: boardData._id,
                columnId: values[columnId].columnId
            }
            console.log(data)
    
            deleteColumnCall(data)
                .then(json => {
                    if (json) setValues(parseColumnValues(json))
                    handleCloseDeleteColumnModal()
                })
                .catch(e => {
                    enqueueSnackbar(errorMessage, { variant: "error" })
                })
        }   
    }

    const buildcolumns = (): React.ReactNode => {
        if(values){
            return Object.keys(values).map((col, i) => {
                return (
                    <Draggable draggableId={col} index={i} key={col}>
                        {
                            (provided, snapshot) => (
                                <ColumnOrderDragItem
                                    isDragging={snapshot.isDragging}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                    handleDelete={handleOpenDeleteColumnModal(col)}
                                >
                                    <TextField
                                        fullWidth
                                        variant='standard'
                                        name={col}
                                        value={values[col].title}
                                        label="Column Title"   
                                        disabled                              
                                        slotProps={{
                                            input: {
                                                readOnly: true,
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label={`Edit the ${values[col].title} column`}
                                                            onClick={() => {}}
                                                        >
                                                            <Edit2 size={18}/>
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            },
                                        }}
                                    />                                        
                                </ColumnOrderDragItem>
                            )
                        }
                    </Draggable>
                )
            })
        }
        return null
    }

    const addColumn = () => {
        if(Object.keys(values).length < 5){
            setValues({
                ...values,
                ["columnTitle_" + columnsKey.current]: {
                    title: "",           
                    columnId: "item"
                }
            })
            columnsKey.current++
        }
    }

    const handleMoveColumn = (updatedColumnOrder: string[]) => {

        if(boardData){
            moveColumnCall({
                boardId: boardData?._id,
                columnOrder: updatedColumnOrder
            })
        }
        
    }


    const onDragEnd: OnDragEndResponder = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return

        if (
            !destination || (
                destination?.droppableId === source.droppableId &&
                destination?.index === source.index
            )
        ) { return }

        const workingList = Object.entries(values)
        const activeItem = workingList[source.index];

        workingList.splice(source.index, 1)
        workingList.splice(destination.index, 0, activeItem)

        const newState: valuesTypes = {}
        workingList.forEach(([key, value]) => {
            newState[key] = value
        })

        setValues(newState)
        const updatedColumnOrder = Object.values(newState).map(val => val.columnId)
        handleMoveColumn(updatedColumnOrder)
    }
    

    const hasMaxColumns = Object.keys(values).length >= 5

    const isPendingUpdate = moveColumnLoading

    return (
        <>
            <Helmet title="Create Project"/>
            <Box 
                sx={{
                    alignItems: "center", 
                    justifyContent: "center",
                    width: "100%",
                    margin: "0 auto"
                }}
            >
                <Card>
                    <SectionHeader 
                        title="Update board columns" 
                        indicators={isPendingUpdate && <Chip size="small" label="Saving" icon={<CircularProgress size="12px"/>} /> }
                    />                    
                        {
                            !loadingBoard ? 
                                <Box p={4}>
                                    <Grid container spacing={2}>                
                                        <Grid size={12}>
                                            <Box py={1}>
                                                <Typography variant='h3' gutterBottom>Update board columns</Typography>
                                                <Typography>Add up to 5 columns to your to you projects board.<br />The board should also must have at least 3 columns.</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid size={12}>
                                            <DragDropContext onDragEnd={onDragEnd}>
                                                <Droppable 
                                                    droppableId="col-container" 
                                                    direction={horizontalLayout ? "horizontal" : "vertical"}
                                                >
                                                    {
                                                        (provided, snapshot) => (
                                                            <ColumnOrderDropContainer
                                                                ref={provided.innerRef}
                                                                {...provided.droppableProps}
                                                                isDraggingOver={snapshot.isDraggingOver}
                                                                horizontal={horizontalLayout}
                                                            >
                                                                {buildcolumns()}
                                                                {provided.placeholder}
                                                            </ColumnOrderDropContainer>
                                                        )
                                                    }                                                
                                                </Droppable>
                                            </DragDropContext>
                                        </Grid>
                                        {
                                            !hasMaxColumns ?
                                            <Grid size={12}>
                                                <Button 
                                                    startIcon={<Plus/>}
                                                    fullWidth
                                                    onClick={addColumn}
                                                    variant='outlined'
                                                    color="secondary"
                                                >Add Column</Button>
                                            </Grid>
                                            : null
                                        }
                                    </Grid>
                                </Box>
                            : 
                            <CenteredLoader minHeight='150px' />
                        }
                    <SectionActions 
                        rightActions={
                            <>
                                <Button
                                    onClick={handleClose}
                                    variant='contained'
                                >Close</Button>
                            </>
                        }
                    />
                </Card>
            </Box>
            <ConfirmationDialog
                open={openDeleteColumnModal.open}
                handleClose={handleCloseDeleteColumnModal}
                onSubmit={handleRemoveColumn(openDeleteColumnModal.column)}
                loading={deleteColumnLoading}
                title={<>Delete the selected column</>}
                description="Warning any tasks within the selected column will be deleted and can not be undone. Remove any tasks you do not wish to delete."
                actionText='Delete Column'
            />
        </>
    )
}

export default ReorderColumnsModalContent