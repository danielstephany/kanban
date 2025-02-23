import React, {lazy} from 'react'
import {
    createBrowserRouter,
    Navigate
} from "react-router-dom"
import * as routeData from "./routes.ts"
import KanbanDashboard from '@src/components/layouts/KanbanDashboard'
import AuthLayout from '@src/components/layouts/AuthLayout.tsx'
import App from "@src/App.tsx"
import LoginGard from '@src/components/LoginGuard.tsx'
const Board = lazy(() => import('@src/views/Board'));
const ProjectList = lazy(() => import('@src/views/ProjectList'));
const ProjectSettings = lazy(() => import('@src/views/ProjectSettings'));
const SignUp = lazy(() => import('@src/views/SignUp/index.tsx')); 
const Login = lazy(() => import('@src/views/Login/index.tsx')); 
const CreateProject = lazy(() => import('@src/views/CreateProject'));
const UnknownError = lazy(() => import('@src/views/UnknownError/UnknownError.tsx')); 
const NotFound404 = lazy(() => import('@src/views/NotFound404/NotFound404.tsx')); 

const routesObj = [
    {
        path: "/",
        element: <App />,
        errorElement: <UnknownError />,
        children: [
            {
                path: routeData.KANBAN.path,
                element: <LoginGard component={KanbanDashboard} />,
                errorElement: <UnknownError />,
                children: [
                    {
                        path: routeData.BOARD.path,
                        element: <Board />
                    },
                    {
                        path: routeData.CREATE_PROJECT.path,
                        element: <CreateProject />
                    },
                    {
                        path: routeData.PROJECT_LIST.path,
                        element: <ProjectList />
                    },
                    {
                        path: routeData.PROJECT_SETTINGS.path,
                        element: <ProjectSettings />
                    },
                ]
            },
            {
                path: "/auth/",
                element: <AuthLayout />,
                errorElement: <UnknownError />,
                children: [
                    {
                        path: routeData.SIGN_UP.path,
                        element: <SignUp />
                    },
                    {
                        path: routeData.LOGIN.path,
                        element: <Login />
                    },
                ]
            },
            {
                path: "/",
                element: <Navigate to={routeData.PROJECT_LIST.path} />,
                errorElement: <UnknownError />,
            },
        ]
    },
    {
        path: "*",
        element: <NotFound404 />,
        errorElement: <UnknownError />,
    }
]

export const router = createBrowserRouter(routesObj);
