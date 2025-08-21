import React, {useRef, useState} from 'react'
import Helmet from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useAppDispatch, useAppSelector } from '@src/store/hooks.ts'
import {
    Typography,
    Box,
    Card,
    Grid2 as Grid,
    Button,
    InputAdornment,
    IconButton,
    TextField
} from "@mui/material"
import SectionHeader from '@src/components/modules/SectionHeader'
import TextFieldFormCtrl from '@src/components/controls/TextFieldFormCtrl'
import useFormControl from '@src/hooks/useFormCtrl'
import LoadStateButton from '@src/components/controls/LoadStateButton'
import SectionActions from '@src/components/modules/SectionActions'
import {Plus, Trash} from 'react-feather'
import { createBoard } from "@src/endpoints/board"
import type { boardDataInterface, createBoardDataInterface } from '@src/endpoints/board/types'
import useQuery from "@src/hooks/useQuery"
import * as routes from '@src/Router/routes'
import { fetchBoardNavList } from "@src/store/slices/boardNav.ts"
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import type { OnDragEndResponder, DropResult } from '@hello-pangea/dnd'
import ColumnOrderDragItem from '@src/components/modules/ColumnOrderDragItem'
import ColumnOrderDropContainer from '@src/components/modules/ColumnOrderDropContainer'
import type {ReorderColumnsModalProps} from './ReorderColumnsModal'
import { getBoardState } from '@src/store/selectors/boardSelectors'

interface ReorderColumnsModalContentProps extends Omit<ReorderColumnsModalProps, "open"> {}

interface valuesTypes { 
    [key: string]: { 
        title: string, 
        initialTitle?: string,
        columnId?: string,
        delete: boolean,
        moveTasksTo: string
    }
}


const parseColumnValues = (boardData: boardDataInterface) => {
    const res: valuesTypes = {}

    boardData.columnOrder.forEach((item, index) => {
        res[item + "_" + index] = {
            title: boardData.columns[item].title,
            initialTitle: boardData.columns[item].title,
            columnId: item,
            delete: false,
            moveTasksTo: ""
        }
    })
    
    return res
}

const ReorderColumnsModalContent = ({ 
    handleClose
}: ReorderColumnsModalContentProps) => {
    const {enqueueSnackbar} = useSnackbar()
    const boardData = useAppSelector(getBoardState)
    const columnsKey = useRef(5)
    const [values, setValues] = useState<valuesTypes>(boardData ? parseColumnValues(boardData) : {})
    const { loading, call: createBoardCall } = useQuery<boardDataInterface, createBoardDataInterface>({ fetchFunc: createBoard })

    console.log(values)

    const formCtrl = useFormControl({
        initialValues: {
            title: "",
        }
    })

    type valueKeys = keyof typeof values

    const handleRemoveColumn = (key: valueKeys) => () => {
        const updatedValues = { ...values }

        // TODO: if has tasks ask to update status or delete all tasks
        if (typeof updatedValues[key] === "string") delete updatedValues[key]
        setValues(updatedValues)
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
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
                                >
                                    <TextField
                                        fullWidth
                                        variant='standard'
                                        name={col}
                                        value={values[col].title}
                                        onChange={handleTitleChange}
                                        label="Column Title"
                                        slotProps={{
                                            input: {
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={handleRemoveColumn(col as columnsFormCtrlKeys)}
                                                        >
                                                            <Trash size={20}/>
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
                    initialTitle: "",
                    columnId: "item",
                    delete: false,
                    moveTasksTo: ""
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
                // p={4} 
                sx={{
                    alignItems: "center", 
                    justifyContent: "center",
                    width: "100%",
                    maxWidth: "600px",
                    margin: "0 auto"
                }}
            >
                <Card>
                    <form onSubmit={handleSubmit}>
                        <SectionHeader title="Create a new project" />
                        <Box p={4}>
                            <Grid container spacing={2}>
                                <Grid size={12}>
                                    <TextFieldFormCtrl 
                                        formCtrl={formCtrl}
                                        name="title"
                                        label="Title"
                                    />
                                </Grid>
                                <Grid size={12}>
                                    <Box py={1}>
                                        <Typography variant='h3' gutterBottom>Update board columns</Typography>
                                        <Typography>Add up to 5 columns to your to you projects board.<br />The board should also must have at least 3 columns.</Typography>
                                    </Box>
                                </Grid>
                                <Grid size={12}>
                                    <DragDropContext onDragEnd={onDragEnd}>
                                        <Droppable droppableId="col-container">
                                            {
                                                (provided, snapshot) => (
                                                    <ColumnOrderDropContainer
                                                        ref={provided.innerRef}
                                                        {...provided.droppableProps}
                                                        isDraggingOver={snapshot.isDraggingOver}
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
                            leftActions={
                                <Button
                                    variant="outlined"
                                    onClick={handleClose}
                                >
                                    Cancel
                                </Button>
                            }
                            rightActions={
                                <>
                                    <LoadStateButton
                                        type="submit"
                                        variant='contained'
                                        loading={loading}
                                    >Update Project</LoadStateButton>
                                </>
                            }
                        />
                    </form>
                </Card>
            </Box>
        </>
    )
}

export default ReorderColumnsModalContent