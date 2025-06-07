import { createFetchCall } from '@src/utils/createFetchCall.ts'

import type {
    boardsOwnedByUserResponseInterface,
    boardNavListResponseInterface,
    createBoardDataInterface,
    boardDataInterface,
    moveTaskDataInterface
} from './types.ts'
import type {
    ApiResponse,
    ApiRequest
} from '../types.ts'


export const getBoard = (boardId: string) => createFetchCall<boardDataInterface>({
    url: `${process.env.KANBAN_API}/boards/${boardId}`
})

export const boardsOwnedByUser = () => createFetchCall<boardsOwnedByUserResponseInterface>({
    url: `${process.env.KANBAN_API}/boards/owned-by-user`
})

export const boardNavList = () => createFetchCall<boardNavListResponseInterface>({
    url: `${process.env.KANBAN_API}/boards/nav-list`
})

export const createBoard = (data: createBoardDataInterface) => createFetchCall<boardDataInterface>({
    url: `${process.env.KANBAN_API}/boards`,
    fetchOptions: {
        method: "Post",
        body: JSON.stringify(data)
    }
})

export const moveTask = (data: moveTaskDataInterface) => createFetchCall<boardDataInterface>({
    url: `${process.env.KANBAN_API}/boards/move-task`,
    fetchOptions: {
        method: "Post",
        body: JSON.stringify(data)
    }
})

export const deleteBoard = (boardId: string) => createFetchCall<null>({
    url: `${process.env.KANBAN_API}/boards/${boardId}`,
    fetchOptions: {
        method: "Delete",
    },
    expectedStatus: 204
})

export const getBoards = (queryData: ApiRequest) => {
    let query = ""

    return createFetchCall<ApiResponse<boardDataInterface[]>>({
        url: `${process.env.KANBAN_API}/boards/${query}`,
        query: queryData,
    })
}