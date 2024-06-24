import React from 'react'
import styled from 'styled-components'

const KanbanDashboardComp: React.ElementType = ({
    className,
    header,
    main,
    sidebar,
}) => {
    return (
        <div className={className}>
            <div className='kbd__header-slot'>{header}</div>
            <div className='kbd__sidbar-slot'>{sidebar}</div>
            <div className='kbd__main-slot'>{main}</div>
        </div>
    )
}

const KanbanDashboard = styled(KanbanDashboardComp)`
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas: 
    "kbdHeader kbdHeader"
    "kbdSidbar kbdMain";
    min-height: 100dvh;
    .kbd__header-slot {
        grid-area: kbdHeader;
    }
    .kbd__sidbar-slot {
        grid-area: kbdSidbar;
        min-width: 250px;
    }
    .kbd__main-slot {
        grid-area: kbdMain;
    }
`

export default KanbanDashboard