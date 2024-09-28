import { createRoot } from 'react-dom/client'
import React from 'react'
import App from "./App.tsx"
import ThemeController from "@src/components/contexts/ThemeController.tsx"
import SnackbarProvider from '@src/components/providers/SnackbarProvider.tsx'



const rootEl: HTMLElement | null = document.getElementById("root") as HTMLElement

const appRoot = createRoot(rootEl)

appRoot.render(
    <ThemeController>
        <SnackbarProvider>
            <App />
        </SnackbarProvider>
    </ThemeController>
)