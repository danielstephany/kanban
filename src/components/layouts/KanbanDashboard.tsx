import React, {Suspense, useEffect} from 'react'
import { useSnackbar } from 'notistack'
import styled from 'styled-components'
import MainHeader from '@src/components/modules/MainHeader.tsx'
import MainSidebar from '@src/components/modules/MainSidebar.tsx'
import { Outlet } from "react-router-dom"
import CenteredLoader from '@src/components/modules/CenteredLoader.tsx'
import useQuery from '@src/hooks/useQuery'

import { boardNavList } from '@src/endpoints/board'

const KanbanDashboardComp: React.ElementType = ({
    className,
}) => {
    const {enqueueSnackbar} = useSnackbar()
    const getBoardNavList = useQuery({
        fetchFunc: boardNavList
    })

    useEffect(() => {
        getBoardNavList.call()
        .then(json => {
            
        }).catch(e => {
            enqueueSnackbar(e.message, {variant: "error"})
        })

    }, [])

    if (getBoardNavList.result) console.log(getBoardNavList.result)

    return (
        <div className={className}>
            <div className='kbd__header-slot'><MainHeader /></div>
            <div className='kbd__sidbar-slot'><MainSidebar /></div>
            <div className='kbd__main-slot'>
                <Suspense fallback={<CenteredLoader />}>
                    <Outlet />
                </Suspense>
            </div>
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
        display: flex;
        grid-area: kbdMain;
    }
`

export default KanbanDashboard