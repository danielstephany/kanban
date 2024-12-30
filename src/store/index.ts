import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./slices/user.ts"
import boardReducer from "./slices/board.ts"

const store = configureStore({
    reducer: {
        user: userReducer,
        boardData: boardReducer
    },
    devTools: {
        name: "kanban"
    }
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AppStore = typeof store