export interface taskInterface {
    title: string,
    description: string,
    status: string,
    boardId: string,
    createdBy: Date,
    updatedBy: string
}

export type createTaskDataInterface = Omit<taskInterface, 'createdBy' | "updatedBy">

export type getTaskArgsInterface = string;

export type deleteTaskAndRemoveFromBoardArgsInterface = string;

export interface updateTaskInterface {
    id: string,
    data: {
        title: string,
        description: string,
        status: string,
        boardId: string,
    }
}
