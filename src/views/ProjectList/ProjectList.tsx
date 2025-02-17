import React, {useEffect, useState} from 'react'
import { useSnackbar } from 'notistack'
import Helmet from 'react-helmet'
import {
    Typography,
    Box,
    Paper
} from "@mui/material"
import { getBoards } from '@src/endpoints/board'
import useQuery from '@src/hooks/useQuery'
import type {
    boardDataInterface
} from '@src/endpoints/board/types'
import type {
    ApiResponse,
    ApiRequest
} from '@src/endpoints/types.ts'
import { errorMessage } from '@src/constants'

const baseRequestArgs = {
    pagination: {
        page: 0,
        limit: 10,
    }
}

const ProjectList = ({}) => {
    const {enqueueSnackbar} = useSnackbar()
    const { loading, call: callGetBoards } = useQuery<ApiResponse<boardDataInterface[]>, ApiRequest>({fetchFunc: getBoards});
    const [requestArgs, setRequestArgs] = useState(baseRequestArgs)

    useEffect(() => {
        callGetBoards(requestArgs)
        .then(json => {
            console.log(json)
        })
        .catch(e => {
            enqueueSnackbar(errorMessage, {variant: "error"})
        })
    }, [])

    return (
        <>
            <Helmet title="Project List"/>
            <Box p={4}>
                <Typography variant='h3' gutterBottom>Project list</Typography>
                <Box mt={4}>
                    <Paper elevation={3}>
                        <Box p={3}>
                            
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </>
    )
}

export default ProjectList