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
        _id: string,
        columnId: string,
        title: string,
        taskIds: string[],
    },
    tasks: { _id: string, content: string }[]
}

const Column: React.ElementType = ({ column, tasks }: iProps) => {
    return (
        <Grid item xs={4} sx={{flexGrow: 1}}>
            <Paper variant="outlined">
                <Box p={2}>
                        <Typography variant='h3'>{column?.title}</Typography>
                </Box>
                <Droppable droppableId={column.columnId} >
                    {
                        (provided, snapshot) => (
                            <Box
                                ref={provided.innerRef} 
                                {...provided.droppableProps}
                                sx={snapshot.isDraggingOver ? { "background-color": "rgba(255,255,255,0.2)", minHeight: "200px" } : { minHeight: "200px" }}
                            >
                                {tasks.map((task, i) => <Task key={task._id} task={task} index={i} />)}
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