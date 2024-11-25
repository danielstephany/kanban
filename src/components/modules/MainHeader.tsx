import React, {useContext} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {
    Typography,
    Switch,
    FormControlLabel
} from "@mui/material"
import {
    Moon,
    Sun
} from "react-feather"
import { ThemeContext } from "@src/components/contexts/ThemeController.tsx"

const FormControlLabelCentered = styled(FormControlLabel)`
    .MuiFormControlLabel-label {
        display: flex;
        align-items: center;
    }
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
                    
                    <Typography variant="h1"><Link to="/">Kanban</Link></Typography>
                    
                </div>
                <div className="main-header__items">
                    <FormControlLabelCentered
                        control={
                            <Switch
                                checked={isDarkMode}
                                onChange={handleChangeDarkmode}
                                inputProps={{ 'aria-label': 'Toggle Dark Mode' }}
                                color="secondary"
                            />
                        }
                        label={isDarkMode ? <Moon /> : <Sun />}
                        labelPlacement="end"
                    />
                </div>
            </div>
        </div>
    )
}

const MainHeader = styled(MainHeaderComp)`
    background-color: ${({ theme }) => theme.palette.primaryBackground};
    color: #fff;
    .main-header {
        &__content {
            display: flex;
            align-items: center;
            min-height: 60px;
            margin: 0 auto;   
            padding: 0 24px;         
        }
        &__items {
            &:last-child {
                margin-left: auto;
            }
        }
    }
    h1 {
        font-size: 24px;
        font-weight: 600;
        a {
            text-decoration: none;
            color: inherit;
        }
    }
`

export default MainHeader