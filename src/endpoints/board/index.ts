import { createFetchCall } from '@src/utils/createFetchCall.ts'

import type {
    boardsOwnedByUserResponseInterface,
    boardNavListResponseInterface,
    createBoardDataInterface,
    boardDataInterface,
    moveTaskDataInterface
} from './types.ts'


export const getBoard = (boardId: string) => createFetchCall<boardDataInterface>({
    url: `${process.env.KANBAN_API}/board/get/${boardId}`
})

export const boardsOwnedByUser = () => createFetchCall<boardsOwnedByUserResponseInterface>({
    url: `${process.env.KANBAN_API}/board/owned-by-user`
})

export const boardNavList = () => createFetchCall<boardNavListResponseInterface>({
    url: `${process.env.KANBAN_API}/board/nav-list`
})

export const createBoard = (data: createBoardDataInterface) => createFetchCall<boardDataInterface>({
    url: `${process.env.KANBAN_API}/board`,
    fetchOptions: {
        method: "Post",
        body: JSON.stringify(data)
    }
})

export const moveTask = (data: moveTaskDataInterface) => createFetchCall<boardDataInterface>({
    url: `${process.env.KANBAN_API}/board/move-task`,
    fetchOptions: {
        method: "Post",
        body: JSON.stringify(data)
    }
})