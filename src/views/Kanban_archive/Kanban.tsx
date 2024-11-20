import React from 'react'
import { Helmet } from "react-helmet"
import { useAppSelector } from '@src/store/hooks'
import { Outlet } from "react-router-dom"

const Kanban = () => {
    const user = useAppSelector(state => state.user)
    console.log(user)

    return <Outlet/>
}

export default Kanban