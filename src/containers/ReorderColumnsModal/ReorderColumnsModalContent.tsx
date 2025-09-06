import React, { useRef, useState, useEffect } from 'react'
import Helmet from 'react-helmet'
import { useSnackbar } from 'notistack'
import { useAppDispatch, useAppSelector } from '@src/store/hooks.ts'
import {
    Typography,
    Box,
    Card,
    Grid2 as Grid,
    Button,
    TextField,
    InputAdornment,
    IconButton
} from "@mui/material"
import SectionHeader from '@src/components/modules/SectionHeader'
import useFormControl from '@src/hooks/useFormCtrl'
import SectionActions from '@src/components/modules/SectionActions'
import { Plus, Edit2 } from 'react-feather'
import { createBoard } from "@src/endpoints/board"
import type { boardDataInterface, createBoardDataInterface } from '@src/endpoints/board/types'
import useQuery from "@src/hooks/useQuery"
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import type { OnDragEndResponder, DropResult } from '@hello-pangea/dnd'
import ColumnOrderDragItem from '@src/components/modules/ColumnOrderDragItem'
import ColumnOrderDropContainer from '@src/components/modules/ColumnOrderDropContainer'
import type {ReorderColumnsModalProps} from './ReorderColumnsModal'
import { getBoardState } from '@src/store/selectors/boardSelectors'
import ConfirmationDialog from '@src/containers/ConfirmationDialog'
import type successResultInterface from '@src/containers/ConfirmationDialog'

interface ReorderColumnsModalContentProps extends Omit<ReorderColumnsModalProps, "open"> {}

interface valuesTypes { 
    [key: string]: { 
        title: string, 
        columnId?: string,
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
    handleClose
}: ReorderColumnsModalContentProps) => {
    const {enqueueSnackbar} = useSnackbar()
    const boardData = useAppSelector(getBoardState)
    const columnsKey = useRef(5)
    const cachedHorizontalLayout = useRef(true)
    const [horizontalLayout, setHorizontalLayout] = useState(true);
    const [openDeleteColumnModal, setOpenDeleteColumnModal] = useState({
        open: false,
        column: ""
    })
    const [values, setValues] = useState<valuesTypes>(boardData ? parseColumnValues(boardData) : {})
    const { loading, call: createBoardCall } = useQuery<boardDataInterface, createBoardDataInterface>({ fetchFunc: createBoard })

    type valueKeys = keyof typeof values

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
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    const handleRemoveColumn = (key: valueKeys) => () => new Promise<{ message: string }>((resolve, reject) => {
        const updatedValues = { ...values }
debugger
        // TODO: if has tasks ask to update status or delete all tasks
        if (typeof updatedValues[key] ) delete updatedValues[key]
        setValues(updatedValues)
        resolve({message: "success"})
    })

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

    const validateNumberOfColumns = () => {
        if (Object.keys(values).length < 3) {
            enqueueSnackbar("A Project Board requires at least 3 columns.", {variant: "error"})
            return false
        }
        return true
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()

        if (validateNumberOfColumns()){

            const columnOrder = Object.values(values).map(item => {
                return item.columnId
            })

            const data = {
                columnOrder,
                updatedColumnData: values
            }

            console.log(data)

            // createBoardCall(data)
            // .then(json => {
            //     dispatch(fetchBoardNavList())
            // }).catch(e => {
            //     enqueueSnackbar(e, {variant: "error"})
            // })
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
    }
    

    const hasMaxColumns = Object.keys(values).length >= 5

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
                    <form onSubmit={handleSubmit}>
                        <SectionHeader title="Update board columns" />
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
                    </form>
                </Card>
            </Box>
            <ConfirmationDialog
                open={openDeleteColumnModal.open}
                handleClose={handleCloseDeleteColumnModal}
                action={handleRemoveColumn(openDeleteColumnModal.column)}
                title="Delete Item?"
                description="Are you sure you would like to delete this item from your project?"
            />
        </>
    )
}

export default ReorderColumnsModalContent