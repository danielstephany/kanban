import { createFetchCall } from '@src/utils/createFetchCall.ts'

import type {
    createTaskDataInterface,
    taskInterface
} from './types.ts'

export const createTask = (data: createTaskDataInterface) => createFetchCall<taskInterface>({
    url: `${process.env.KANBAN_API}/task`,
    fetchOptions: {
        method: "Post",
        body: JSON.stringify(data)
    },
    expectedStatus: 201
})