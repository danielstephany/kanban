import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { useAppDispatch } from '@src/store/hooks'
import { logOutUser } from '@src/store/slices/user'
import {
    Button,
    Typography,
    Paper,
    Box
} from '@mui/material'
import * as routes from '@src/Router/routes.ts'
import { Plus } from "react-feather"

const ButtonTextLeft = styled(Button)`
    display: flex;
    width: auto;
    justify-content: left;
    text-transform: none;
    margin-left: -8px;
    margin-right: -8px;
    margin-bottom: 
` as typeof Button;

interface MainSidebarCompIterface { 
    className?: string,
    boardNavItems: {_id: string, title: string}[]
}

const MainSidebarComp: React.ElementType = ({ className, boardNavItems }: MainSidebarCompIterface) => {
    const dispatch = useAppDispatch()

    const handleLogOutUser = () => {
        dispatch(logOutUser())
    }

    const buildBoardLinks = () => {
        if (boardNavItems){
            return boardNavItems.map((board) => (
                < li key={board._id} className='main-sidebar__list-item' >
                    <ButtonTextLeft
                        component={Link}
                        variant="text"
                        to={`/dashboard/board/${board._id}`}
                        fullWidth
                    >{board.title}</ButtonTextLeft>
                </li >
            ))                
        }
        return null
    }

    return (
        <Paper className={className}>
            <nav className='main-sidebar__top-nav'>                
                <Box mb={3}>
                    <Button
                        component={Link}
                        variant="contained"
                        fullWidth
                        startIcon={<Plus />}
                        to={routes.CREATE_PROJECT.path}
                        color="secondary"
                    >New Project</Button>            
                </Box>
                <Typography variant='h3' className='main-sidebar__title'>Projects</Typography>
                <ul className='main-sidebar__list'>
                    <ButtonTextLeft
                        component={Link}
                        variant="text"
                        to={routes.PROJECT_LIST.path}
                        fullWidth
                    >All Boards</ButtonTextLeft>
                    {buildBoardLinks()}
                </ul>
            </nav>
            <nav className='main-sidebar__bottom-nav'>
                <Button 
                    component={Link} 
                    variant="outlined" 
                    to="/auth/login"
                    fullWidth
                    onClick={handleLogOutUser}
                >Log out</Button>
            </nav>
        </Paper>
    )
}

const MainSidebar = styled(MainSidebarComp)`
    display: flex;
    flex-direction: column;
    border-radius: 0;
    border-right: 1px solid ${({ theme }) => theme.palette.mode === "dark" ? "#555" : "transparent"};
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
            font-size: 18px;
            font-weight: 500;
        }
    }
` as typeof MainSidebarComp

export default MainSidebar