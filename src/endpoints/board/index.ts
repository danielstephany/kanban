import { createFetchCall } from '@src/utils/createFetchCall.ts'

import type {
    boardsOwnedByUserResponseInterface,
    boardNavListResponseInterface,
    createBoardDataInterface,
    createBoardResponseInterface,
    boardResponseInterface
} from './types.ts'


export const getBoard = (boardId: string) => createFetchCall<boardResponseInterface>({
    url: `${process.env.KANBAN_API}/board/${boardId}`
})

export const boardsOwnedByUser = () => createFetchCall<boardsOwnedByUserResponseInterface>({
    url: `${process.env.KANBAN_API}/board/owned-by-user`
})

export const boardNavList = () => createFetchCall<boardNavListResponseInterface>({
    url: `${process.env.KANBAN_API}/board/nav-list`
})

export const createBoard = (data: createBoardDataInterface) => createFetchCall<createBoardResponseInterface>({
    url: `${process.env.KANBAN_API}/board`,
    fetchOptions: {
        method: "Post",
        body: JSON.stringify(data)
    }
})