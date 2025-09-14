import { createFetchCall } from '@src/utils/createFetchCall.ts'

import type {
    boardsOwnedByUserResponseInterface,
    boardNavListResponseInterface,
    createBoardDataInterface,
    boardDataInterface,
    moveTaskDataInterface,
    moveBoardColumnInterface,
    deleteBoardColumnInterface
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
        method: "POST",
        body: JSON.stringify(data)
    }
})

export const moveTask = (data: moveTaskDataInterface) => createFetchCall<boardDataInterface>({
    url: `${process.env.KANBAN_API}/boards/move-task`,
    fetchOptions: {
        method: "POST",
        body: JSON.stringify(data)
    }
})

export const deleteColumn = (data: deleteBoardColumnInterface) => createFetchCall<boardDataInterface>({
    url: `${process.env.KANBAN_API}/boards/delete-column`,
    fetchOptions: {
        method: "PATCH",
        body: JSON.stringify(data)
    }
})

export const moveColumn = (data: moveBoardColumnInterface) => createFetchCall<boardDataInterface>({
    url: `${process.env.KANBAN_API}/boards/move-column`,
    fetchOptions: {
        method: "PATCH",
        body: JSON.stringify(data)
    }
})

export const deleteBoard = (boardId: string) => createFetchCall<null>({
    url: `${process.env.KANBAN_API}/boards/${boardId}`,
    fetchOptions: {
        method: "DELETE",
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