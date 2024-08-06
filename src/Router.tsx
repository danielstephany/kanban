import React from 'react'
import {
    createBrowserRouter,
} from "react-router-dom"
import Kanban from './views/Kanban/index.tsx'
import SignUp from './views/SignUp/index.tsx'
import Login from './views/Login/index.tsx'
import AuthLayout from '@src/components/layouts/AuthLayout.tsx'

export const routes = {
    kanban: {path: "/", element: <Kanban />},
    signUp: { path: "signup/", element: <SignUp /> },
    login: { path: "login/", element: <Login /> }
}

export const router = createBrowserRouter([
    routes.kanban,
    {
        path: "/auth/",
        element: <AuthLayout />,
        children: [
            routes.signUp,
            routes.login
        ]
    },
]);
