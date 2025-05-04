import React from 'react'
import {
    Paper,
    Grid2 as Grid,
    Typography,   
    Box 
} from "@mui/material"
import Task from './Task.tsx'
import { Droppable } from '@hello-pangea/dnd'
import type { themeInterface } from "@src/themes/mainTheme.ts"
import styled from 'styled-components'

const DropContainer = styled.div<{$isDraggingOver?: boolean}>`
    flex-grow: 1;
    min-height: 200px;
    transition: background-color 0.2s ease;
    background-color: ${({ theme, $isDraggingOver }) => $isDraggingOver ? (theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)") : "transparent" };
    max-height: 100%;
    overflow: auto;
`

interface iProps {
    column: {
        _id: string,
        columnId: string,
        title: string,
        taskIds: string[],
    },
    tasks: { _id: string, content: string }[],
    theme: themeInterface,
    handleOpenTaskModal: (id?: string) => React.MouseEventHandler<HTMLButtonElement>
}

const Column: React.ElementType = ({ column, tasks, handleOpenTaskModal }: iProps) => {
    return (
        <Grid sx={{display: "flex", flexDirection: "column", flex: "1 1 0px", maxWidth: "350px", minWidth: "200px", maxHeight: "100%"}}>
            <Paper variant="outlined" sx={{ display: "flex", flexDirection: "column", flexGrow: 1, maxHeight: "100%" }}>
                <Box p={2}>
                        <Typography variant='h3'>{column?.title}</Typography>
                </Box>
                <Droppable droppableId={column.columnId} >
                    {
                        (provided, snapshot) => (
                            <DropContainer
                                ref={provided.innerRef} 
                                {...provided.droppableProps}
                                $isDraggingOver={snapshot.isDraggingOver}
                            >
                                {tasks.map((task, i) => <Task key={task?._id} task={task} index={i} textOnClick={handleOpenTaskModal(task?._id)}/>)}
                                {provided.placeholder}
                            </DropContainer>
                        )
                    }
                </Droppable>
            </Paper>
        </Grid>
    )
}

export default Column