export interface boardsOwnedByUserResponseInterface {
    _id: string,
    title: string,
    owner: string,
    columns: {
        [key: string]: {
            _id: string,
            columnId: string,
            title: string,
            taskIds: string[],
            createdAt: string,
            updatedAt: string,
        },
    },
    columnOrder: string[],
    usersWithAccess: string[],
    createdAt: string,
    updatedAt: string,
}[]



export interface boardNavListResponseInterface {
    _id: string,
    title: string
}[]

export interface createBoardDataInterface {
    title: string,
    columns: string[],
    usersWithAccess?: string[]
}

export interface boardColumnInterface {
    title: string,
    columnId: string,
    taskIds: string[],
    _id: string,
    createdAt: string,
    updatedAt: string
}

export interface boardDataInterface {
    title: string,
    owner: string,
    columns: {
        [key: string]: boardColumnInterface,
    },
    tasks: {
        [key: string]: {
            _id: string,
            title: string
        }
    }
    columnOrder: string[],
    usersWithAccess: string[],
    _id: string,
    createdAt: string,
    updatedAt: string,
}

export interface moveTaskDataInterface {
    boardId: string,
    sourceColumn: {
        columnId: string,
        taskIds: string[]
    },
    destColumn: {
        columnId: string,
        taskIds: string[]
    },
    taskId: string,
    taskStatus: string
}

interface query {
    limit?: number, 
    page: number,
}


