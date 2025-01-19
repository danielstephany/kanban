import { createFetchCall } from '@src/utils/createFetchCall.ts'

import type {
    createTaskDataInterface,
    taskInterface,
    getTaskArgsInterface,
    updateTaskInterface,
    deleteTaskAndRemoveFromBoardArgsInterface
} from './types.ts'

export const createTask = (data: createTaskDataInterface) => createFetchCall<taskInterface>({
    url: `${process.env.KANBAN_API}/task`,
    fetchOptions: {
        method: "Post",
        body: JSON.stringify(data)
    },
    expectedStatus: 201
})

export const updateTask = (data: updateTaskInterface) => createFetchCall<null>({
    url: `${process.env.KANBAN_API}/task/update`,
    fetchOptions: {
        method: "Put",
        body: JSON.stringify(data)
    },
    expectedStatus: 204
})

export const deleteTaskAndRemoveFromBoard = (id: deleteTaskAndRemoveFromBoardArgsInterface) => createFetchCall<null>({
    url: `${process.env.KANBAN_API}/task/delete-task-and-remove-from-board/${id}`,
    fetchOptions: {
        method: "Delete"
    },
    expectedStatus: 204
})

export const getTask = (id: getTaskArgsInterface) => createFetchCall<taskInterface>({
    url: `${process.env.KANBAN_API}/task/get/${id}`
})