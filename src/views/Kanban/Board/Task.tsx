import React from 'react'
import {
    Paper,
    Grid,
    Typography,
} from "@mui/material"
import { Draggable } from 'react-beautiful-dnd'

interface iProps {
    task: { id: string, content: string }
    index: number
}

const Task: React.ElementType = ({ task, index }: iProps) => {

    return (
        <Draggable draggableId={task.id} index={index}>
            {
                (provided) => (
                    <Grid 
                        item 
                        xs={12}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <Paper variant="outlined" sx={{ "padding": "16px" }}>
                            <Typography variant='body1'>{task?.content}</Typography>
                        </Paper>
                    </Grid>
                )
            }
        </Draggable>
    )
}

export default Task