import React from 'react'
import {Paper} from "@mui/material"
import styled from 'styled-components'

const Test = styled.div`
    height: 100px;
    width: 100px;
    background: blue;
`

const App = () => {
    return (
        <>
            <Test />
            <Paper>
                <h1>Hola All!</h1>
            </Paper>
        </>
    )
}

export default App