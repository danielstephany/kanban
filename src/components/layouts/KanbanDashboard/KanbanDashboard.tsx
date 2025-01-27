import React, {Suspense, useEffect} from 'react'
import { useSnackbar } from 'notistack'
import { useAppDispatch, useAppSelector } from '@src/store/hooks.ts'
import styled from 'styled-components'
import MainHeader from '@src/components/modules/MainHeader.tsx'
import MainSidebar from './MainSidebar.tsx'
import { Outlet } from "react-router-dom"
import CenteredLoader from '@src/components/modules/CenteredLoader.tsx'
import { fetchBoardNavList } from "@src/store/slices/boardNav.ts"
import { getBoardNavState } from "@src/store/selectors/boardNavSelectors.ts"

const KanbanDashboardComp: React.ElementType = ({
    className,
}) => {
    const dispatch = useAppDispatch()
    const boardNavList = useAppSelector(getBoardNavState)
    const {enqueueSnackbar} = useSnackbar()

    useEffect(() => {
        dispatch(fetchBoardNavList()).unwrap().then((r)=>{
            console.log(r)
        }).catch(e => {
            enqueueSnackbar(e.message, { variant: "error" })
        })
    }, [])

    return (
        <div className={className}>
            <div className='kbd__header-slot'><MainHeader /></div>
            <div className='kbd__sidbar-slot'>
                <MainSidebar boardNavItems={boardNavList} />
            </div>
            <div className='kbd__main-slot'>
                <Suspense fallback={<CenteredLoader minHeight='100%' />}>
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
    max-height: 100dvh;
    .kbd__header-slot {
        grid-area: kbdHeader;
    }
    .kbd__sidbar-slot {
        grid-area: kbdSidbar;
        min-width: 250px;
        z-index: 1;
    }
    .kbd__main-slot {
        display: flex;
        flex-direction: column;
        grid-area: kbdMain;
        overflow: auto;
    }
`

export default KanbanDashboard