import React from 'react'
import { Helmet } from "react-helmet"
import styled from 'styled-components'
import KanbanDashboard from '@src/components/layouts/KanbanDashboard.tsx'
import Board from './Board/index.tsx'

const Kanban = () => {
    return (
        <>
            <Helmet><title>Dashboard</title></Helmet>
            <Board />
        </>
    )
}

export default Kanban