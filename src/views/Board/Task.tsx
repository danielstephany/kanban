import React from 'react'
import {
    Paper,
    Box,
    Typography,
} from "@mui/material"
import { Draggable } from '@hello-pangea/dnd'
import { useTheme } from '@mui/material/styles'
import styled from 'styled-components'

interface iProps {
    task: { _id: string, title: string }
    index: number
}

const TaskItem = styled(Paper) <{ $isDragging?: boolean}>`
    ${({ theme, $isDragging }) => $isDragging ? "background: " + theme.palette.primary.light : ""};
    ${({ theme, $isDragging }) => $isDragging ? "color: " + theme.palette.primary.contrastText : ""};
    padding: 16px;
    transition: background 0.2s ease;
`

const Task: React.ElementType = ({ task, index }: iProps) => {
    const theme = useTheme()

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
                        <TaskItem 
                            variant="outlined"        
                            $isDragging={snapshot.isDragging}
                        >
                            <Typography variant='body1'>{task?.title}</Typography>
                        </TaskItem>
                    </Box>
                )
            }
        </Draggable>
    )
}

export default Task