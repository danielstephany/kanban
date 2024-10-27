import React from 'react'
import { Helmet } from "react-helmet"
import Board from './Board/index.tsx'
import { useAppSelector } from '@src/store/hooks'

const Kanban = () => {
    const user = useAppSelector(state => state.user)
    console.log(user)
    return (
        <>
            <Helmet><title>Dashboard</title></Helmet>
            <Board />
        </>
    )
}

export default Kanban