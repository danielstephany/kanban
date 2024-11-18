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

}