import React from 'react'
import {
    Paper,
    Grid,
    Typography,   
    Box 
} from "@mui/material"
import Task from './Task.tsx'
import { Droppable } from 'react-beautiful-dnd'

interface iProps {
    column: {
        id: string,
        title: string,
        taskIds: string[],
    },
    tasks: { id: string, content: string }[]
}

const Column: React.ElementType = ({ column, tasks }: iProps) => {

    return (
        <Grid item xs={4}>
            <Paper variant="outlined">
                <Box p={2}>
                        <Typography variant='h3'>{column?.title}</Typography>
                </Box>
                <Droppable droppableId={column.id} >
                    {
                        (provided, snapshot) => (
                            <Box 
                                ref={provided.innerRef} 
                                {...provided.droppableProps}
                                sx={snapshot.isDraggingOver ? { "background-color": "rgba(255,255,255,0.2)"} : null}
                            >
                                {tasks.map((task, i) => <Task key={task.id} task={task} index={i} />)}
                                {provided.placeholder}
                            </Box>
                        )
                    }
                </Droppable>
            </Paper>
        </Grid>
    )
}

export default Column