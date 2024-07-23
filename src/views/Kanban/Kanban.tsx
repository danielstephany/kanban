import React from 'react'
import styled from 'styled-components'
import KanbanDashboard from '@src/components/layouts/KanbanDashboard.tsx'
import Board from './Board/index.tsx'
import MainHeader from '@src/components/modules/MainHeader.tsx'
import MainSidebar from '@src/components/modules/MainSidebar.tsx'

const Kanban: React.ElementType = () => {
    return (
        <KanbanDashboard
            header={<MainHeader />}
            sidebar={<MainSidebar />}
            main={<Board />}
        />
    )
}

export default Kanban