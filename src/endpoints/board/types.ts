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

export interface createBoardResponseInterface {
    title: string,
    owner: string,
    columns: {
        [key: string]: {
            title: string,
            columnId: string,
            taskIds: string[],
            _id: string,
            createdAt: string,
            updatedAt: string
        },
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

export interface boardResponseInterface extends createBoardResponseInterface {}