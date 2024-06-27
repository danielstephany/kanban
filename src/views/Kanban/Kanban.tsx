import React from 'react'
import styled from 'styled-components'
import KanbanDashboard from '@src/components/layouts/KanbanDashboard.tsx'
import Board from './Board/index.tsx'

const Header = styled.div`
    background: blue;
    height: 80px;
`

const Kanban: React.ElementType = () => {
    return (
        <KanbanDashboard
            header={<Header>header</Header>}
            sidebar={"sidebar"}
            main={<Board />}
        />
    )
}

export default Kanban