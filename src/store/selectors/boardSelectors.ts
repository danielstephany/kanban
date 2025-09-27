import type { RootState } from '../index.ts'
import { createSelector } from '@reduxjs/toolkit'

export const getBoardState = (store: RootState) => store.boardData.board

type statusListType = {
    displayName: string,
    value: string,
}[]

export const getBoardStatusList = createSelector(
    [(state: RootState) => state.boardData],
    (boardData) => {
        if (!boardData?.board?.columns) return []
        const statusList: statusListType = []

        boardData?.board?.columnOrder.forEach(columnId => {
            const columns = boardData?.board?.columns
            if (columns){
                statusList.push({
                    displayName: columns[columnId].title,
                    value: columnId,
                })
            }
        })

        return statusList
    
        // return Object.entries(boardData?.board?.columns).map(([key, value]) => ({ displayName: value.title, value: key }))
    }
)
