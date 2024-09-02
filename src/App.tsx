import React, {Suspense} from 'react'
import {
    RouterProvider
} from "react-router-dom"
import {router} from '@src/Router.tsx'
import LoaderView from '@src/components/modules/LoaderView.tsx'

const App = () => {
    return (
        <Suspense fallback={<LoaderView/>}>
            <RouterProvider router={router}/>
        </Suspense>
    )
}

export default App