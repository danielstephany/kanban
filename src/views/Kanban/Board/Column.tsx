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
            <Paper variant="outlined" sx={{ "padding": "16px" }}>
                <Box pb={2}>
                        <Typography variant='h3'>{column?.title}</Typography>
                </Box>
                <Droppable droppableId={column.id} >
                    {
                        (provided) => (
                            <Grid 
                                container 
                                spacing={2} 
                                ref={provided.innerRef} 
                                {...provided.droppableProps}
                            >
                                {tasks.map((task, i) => <Task key={task.id} task={task} index={i} />)}
                                {provided.placeholder}
                            </Grid>
                        )
                    }
                </Droppable>
            </Paper>
        </Grid>
    )
}

export default Column