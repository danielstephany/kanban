import React from 'react'
import styled from 'styled-components'
import Kanban from './views/Kanban/index.tsx'
import {
    RouterProvider
} from "react-router-dom"
import {router} from '@src/Router.tsx'

const App = () => {
    return <RouterProvider router={router}/>
}

export default App