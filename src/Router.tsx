import React, {lazy} from 'react'
import {
    createBrowserRouter,
    Navigate
} from "react-router-dom"
import * as routeData from "./routes.ts"
import KanbanDashboard from '@src/components/layouts/KanbanDashboard.tsx'
import AuthLayout from '@src/components/layouts/AuthLayout.tsx'
import App from "@src/App.tsx"
const Kanban = lazy(() => import('./views/Kanban/index.tsx')); 
const SignUp = lazy(() => import('./views/SignUp/index.tsx')); 
const Login = lazy(() => import('./views/Login/index.tsx')); 
const UnknownError = lazy(() => import('./views/UnknownError/UnknownError.tsx')); 
const NotFound404 = lazy(() => import('./views/NotFound404/NotFound404.tsx')); 

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <UnknownError />,
        children: [
            {
                path: routeData.kanban.path,
                element: <KanbanDashboard />,
                errorElement: <UnknownError />,
                children: [
                    {
                        path: routeData.kanban.path,
                        element: <Kanban />,
                    }
                ]
            },
            {
                path: "/auth/",
                element: <AuthLayout />,
                errorElement: <UnknownError />,
                children: [
                    {
                        path: routeData.signUp.path,
                        element: <SignUp />
                    },
                    {
                        path: routeData.login.path,
                        element: <Login />
                    },
                ]
            },
            {
                path: "/",
                element: <Navigate to="/dashboard" />,
                errorElement: <UnknownError />,
            },
        ]
    },
    {
        path: routeData.kanban.path,
        element: <KanbanDashboard />,
        errorElement: <UnknownError />,
        children: [
            {
                path: routeData.kanban.path,
                element: <Kanban />,
            }
        ]
    },
    {
        path: "/auth/",
        element: <AuthLayout />,
        errorElement: <UnknownError />,
        children: [
            {
                path: routeData.signUp.path,
                element: <SignUp />
            },
            {
                path: routeData.login.path,
                element: <Login />
            },
        ]
    },
    {
        path: "*",
        element: <NotFound404 />,
        errorElement: <UnknownError />,
    }   
]);
