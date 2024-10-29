import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface UserState {
    loggedIn: boolean,
    token: string,
    firstName: string,
    lastName: string,
    email: string,
    id: string
}

const initialState = { 
    loggedIn: false,
    token: "",
    firstName: "",
    lastName: "",
    email: "",
    id: ""
} as UserState

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logInUser: (state, action) => ({
            loggedIn: true,
            ...action.payload
        }),
        logOutUser: (state) => ({ ...initialState, loggedIn: false }),
    },
})

export const { logInUser, logOutUser } = userSlice.actions
export default userSlice.reducer