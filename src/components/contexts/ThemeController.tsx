import React, { useState } from 'react'
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

const Theme: React.ElementType = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(true)
    
    const value = {
        setIsDarkMode,
        isDarkMode
    }

    const theme = createTheme(mainTheme(isDarkMode))
    
    return (
        <ThemeContext.Provider value={value}>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}

export default Theme