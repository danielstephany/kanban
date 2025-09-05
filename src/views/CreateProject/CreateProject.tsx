import React, {useRef, useState, useEffect} from 'react'
import Helmet from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useAppDispatch } from '@src/store/hooks.ts'
import {
    Typography,
    Box,
    Card,
    Grid2 as Grid,
    Button
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

const resizeValue = 1100;

const CreateProject = () => {
    const {enqueueSnackbar} = useSnackbar()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const columnsKey = useRef(4)
    const cachedHorizontalLayout = useRef(true)
    const [horizontalLayout, setHorizontalLayout] = useState(true);
    const { loading, call: createBoardCall } = useQuery<boardDataInterface, createBoardDataInterface>({ fetchFunc: createBoard })

    const handleResize = () => {
        if (window.innerWidth <= resizeValue && cachedHorizontalLayout.current){
            cachedHorizontalLayout.current = false
            setHorizontalLayout(false)
        } else if (window.innerWidth > resizeValue && !cachedHorizontalLayout.current){
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

    const formCtrl = useFormControl({
        initialValues: {
            title: "",
        }
    })

    const columnsFormCtrl = useFormControl<{[key: string]: string}>({
        initialValues: {
            columnTitle_1: "Ready",
            columnTitle_2: "In Progress",
            columnTitle_3: "Complete",
        }
    })

    type columnsFormCtrlKeys = keyof typeof columnsFormCtrl.values

    const handleRemoveColumn = (key: columnsFormCtrlKeys) => () => {
        const updatedValues = { ...columnsFormCtrl.values }

        if (typeof updatedValues[key] === "string") delete updatedValues[key]
        columnsFormCtrl.setValues(updatedValues)
    }

    
    const addColumn = () => {
        if(Object.keys(columnsFormCtrl.values).length < 5){
            columnsFormCtrl.setValues({
                ...columnsFormCtrl.values,
                ["columnTitle_" + columnsKey.current]: ""
            })
            columnsKey.current++
        }
    }
    
    const validateNumberOfColumns = () => {
        if (Object.keys(columnsFormCtrl.values).length < 3) {
            enqueueSnackbar("A Project Board requires at least 3 columns.", {variant: "error"})
            return false
        }
        return true
    }
    
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        
        if (columnsFormCtrl.isValidatedForm() && formCtrl.isValidatedForm() && validateNumberOfColumns()){
            
            const data = {
                ...formCtrl.values,
                columns: [...Object.values(columnsFormCtrl.values)]
            }
            
            createBoardCall(data)
            .then(json => {
                dispatch(fetchBoardNavList())
                navigate(routes.BOARD.base + json._id)
            }).catch(e => {
                enqueueSnackbar(e, {variant: "error"})
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
        
        const workingList = Object.entries(columnsFormCtrl.values)
        const activeItem = workingList[source.index];
        
        workingList.splice(source.index, 1)
        workingList.splice(destination.index, 0, activeItem)
        
        const newState: {[key: string]: string} = {}
        workingList.forEach(([key, value]) => {
            newState[key] = value
        })
        
        columnsFormCtrl.setValues(newState)
    }
    
    
    const hasMaxColumns = Object.keys(columnsFormCtrl.values).length >= 5

    const buildcolumns = (): React.ReactNode => {
        if(columnsFormCtrl?.values){
            return Object.keys(columnsFormCtrl.values).map((col, i) => {
                return (
                    <Draggable draggableId={col} index={i} key={col}>
                        {
                            (provided, snapshot) => (
                                <ColumnOrderDragItem
                                    isDragging={snapshot.isDragging}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                    handleDelete={handleRemoveColumn(col as columnsFormCtrlKeys)}
                                >
                                    <TextFieldFormCtrl
                                        variant='standard'
                                        formCtrl={columnsFormCtrl}
                                        name={col}
                                        label="Column Title"
                                        // slotProps={{
                                        //     input: {
                                        //         endAdornment: (
                                        //             <InputAdornment position="end">
                                        //                 <IconButton
                                        //                     onClick={handleRemoveColumn(col as columnsFormCtrlKeys)}
                                        //                 >
                                        //                     <Trash size={20}/>
                                        //                 </IconButton>
                                        //             </InputAdornment>
                                        //         )
                                        //     },
                                        // }}
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

    return (
        <>
            <Helmet title="Create Project"/>
            <Box 
                p={4} 
                sx={{
                    alignItems: "center", 
                    justifyContent: "center",
                    width: "100%",
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
                                        <Typography variant='h3' gutterBottom>Create board columns</Typography>
                                        <Typography>Add up to 5 columns to your to you projects board.<br />The board should also have at least 3 columns.</Typography>
                                    </Box>
                                </Grid>
                                <Grid size={12}>
                                    <DragDropContext onDragEnd={onDragEnd}>
                                        <Droppable droppableId="col-container" direction={horizontalLayout ? "horizontal" : "vertical"}>
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
                                    <LoadStateButton
                                        type="submit"
                                        variant='contained'
                                        loading={loading}
                                    >Create Project</LoadStateButton>
                                </>
                            }
                        />
                    </form>
                </Card>
            </Box>
        </>
    )
}

export default CreateProject