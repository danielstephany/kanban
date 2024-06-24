import { createRoot } from 'react-dom/client'
import React from 'react'
import GlobalStyles from './globalStyles/index.ts'
// import { ThemeProvider } from "styled-components"
import mainTheme from '@src/themes/mainTheme.ts'
import App from "./App.tsx"
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider, createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme(mainTheme)

const rootEl: HTMLElement | null = document.getElementById("root") as HTMLElement

const appRoot = createRoot(rootEl)

appRoot.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
)