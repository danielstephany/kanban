import React, {useState} from 'react'
import initialData from './data.ts'
import type { iData } from "./data.ts"
import Column from "./Column.tsx"
import {
    Grid,
    Box
} from "@mui/material"
import { DragDropContext } from 'react-beautiful-dnd'
import type { OnDragEndResponder, DropResult } from 'react-beautiful-dnd'


const Board: React.ElementType = ({}) => {
    const [data, setData] = useState(initialData)

    const getColumns = () => (
        data.columnOrder.map((columnId) => {
            const column = data.columns[columnId]
            const tasks = column.taskIds.map(taskId => data.tasks[taskId])

            return <Column key={columnId} column={column} tasks={tasks}/>
        })
    )

    const onDragEnd: OnDragEndResponder = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return

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
        
        const newState: iData = {
            ...data,
            columns: { ...data.columns },
        };

        if (destination.droppableId !== source.droppableId){
            const newDestTaskIds = Array.from(destColumn.taskIds);
            newDestTaskIds.splice(destination.index, 0, draggableId);
            newState.columns[destColumn.id] = {
                ...destColumn,
                taskIds: newDestTaskIds,
            }
        } else {
            newTaskIds.splice(destination.index, 0, draggableId);
        }

        newState.columns[sourceColumn.id] = {
            ...sourceColumn,
            taskIds: newTaskIds,
        }

        setData(newState);
    }
    console.log(data)

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Box p={4}>
                <Grid container spacing={2}>{getColumns()}</Grid>
            </Box>
        </DragDropContext>
    )
}

export default Board