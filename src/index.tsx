import { createRoot } from 'react-dom/client'
import React from 'react'
import App from "./App.tsx"
import ThemeController from "@src/components/contexts/ThemeController.tsx"



const rootEl: HTMLElement | null = document.getElementById("root") as HTMLElement

const appRoot = createRoot(rootEl)

appRoot.render(
    <ThemeController>
        <App />
    </ThemeController>
)