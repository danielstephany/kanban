import React, {useState, useEffect} from 'react'
import Helmet from 'react-helmet'
import { useSnackbar } from 'notistack'
import { useParams } from 'react-router-dom'
import Column from "./Column.tsx"
import {
    Grid,
    Box
} from "@mui/material"
import { DragDropContext } from 'react-beautiful-dnd'
import type { OnDragEndResponder, DropResult } from 'react-beautiful-dnd'
import { getBoard } from '@src/endpoints/board'
import type { boardResponseInterface } from '@src/endpoints/board/types.ts'
import useQuery from '@src/hooks/useQuery.tsx'
import { errorMessage } from "@src/constants"


const Board = ({}) => {
    // const [data, setData] = useState<boardResponseInterface | null>(null)
    const [data, setData] = useState<boardResponseInterface | null>(null)
    const {enqueueSnackbar} = useSnackbar()
    const params = useParams()
    const { loading, call: getBoardCall } = useQuery<boardResponseInterface>({fetchFunc: getBoard})

    

    useEffect(() => {
        getBoardCall(params.id)
        .then(json => {
            console.log(json)
            setData(json)
        }).catch(e => {
            enqueueSnackbar(errorMessage, {variant: "error"})
        })

    }, [params.id])

    const getColumns = () => (
        
        data?.columnOrder.map((columnId) => {
            type taskKeyTypes = keyof typeof data.tasks
            const column = data.columns[columnId]
            const tasks = column.taskIds.map((taskId: taskKeyTypes) => data.tasks[taskId])

            return <Column key={columnId} column={column} tasks={tasks}/>
        })
    )

    const onDragEnd: OnDragEndResponder = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination || !data) return

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        const sourceColumn = data.columns[source.droppableId];
        const destColumn = data.columns[destination.droppableId];
        const newTaskIds = Array.from(sourceColumn.taskIds);
        newTaskIds.splice(source.index, 1);
        
        const newState: boardResponseInterface = {
            ...data,
            columns: { ...data.columns },
        };

        if (destination.droppableId !== source.droppableId){
            const newDestTaskIds = Array.from(destColumn.taskIds);
            newDestTaskIds.splice(destination.index, 0, draggableId);
            newState.columns[destColumn.columnId] = {
                ...destColumn,
                taskIds: newDestTaskIds,
            }
        } else {
            newTaskIds.splice(destination.index, 0, draggableId);
        }

        newState.columns[sourceColumn.columnId] = {
            ...sourceColumn,
            taskIds: newTaskIds,
        }

        setData(newState);
    }

    return (
        <>
            <Helmet title="Board"/>
            <DragDropContext onDragEnd={onDragEnd}>
                <Box p={4}>
                    <Grid container spacing={2}>{getColumns()}</Grid>
                </Box>
            </DragDropContext>
        </>
    )
}

export default Board