import React from 'react'
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    IconButton
} from '@mui/material'
import {Link, useNavigate} from "react-router-dom"
import { 
    BOARD,
    PROJECT_SETTINGS
 } from '@src/Router/routes'
import {Settings} from 'react-feather';
import CenteredLoader from '@src/components/modules/CenteredLoader'
import type {
    boardDataInterface
} from '@src/endpoints/board/types'
import type {
    ApiResponse,
} from '@src/endpoints/types.ts'
import { displayDateAndTime } from '@src/utils/dateTime'

type ProjectListTypes = {
    tableData?: ApiResponse<boardDataInterface[]> | null
    handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void,
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ProjectListTable({ tableData, handleChangePage, handleChangeRowsPerPage }: ProjectListTypes){
    if (!tableData) return <CenteredLoader minHeight="300px" />
    const navigate = useNavigate()

    const handleRouteToPage = (id: string) => () => {
        navigate(BOARD.base + id)
    }

    const handleCancelEvent = (e: React.SyntheticEvent) => {
        e.stopPropagation()
    }

    return (
        <Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Updated At</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell align='center'>Project Settings</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            tableData?.data?.length ? 
                                tableData?.data.map(row => (
                                    <TableRow 
                                        key={row._id}
                                        sx={{ cursor: "pointer" }}
                                        hover
                                        onClick={handleRouteToPage(row._id)}
                                    >
                                        <TableCell>{row.title}</TableCell>
                                        <TableCell>{displayDateAndTime(row.updatedAt)}</TableCell>
                                        <TableCell>{displayDateAndTime(row.createdAt)}</TableCell>
                                        <TableCell align='center'>
                                            <IconButton 
                                                aria-label="Project Settings"
                                                component={Link}
                                                to={PROJECT_SETTINGS.base + row._id}
                                                onClick={handleCancelEvent}
                                            ><Settings /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            :
                                <TableRow><TableCell colSpan={3}>No Projects have been created.</TableCell></TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination 
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={tableData?.pagination?.total || 0}
                rowsPerPage={tableData?.pagination?.limit || 5}
                page={tableData?.pagination?.page || 0}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    )
}