import React, { useState, useEffect, ChangeEvent } from 'react'
import { createContext } from 'react';
import mainTheme from '@src/themes/mainTheme.ts'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GlobalStyles from '@src/globalStyles/index.ts'
import CssBaseline from '@mui/material/CssBaseline'

interface iThemeContext {
    isDarkMode: boolean,
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

export const ThemeContext = createContext<iThemeContext>({ 
    isDarkMode: false,
    setIsDarkMode: () => null
});

const getIsDarkMode = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches 

const Theme: React.ElementType = ({ children }) => {
    const windowSetToDarkMode = getIsDarkMode()
    const [isDarkMode, setIsDarkMode] = useState(windowSetToDarkMode)

    const watchForModeChange = (event: {matches: boolean}) => {
        const isDark = event.matches
        setIsDarkMode(isDark)
    }

    useEffect(() => {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', watchForModeChange)
        
        return () => {
            window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', watchForModeChange)
        }
    }, [])
    
    const value = {
        setIsDarkMode,
        isDarkMode
    }

    const theme = createTheme(mainTheme(isDarkMode))
    
    return (
        <ThemeContext.Provider value={value}>
            <ThemeProvider theme={theme}>
                <GlobalStyles theme={theme} />
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}

export default Theme