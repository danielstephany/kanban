import { createSlice } from '@reduxjs/toolkit'
import type { boardDataInterface } from "@src/endpoints/board/types"

interface boardState  {
    board: boardDataInterface | null,
    loading: boolean,
}

const initialState = { 
    board: null,
    loading: false
} as boardState

const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setBoard: (state, action) => {
            return {
                board: action.payload,
                loading: false
            }
        },
        clearBoard: (state) => {
            return {
                board: null,
                loading: false
            }
        },
    },
})

export const { setBoard, clearBoard } = boardSlice.actions
export default boardSlice.reducer