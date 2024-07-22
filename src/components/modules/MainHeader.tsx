import React, {useContext} from 'react'
import styled from 'styled-components'
import {
    Typography,
    Switch
} from "@mui/material"
import { ThemeContext } from "@src/components/contexts/ThemeController.tsx"

const ThemeToggleSwitch = styled(Switch)`
    //
`

const MainHeaderComp: React.ElementType = ({className}) => {
    const {isDarkMode, setIsDarkMode} = useContext(ThemeContext)

    const handleChangeDarkmode = () => {
        setIsDarkMode(!isDarkMode)
    }

    return (
        <div className={className}>
            <div className="main-header__content">
                <div className="main-header__items">
                    <Typography variant="h1">Kanban</Typography>
                </div>
                <div className="main-header__items main-header__items--right">
                    <ThemeToggleSwitch
                        checked={isDarkMode}
                        onChange={handleChangeDarkmode}
                        inputProps={{ 'aria-label': 'Toggle Dark Mode' }}
                    />
                </div>
            </div>
        </div>
    )
}

const MainHeader = styled(MainHeaderComp)`
    border-bottom: 1px solid ${({ theme }) => theme.palette.mode === "dark" ? "#fff" :  "#000"};
    .main-header {
        &__content {
            display: flex;
            align-items: center;
            min-height: 60px;
            margin: 0 auto;   
            padding: 0 24px;         
        }
        &__items {
        }
    }
    h1 {
        font-size: 24px;
        font-weight: 600;
    }
`

export default MainHeader