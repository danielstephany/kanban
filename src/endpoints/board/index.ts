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
    url: `${process.env.KANBAN_API}/board`,
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

export const getBoards = (data: ApiRequest) => {
    let query = ""

    if(data?.pagination){
        query = "?"
        Object.entries(data.pagination).forEach(([key, value], i) => {
            if(i != 0) query += "&"
            query += `${key}=${value}`
        })
    }

    if(data?.filter){
        if (!query) query = "?"
        Object.entries(data.filter).forEach(([key, value], i) => {
            if (i != 0) query += "&"
            query += `${key}=${value}`
        })
    }

    return createFetchCall<ApiResponse<boardDataInterface[]>>({
        url: `${process.env.KANBAN_API}/boards/${query}`
    })
}