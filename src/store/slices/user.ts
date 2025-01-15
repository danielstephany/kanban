import { createSlice } from '@reduxjs/toolkit'

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
        logInUser: (state, action) => {
            window.localStorage.setItem("token", action.payload.token)
            return {
            loggedIn: true,
            ...action.payload
            }
        },
        logOutUser: (state) => {
            window.localStorage.removeItem("token")
            return { ...initialState, loggedIn: false }
        },
    },
})

export const { logInUser, logOutUser } = userSlice.actions
export default userSlice.reducer