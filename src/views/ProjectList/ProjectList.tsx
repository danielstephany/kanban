import React, {useEffect, useState} from 'react'
import { useSnackbar } from 'notistack'
import Helmet from 'react-helmet'
import {
    Typography,
    Box,
    Paper,
    Grid2 as Grid,
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
import DebouncedTextField from '@src/components/controls/DebouncedTextField'

const baseRequestArgs: ApiRequest = {
    pagination: {
        page: 0,
        limit: 5,
        sortBy: 'title',
        direction: "asc" as const,
    }
}

const ProjectList = ({}) => {
    const {enqueueSnackbar} = useSnackbar()
    const { loading, call: callGetBoards, result: tableData } = useQuery<ApiResponse<boardDataInterface[]>, ApiRequest>({fetchFunc: getBoards});
    const [requestArgs, setRequestArgs] = useState(baseRequestArgs)
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
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
        if (newReq.pagination) {
            newReq.pagination.page = page
            setRequestArgs(newReq)
        }
    }

    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newReq = { ...requestArgs }
        if (newReq.pagination) {
            newReq.pagination.limit = parseInt(e.target.value, 10)
            setRequestArgs(newReq)
        }
    }

    const handleSortChange = (id: string, direction: "asc" | "desc") => {
        const newReq = { ...requestArgs }
        if (newReq.pagination) {
            newReq.pagination.sortBy = id
            newReq.pagination.direction = direction
            setRequestArgs(newReq)
        }
    }

    const handleSearchChange = (name: string, value: string) => {
        const newReq = { ...requestArgs }
        const trimmedValue = value.trim()

        // remove filter if no value is provided
        if (!trimmedValue && newReq.filter){
            delete newReq.filter
        } else if (trimmedValue) { // add filter to reqest if value is provided
            newReq.filter = {
                searchBy: "title",
                searchValue: trimmedValue
            }
        }
        console.log("search")
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
                            <Grid container spacing={2}>
                                <Grid size={{ sm: 12, lg: 6 }}>
                                    <DebouncedTextField
                                        name="search"
                                        placeholder="Search By Title"
                                        aria-label="Search By Title"
                                        searchFn={handleSearchChange}
                                        value={searchValue}
                                        setValueFn={setSearchValue}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid size={12}>
                                    <ProjectListTable 
                                        tableData={tableData}
                                        handleChangePage={handleChangePage}
                                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                                        handleSortChange={handleSortChange}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </>
    )
}

export default ProjectList