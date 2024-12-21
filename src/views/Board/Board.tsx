import React, {useState, useEffect, useRef} from 'react'
import Helmet from 'react-helmet'
import { useSnackbar } from 'notistack'
import { useParams } from 'react-router-dom'
import Column from "./Column.tsx"
import {
    Grid2 as Grid,
    Box
} from "@mui/material"
import LoadingWrapper from '@src/components/modules/LoadingWrapper.tsx'
import BoardHeader from './BoardHeader.tsx'
import { DragDropContext } from '@hello-pangea/dnd'
import type { OnDragEndResponder, DropResult } from '@hello-pangea/dnd'
import { 
    getBoard,
    moveTask
 } from '@src/endpoints/board'
import type { 
    boardDataInterface, 
    moveTaskDataInterface
} from '@src/endpoints/board/types.ts'
import useQuery from '@src/hooks/useQuery.tsx'
import { errorMessage } from "@src/constants"
import TaskDialog from './TaskDialog'


const Board = () => {
    const cachedBoardData = useRef <boardDataInterface | null>(null)
    const updateQue = useRef<moveTaskDataInterface[]>([])
    const [boardData, setBoardData] = useState<boardDataInterface | null>(null)
    const {enqueueSnackbar} = useSnackbar()
    const params = useParams()
    const { loading: boardLoading, call: getBoardCall } = useQuery<boardDataInterface, string | undefined>({fetchFunc: getBoard})
    const { loading: loadingBoardUpdate, call: moveTaskCall } = useQuery<boardDataInterface, moveTaskDataInterface>({ fetchFunc: moveTask })
    const [taskModalOpen, setTaskModalOpen] = useState(false)

    const getBoardData = () => {
        getBoardCall(params.id)
        .then(json => {
            setBoardData(json)
            cachedBoardData.current = json
        }).catch(e => {
            enqueueSnackbar(errorMessage, { variant: "error" })
        })
    }

    useEffect(() => {
        getBoardData()

    }, [params.id])

    const updateBoard = (body: moveTaskDataInterface) => {

        if (!loadingBoardUpdate){
            moveTaskCall(body)
                .then(json => {
                    console.log(json)
                    setBoardData(json)
                    cachedBoardData.current = json
                    //check que and call if que is not empty
                    if (updateQue.current[0]){
                        const quedData = updateQue.current.shift()
                        if (quedData) updateBoard(quedData)
                    }
                }).catch(e => {
                    enqueueSnackbar(errorMessage, { variant: "error" })
                    // reset updates
                    setBoardData(cachedBoardData.current)
                })
        } else {
            //if update in progress, add body to update que
            updateQue.current.push(body)
        }
    }

    const getColumns = () => (
        
        boardData?.columnOrder.map((columnId) => {
            type taskKeyTypes = keyof typeof boardData.tasks
            const column = boardData.columns[columnId]
            const tasks = column.taskIds.map((taskId: taskKeyTypes) => boardData.tasks[taskId])

            return <Column key={columnId} column={column} tasks={tasks}/>
        })
    )

    const onDragEnd: OnDragEndResponder = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination || !boardData) return

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        const sourceColumn = boardData.columns[source.droppableId];
        const destColumn = boardData.columns[destination.droppableId];
        const newTaskIds = Array.from(sourceColumn.taskIds);
        newTaskIds.splice(source.index, 1);
        
        const newState: boardDataInterface = {
            ...boardData,
            columns: { ...boardData.columns },
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
        
        //create data for updateBoard
        const updateBody = {
            boardId: boardData._id,
            sourceColumn: {
                columnId: sourceColumn.columnId,
                taskIds: newState.columns[sourceColumn.columnId].taskIds,
            },
            destColumn: {
                columnId: destColumn.columnId,
                taskIds: newState.columns[destColumn.columnId].taskIds,
            },
            taskId: draggableId,
            taskStatus: sourceColumn.title
        }

        console.log(newState)
        console.log(updateBody)
        updateBoard(updateBody)
        setBoardData(newState);
    }

    const handleOpenTaskModal = () => {
        setTaskModalOpen(true)
    }

    const handleCloseTaskModal = () => {
        setTaskModalOpen(false)
    }

    const buildStatusList = () => {
        if (!boardData) return []

        return Object.entries(boardData?.columns).map(([key, value]) => ({displayName: value.title, value: key}))
    }
    console.log(boardData)
    return (
        <>
            <Helmet title="Board"/>
            <LoadingWrapper loading={boardLoading && !Boolean(boardData)}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <BoardHeader handleOpenTaskModal={handleOpenTaskModal}/>
                    <Box sx={{display: "flex", flexGrow: 1, overflow: "auto"}}>
                        <Box p={4} sx={{ display: "flex", flexGrow: 1}}>
                            <Grid container spacing={2} sx={{flexGrow: 1, flexWrap: "nowrap"}}>{getColumns()}</Grid>
                        </Box>
                    </Box>
                </DragDropContext>
                <TaskDialog 
                    open={taskModalOpen} 
                    handleClose={handleCloseTaskModal} 
                    statusList={buildStatusList()} 
                    boardId={boardData?._id}
                    refresh={getBoardData}
                />
            </LoadingWrapper>
        </>
    )
}

export default Board