import type { RootState } from '../index.ts'
import { createSelector } from '@reduxjs/toolkit'

export const getBoardState = (store: RootState) => store.boardData.board

export const getBoardStatusList = createSelector(
    [(state: RootState) => state.boardData],
    (boardData) => {
        if (!boardData?.board?.columns) return []
    
        return Object.entries(boardData?.board?.columns).map(([key, value]) => ({ displayName: value.title, value: key }))
    }
)
