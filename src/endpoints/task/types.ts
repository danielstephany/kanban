export interface taskInterface {
    title: string,
    description: string,
    status: string,
    boardId: string,
    createdBy: Date,
    updatedBy: string
}

export type createTaskDataInterface = Omit<taskInterface, 'createdBy' | "updatedBy">
