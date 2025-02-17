import { createFetchCall } from '@src/utils/createFetchCall.ts'

import type {
    createTaskDataInterface,
    taskInterface,
    getTaskArgsInterface,
    updateTaskInterface,
    deleteTaskAndRemoveFromBoardArgsInterface
} from './types.ts'

export const createTask = (data: createTaskDataInterface) => createFetchCall<taskInterface>({
    url: `${process.env.KANBAN_API}/tasks`,
    fetchOptions: {
        method: "Post",
        body: JSON.stringify(data)
    },
    expectedStatus: 201
})

export const updateTask = (payload: updateTaskInterface) => createFetchCall<null>({
    
    url: `${process.env.KANBAN_API}/tasks/${payload.id}`,
    fetchOptions: {
        method: "Put",
        body: JSON.stringify(payload.data)
    },
    expectedStatus: 204
})

export const deleteTaskAndRemoveFromBoard = (id: deleteTaskAndRemoveFromBoardArgsInterface) => createFetchCall<null>({
    url: `${process.env.KANBAN_API}/tasks/${id}/delete-task-and-remove-from-board`,
    fetchOptions: {
        method: "Delete"
    },
    expectedStatus: 204
})

export const getTask = (id: getTaskArgsInterface) => createFetchCall<taskInterface>({
    url: `${process.env.KANBAN_API}/tasks/${id}`
})