import React, {useState} from 'react'
import initialData from './data.ts'
import Column from "./Column.tsx"
import {
    Grid,
    Box
} from "@mui/material"
import { DragDropContext } from 'react-beautiful-dnd'


const Board: React.ElementType = ({}) => {
    const [data, setData] = useState(initialData)

    const getColumns = () => (
        data.columnOrder.map((columnId) => {
            const column = data.columns[columnId]
            const tasks = column.taskIds.map(taskId => data.tasks[taskId])

            return <Column key={columnId} column={column} tasks={tasks}/>
        })
    )

    const onDragEnd = result => {
        console.log(result)
        return result
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Box p={4}>
                <Grid container spacing={2}>{getColumns()}</Grid>
            </Box>
        </DragDropContext>
    )
}

export default Board