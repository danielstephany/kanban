import React from 'react'
import styled from 'styled-components'
import KanbanDashboard from '@src/components/layouts/KanbanDashboard.tsx'

const Header = styled.div`
    background: blue;
    height: 80px;
`

const Kanban = () => {
    return (
        <KanbanDashboard
            header={<Header>header</Header>}
            sidebar={"sidebar"}
            main={"main"}
        />
    )
}

export default Kanban