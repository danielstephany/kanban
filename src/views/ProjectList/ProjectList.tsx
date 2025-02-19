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
import ProjectListTable from "./ProjectListTable"

const baseRequestArgs = {
    pagination: {
        page: 0,
        limit: 5,
    }
}

const ProjectList = ({}) => {
    const {enqueueSnackbar} = useSnackbar()
    const { loading, call: callGetBoards, result: tableData } = useQuery<ApiResponse<boardDataInterface[]>, ApiRequest>({fetchFunc: getBoards});
    const [requestArgs, setRequestArgs] = useState(baseRequestArgs)

    useEffect(() => {
        console.log("get")
        callGetBoards(requestArgs)
        .then(json => {
            console.log(json)
        })
        .catch(e => {
            enqueueSnackbar(errorMessage, {variant: "error"})
        })
    }, [requestArgs])

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        const newReq = {...requestArgs}
        newReq.pagination.page = page
        setRequestArgs(newReq)
    }

    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newReq = { ...requestArgs }
        newReq.pagination.limit = parseInt(e.target.value, 10)
        setRequestArgs(newReq)
    }

    return (
        <>
            <Helmet title="Project List"/>
            <Box p={4}>
                <Typography variant='h3' gutterBottom>Project list</Typography>
                <Box mt={4}>
                    <Paper elevation={3}>
                        <Box p={3}>
                            <ProjectListTable 
                                tableData={tableData}
                                handleChangePage={handleChangePage}
                                handleChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </>
    )
}

export default ProjectList