import { createFetchCall } from '@src/utils/createFetchCall.ts'

import type {
    createTaskDataInterface,
    taskInterface,
    getTaskArgsInterface
} from './types.ts'

export const createTask = (data: createTaskDataInterface) => createFetchCall<taskInterface>({
    url: `${process.env.KANBAN_API}/task`,
    fetchOptions: {
        method: "Post",
        body: JSON.stringify(data)
    },
    expectedStatus: 201
})

export const getTask = (id: getTaskArgsInterface) => createFetchCall<taskInterface>({
    url: `${process.env.KANBAN_API}/task/get/${id}`
})