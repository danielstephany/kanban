import React from 'react'
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from '@mui/material'
import type {
    boardDataInterface
} from '@src/endpoints/board/types'
import type {
    ApiResponse,
} from '@src/endpoints/types.ts'

type ProjectListTypes = {
    tableData?: ApiResponse<boardDataInterface[]> | null
    handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void,
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ProjectListTable({ tableData, handleChangePage, handleChangeRowsPerPage }: ProjectListTypes){

    if (!tableData) return null

    return (
        <Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Updated At</TableCell>
                            <TableCell>Created At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            tableData?.data?.length ? 
                                tableData?.data.map(row => (
                                    <TableRow key={row._id}>
                                        <TableCell>{row.title}</TableCell>
                                        <TableCell>{row.updatedAt}</TableCell>
                                        <TableCell>{row.createdAt}</TableCell>
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