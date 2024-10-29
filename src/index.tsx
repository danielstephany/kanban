import { createRoot } from 'react-dom/client'
import React, { Suspense } from 'react'
import {
    RouterProvider
} from "react-router-dom"
import { router } from '@src/Router'
import LoaderView from '@src/components/modules/LoaderView.tsx'
import ThemeController from "@src/components/contexts/ThemeController.tsx"
import SnackbarProvider from '@src/components/providers/SnackbarProvider.tsx'
import store from '@src/store'
import { Provider as ReduxProvider } from 'react-redux'



const rootEl: HTMLElement | null = document.getElementById("root") as HTMLElement

const appRoot = createRoot(rootEl)

appRoot.render(
    <ReduxProvider store={store}>
        <ThemeController>
                <SnackbarProvider>
                    <Suspense fallback={<LoaderView />}>
                        <RouterProvider router={router} />
                    </Suspense>
                </SnackbarProvider>
        </ThemeController>
    </ReduxProvider>
)