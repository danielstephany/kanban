import React from 'react'
import {
    Paper,
    Box,
    Typography,
} from "@mui/material"
import { Draggable } from 'react-beautiful-dnd'

interface iProps {
    task: { _id: string, title: string }
    index: number
}

const Task: React.ElementType = ({ task, index }: iProps) => {

    return (
        <Draggable draggableId={task._id} index={index}>
            {
                (provided, snapshot) => (
                    <Box 
                        px={2}
                        py={1}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        
                    >
                        <Paper 
                            variant="outlined"        
                            sx={snapshot.isDragging ? { "background": "blue", "padding": "16px" } : { "padding": "16px" }}
                        >
                            <Typography variant='body1'>{task?.title}</Typography>
                        </Paper>
                    </Box>
                )
            }
        </Draggable>
    )
}

export default Task