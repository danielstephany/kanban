import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { boardNavListResponseInterface } from "@src/endpoints/board/types"
import { boardNavList } from '@src/endpoints/board'

export const fetchBoardNavList = createAsyncThunk("boardNav/fetchBoardNavList", async (_, {rejectWithValue, dispatch, getState}) => {
    try{
        const navList = await boardNavList()
        
        return navList
    } catch(e){
        return rejectWithValue(e)
    }
})

interface boardNavState  {
    navList: boardNavListResponseInterface | null,
    loading: boolean,
    error: boolean
}

const initialState = { 
    navList: null,
    loading: false,
    error: false
} as boardNavState

const boardNavSlice = createSlice({
    name: 'boardNav',
    initialState,
    reducers: {
        setBoardNav: (state, action) => {
            return {
                navList: action.payload,
                loading: false,
                error: false
            }
        },
        clearBoardNav: (state) => {
            return {
                navList: null,
                loading: false,
                error: false
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBoardNavList.pending, (state, action) => {
            return {
                navList: null,
                loading: true,
                error: false
            };
        })
        .addCase(fetchBoardNavList.fulfilled, (state, action) => {
            return {
                navList: action.payload,
                loading: false,
                error: false
            };
        })
        .addCase(fetchBoardNavList.rejected, (state, action) => {
            return {
                navList: null,
                loading: false,
                error: true
            };
        })
    },
})

export const { setBoardNav, clearBoardNav } = boardNavSlice.actions
export default boardNavSlice.reducer