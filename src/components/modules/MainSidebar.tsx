import React from 'react'
import styled from 'styled-components'

const MainSidebarComp: React.ElementType = ({className}) => {
    return (
        <div className={className}>

        </div>
    )
}

const MainSidebar = styled(MainSidebarComp)`
    border-right: 1px solid ${({ theme }) => theme.palette.mode === "dark" ? "#fff" : "#000"};
    min-height: 100%;
`

export default MainSidebar