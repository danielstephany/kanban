import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { useAppDispatch } from '@src/store/hooks'
import { logOutUser } from '@src/store/slices/user'
import {
    Button,
    Typography
} from '@mui/material'

const ButtonTextLeft = styled(Button)`
    display: flex;
    width: auto;
    justify-content: left;
    text-transform: none;
    margin-left: -8px;
    margin-right: -8px;
    margin-bottom: 
` as typeof Button;

const MainSidebarComp: React.ElementType = ({className}) => {
    const dispatch = useAppDispatch()

    const handleLogOutUser = () => {
        dispatch(logOutUser())
    }

    return (
        <div className={className}>
            <nav className='main-sidebar__top-nav'>
                <Typography variant='h3' className='main-sidebar__title'>Projects</Typography>
                <ul className='main-sidebar__list'>
                    <li className='main-sidebar__list-item'>
                        <ButtonTextLeft
                            component={Link}
                            variant="text"
                            to="auth/login"
                            fullWidth
                        >Project 1</ButtonTextLeft>
                    </li>
                    <li className='main-sidebar__list-item'>
                        <ButtonTextLeft
                            component={Link}
                            variant="text"
                            to="auth/login"
                            fullWidth
                        >Project 2</ButtonTextLeft>
                    </li>
                </ul>
            </nav>
            <nav className='main-sidebar__bottom-nav'>
                <Button 
                    component={Link} 
                    variant="contained" 
                    to="/auth/login"
                    fullWidth
                    onClick={handleLogOutUser}
                >Log out</Button>
            </nav>
        </div>
    )
}

const MainSidebar = styled(MainSidebarComp)`
    display: flex;
    flex-direction: column;
    border-right: 1px solid ${({ theme }) => theme.palette.mode === "dark" ? "#fff" : "#000"};
    min-height: 100%;
    .main-sidebar {
        &__top-nav {
            flex-grow: 1;
            padding:24px;            
        }
        &__bottom-nav {            
            padding: 0 24px 24px;
        }
        &__list {
            margin: 0;
            padding: 0;
            list-style: none;
        }
        &__list-item {
            margin-bottom: 4px;
        }
        &__title {
            margin: 0 0 12px;
            font-size: 24px;
            font-weight: 500;
        }
    }
`

export default MainSidebar