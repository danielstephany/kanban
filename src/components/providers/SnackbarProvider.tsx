import React from 'react'
import { SnackbarProvider, closeSnackbar } from 'notistack'
import type { SnackbarKey } from 'notistack'
import { IconButton } from '@mui/material'
import {X} from 'react-feather'

const SnackbarProviderComp: React.ElementType = ({children}) => {

    return (
        <SnackbarProvider
            hideIconVariant
            action={(snackbarId: SnackbarKey) => (
                <IconButton aria-label="dismiss notice" onClick={() => closeSnackbar(snackbarId)}>
                    <X  size={20}/>
                </IconButton>
            )}
        >
            {children}
        </SnackbarProvider>
    )
}

export default SnackbarProviderComp