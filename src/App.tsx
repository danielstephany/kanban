import React from 'react'
import {Paper} from "@mui/material"
import styled from 'styled-components'
import KanbanDashboard from '@src/components/layouts/KanbanDashboard.tsx'

const Header = styled.div`
    background: blue;
    height: 80px;
`

const App = () => {
    return (
        <KanbanDashboard
            header={<Header>header</Header>}
            sidebar={"sidebar"}
            main={"main"}
        />
    )
}

export default App